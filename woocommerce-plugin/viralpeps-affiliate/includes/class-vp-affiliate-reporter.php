<?php
/**
 * Conversion reporting to the ViralPeps network.
 *
 * @package ViralPeps_Affiliate
 */

defined( 'ABSPATH' ) || exit;

/**
 * Builds the conversion payload from a WooCommerce order and posts it to the
 * network. All commission maths happens network-side — this class only sends
 * facts about the order (line items, tax, shipping, refunds), never an
 * invoice total the network has to take on trust.
 */
class VP_Affiliate_Reporter {

	/** @var VP_Affiliate_Plugin */
	private $plugin;

	/**
	 * Constructor.
	 *
	 * @param VP_Affiliate_Plugin $plugin Plugin instance.
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Report a real order.
	 *
	 * @param WC_Order $order  Order.
	 * @param string   $status pending|completed|refunded|cancelled|failed.
	 * @return array {ok:bool, error?:string, response?:array, http?:int}
	 */
	public function report_order( $order, $status = 'completed' ) {
		if ( ! $this->plugin->is_connected() ) {
			return array( 'ok' => false, 'error' => 'Store is not connected.' );
		}

		$order_id = $order->get_id();
		$tid      = $order->get_meta( '_vp_click_id' );

		if ( '' === (string) $tid ) {
			return array( 'ok' => false, 'error' => 'Order has no click id.' );
		}

		$payload = array(
			'vendor_slug' => $this->plugin->get_vendor_slug(),
			'order_id'    => (string) $order_id,
			'order_number'=> (string) $order->get_order_number(),
			'status'      => $status,
			'currency'    => $order->get_currency(),
			'occurred_at' => $this->order_timestamp( $order ),
			'click_ref'   => (string) $tid,
			'customer_ref'=> $this->customer_ref( $order ),
			'items'       => $this->items( $order ),
			'shipping'    => $this->money( $order->get_shipping_total() ),
			'discount'    => $this->money( $order->get_discount_total() ),
			'refunded'    => $this->money( $order->get_total_refunded() ),
			'test'        => false,
		);

		return $this->post( $payload );
	}

	/**
	 * Send a throwaway conversion so the owner can verify the pipe works.
	 * Uses test mode, so nothing is written network-side.
	 *
	 * @return array
	 */
	public function report_test() {
		if ( ! $this->plugin->is_connected() ) {
			return array( 'ok' => false, 'error' => 'Store is not connected.' );
		}

		$payload = array(
			'vendor_slug'  => $this->plugin->get_vendor_slug(),
			'order_id'     => 'TEST-' . gmdate( 'YmdHis' ) . '-' . wp_rand( 1000, 9999 ),
			'status'       => 'completed',
			'currency'     => function_exists( 'get_woocommerce_currency' ) ? get_woocommerce_currency() : 'GBP',
			'occurred_at'  => gmdate( 'c' ),
			'click_ref'    => '',
			'items'        => array(
				array(
					'sku'      => 'VP-TEST',
					'name'     => 'ViralPeps connection test',
					'quantity' => 1,
					'price'    => 100.00,
				),
			),
			'shipping'     => 0,
			'discount'     => 0,
			'refunded'     => 0,
			'test'         => true,
		);

		return $this->post( $payload );
	}

	/**
	 * POST to the network.
	 *
	 * @param array $payload Body.
	 * @return array
	 */
	private function post( $payload ) {
		$response = wp_remote_post(
			VP_Affiliate_Plugin::CONVERSION_ENDPOINT,
			array(
				'timeout'     => 20,
				'redirection' => 0,
				'headers'     => array(
					'Content-Type'          => 'application/json',
					'Accept'                => 'application/json',
					'X-Affiliate-Token'     => $this->plugin->get_token(),
					'X-ViralPeps-Plugin'    => 'woocommerce/' . VP_AFF_VERSION,
				),
				'body'        => wp_json_encode( $payload ),
			)
		);

		if ( is_wp_error( $response ) ) {
			return array( 'ok' => false, 'error' => $response->get_error_message() );
		}

		$http = (int) wp_remote_retrieve_response_code( $response );
		$raw  = wp_remote_retrieve_body( $response );
		$body = json_decode( $raw, true );

		// 200 recorded/updated, 201 created, 202 ignored-with-reason.
		if ( 200 === $http || 201 === $http ) {
			return array( 'ok' => true, 'http' => $http, 'response' => is_array( $body ) ? $body : array( 'raw' => $raw ) );
		}

		if ( 202 === $http && is_array( $body ) ) {
			return array( 'ok' => true, 'http' => $http, 'ignored' => true, 'response' => $body );
		}

		$error = is_array( $body ) && ! empty( $body['error'] ) ? $body['error'] : sprintf( 'HTTP %d', $http );
		if ( 401 === $http ) {
			$error = __( 'The network rejected this store\'s token. It may have been revoked — reconnect the store.', 'viralpeps-affiliate' );
		}

		return array( 'ok' => false, 'http' => $http, 'error' => $error, 'response' => is_array( $body ) ? $body : array( 'raw' => $raw ) );
	}

	/**
	 * Line items, excluding shipping and fees by construction.
	 *
	 * Prices are sent as the pre-discount line price plus the share of the
	 * cart discount, so the network reconstructs what the customer actually
	 * paid per item rather than the list price.
	 *
	 * @param WC_Order $order Order.
	 * @return array
	 */
	private function items( $order ) {
		$items = array();

		foreach ( $order->get_items() as $item ) {
			if ( ! $item instanceof WC_Order_Item_Product ) {
				continue;
			}

			$qty = max( 1, (int) $item->get_quantity() );

			// Subtotal is pre-discount; total is post-discount. Use the
			// post-discount line total divided by qty so discounts land
			// proportionally on each item.
			$line_total = (float) $item->get_total();
			$line_tax   = (float) $item->get_total_tax();
			$unit       = ( $line_total + $line_tax ) / $qty;

			$items[] = array(
				'sku'      => (string) $item->get_product_id() ? (string) get_post_meta( $item->get_product_id(), '_sku', true ) : '',
				'name'     => (string) $item->get_name(),
				'quantity' => $qty,
				'price'    => $this->money( $unit ),
			);
		}

		return $items;
	}

	/**
	 * A stable reference for the customer, so the network can tell new from
	 * returning without receiving identifiable data.
	 *
	 * @param WC_Order $order Order.
	 * @return string
	 */
	private function customer_ref( $order ) {
		$user_id = (int) $order->get_customer_id();
		if ( $user_id > 0 ) {
			return 'u_' . $user_id;
		}
		$email = (string) $order->get_billing_email();
		if ( '' === $email ) {
			return '';
		}
		// Salted hash: lets the network match repeat buyers without ever
		// holding the address itself.
		$salt = (string) get_option( 'vp_aff_customer_salt', '' );
		if ( '' === $salt ) {
			$salt = wp_generate_password( 32, false, false );
			update_option( 'vp_aff_customer_salt', $salt, false );
		}
		return 'e_' . hash_hmac( 'sha256', strtolower( trim( $email ) ), $salt );
	}

	/**
	 * When the order happened, in UTC ISO 8601.
	 *
	 * @param WC_Order $order Order.
	 * @return string
	 */
	private function order_timestamp( $order ) {
		$date = $order->get_date_created();
		if ( $date instanceof WC_DateTime ) {
			return $date->format( 'c' );
		}
		return gmdate( 'c' );
	}

	/**
	 * Round to 2dp float.
	 *
	 * @param mixed $value Value.
	 * @return float
	 */
	private function money( $value ) {
		return round( (float) $value, 2 );
	}
}
