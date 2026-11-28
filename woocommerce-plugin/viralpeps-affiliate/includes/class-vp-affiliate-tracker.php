<?php
/**
 * Click capture and order attribution.
 *
 * @package ViralPeps_Affiliate
 */

defined( 'ABSPATH' ) || exit;

/**
 * Reads the click id the network appends to an outbound link, stores it in a
 * first-party cookie, and stamps it onto the order at checkout.
 *
 * First click wins: if the customer already has a live cookie we keep it, so
 * a later click cannot steal attribution from the one that earned it.
 */
class VP_Affiliate_Tracker {

	/** @var VP_Affiliate_Plugin */
	private $plugin;

	/** Whether the current request already wrote the cookie. */
	private $cookie_written = false;

	/**
	 * Constructor.
	 *
	 * @param VP_Affiliate_Plugin $plugin Plugin instance.
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;

		// Capture as early as possible so a cached page still records the hit.
		add_action( 'init', array( $this, 'maybe_capture_click' ), 1 );

		// Persist the click id onto the order.
		add_action( 'woocommerce_checkout_create_order', array( $this, 'stamp_order' ), 10, 2 );
		add_action( 'woocommerce_store_api_checkout_order_processed', array( $this, 'stamp_order_blocks' ), 10, 1 );

		// Send the conversion when the order reaches a paid-ish state.
		add_action( 'woocommerce_payment_complete', array( $this, 'on_payment_complete' ), 10, 1 );
		add_action( 'woocommerce_order_status_pending', array( $this, 'on_order_pending' ), 10, 1 );
		add_action( 'woocommerce_order_status_on-hold', array( $this, 'on_order_on_hold' ), 10, 1 );
		add_action( 'woocommerce_order_status_processing', array( $this, 'on_order_processing' ), 10, 1 );
		add_action( 'woocommerce_order_status_completed', array( $this, 'on_order_completed' ), 10, 1 );
		add_action( 'woocommerce_order_status_failed', array( $this, 'on_order_failed' ), 10, 1 );
		add_action( 'woocommerce_order_status_refunded', array( $this, 'on_order_refunded' ), 10, 1 );
		add_action( 'woocommerce_order_status_cancelled', array( $this, 'on_order_cancelled' ), 10, 1 );
	}

	/**
	 * Read ?vp_tid= and set a first-party cookie.
	 */
	public function maybe_capture_click() {
		if ( $this->cookie_written || is_admin() ) {
			return;
		}

		$param = VP_Affiliate_Plugin::TRACKING_PARAM;
		if ( empty( $_GET[ $param ] ) ) {
			return;
		}

		// Sanitise hard: the value ends up in a cookie and a DB row.
		$tid = preg_replace( '/[^a-zA-Z0-9_-]/', '', (string) wp_unslash( $_GET[ $param ] ) );
		if ( '' === $tid || strlen( $tid ) > 64 ) {
			return;
		}

		if ( $this->has_live_cookie() ) {
			// First click wins — do not overwrite an existing attribution.
			$this->cookie_written = true;
			return;
		}

		$expiry = time() + ( VP_Affiliate_Plugin::COOKIE_DAYS * DAY_IN_SECONDS );

		if ( ! headers_sent() ) {
			setcookie(
				VP_Affiliate_Plugin::COOKIE_NAME,
				$tid,
				array(
					'expires'  => $expiry,
					'path'     => COOKIEPATH ? COOKIEPATH : '/',
					'domain'   => COOKIE_DOMAIN ? COOKIE_DOMAIN : '',
					'secure'   => is_ssl(),
					'httponly' => false, // Read by nothing client-side, but keeping it visible helps store owners debug.
					'samesite' => 'Lax',
				)
			);
		}

		$_COOKIE[ VP_Affiliate_Plugin::COOKIE_NAME ] = $tid;
		$this->cookie_written = true;

		$this->plugin->log( 'click captured: ' . $tid );
	}

	/**
	 * Is there already a non-empty click cookie on this request?
	 *
	 * @return bool
	 */
	public function has_live_cookie() {
		$name = VP_Affiliate_Plugin::COOKIE_NAME;
		return ! empty( $_COOKIE[ $name ] );
	}

	/**
	 * The current click id, or ''.
	 *
	 * @return string
	 */
	public function get_click_id() {
		$name = VP_Affiliate_Plugin::COOKIE_NAME;
		if ( empty( $_COOKIE[ $name ] ) ) {
			return '';
		}
		return preg_replace( '/[^a-zA-Z0-9_-]/', '', (string) wp_unslash( $_COOKIE[ $name ] ) );
	}

	/**
	 * Stamp the click id onto a classic-checkout order.
	 *
	 * @param WC_Order $order Order being created.
	 * @param array    $data  Posted checkout data (unused).
	 */
	public function stamp_order( $order, $data = array() ) {
		$tid = $this->get_click_id();
		if ( '' === $tid ) {
			return;
		}
		$order->update_meta_data( '_vp_click_id', $tid );
		$this->plugin->log( 'order stamped: #' . $order->get_id() . ' tid=' . $tid );
	}

	/**
	 * Stamp the click id onto a Cart/Checkout Blocks order.
	 *
	 * Blocks creates the order through the Store API, which never fires
	 * woocommerce_checkout_create_order, so it needs its own hook.
	 *
	 * @param WC_Order $order Order created by the Store API.
	 */
	public function stamp_order_blocks( $order ) {
		if ( ! $order instanceof WC_Order ) {
			return;
		}
		if ( $order->get_meta( '_vp_click_id' ) ) {
			return;
		}
		$tid = $this->get_click_id();
		if ( '' === $tid ) {
			return;
		}
		$order->update_meta_data( '_vp_click_id', $tid );
		$order->save();
		$this->plugin->log( 'blocks order stamped: #' . $order->get_id() . ' tid=' . $tid );
	}

	// ── lifecycle hooks ───────────────────────────────────────────────────

	/**
	 * Payment complete.
	 *
	 * @param int $order_id Order id.
	 */
	public function on_payment_complete( $order_id ) {
		$this->report_order( $order_id, 'completed' );
	}

	/**
	 * Status → pending. The order exists but nothing has been paid yet, so the
	 * network records it as an open sale worth zero commission until it moves.
	 *
	 * @param int $order_id Order id.
	 */
	public function on_order_pending( $order_id ) {
		$this->report_order( $order_id, 'pending' );
	}

	/**
	 * Status → on-hold. This is the bank-transfer / crypto state: the customer
	 * has ordered but the money has not landed. Recorded, not credited.
	 *
	 * @param int $order_id Order id.
	 */
	public function on_order_on_hold( $order_id ) {
		$this->report_order( $order_id, 'pending' );
	}

	/**
	 * Status → failed. Payment attempt did not go through.
	 *
	 * @param int $order_id Order id.
	 */
	public function on_order_failed( $order_id ) {
		$this->report_order( $order_id, 'failed' );
	}

	/**
	 * Status → processing.
	 *
	 * @param int $order_id Order id.
	 */
	public function on_order_processing( $order_id ) {
		$this->report_order( $order_id, 'completed' );
	}

	/**
	 * Status → completed.
	 *
	 * @param int $order_id Order id.
	 */
	public function on_order_completed( $order_id ) {
		$this->report_order( $order_id, 'completed' );
	}

	/**
	 * Status → refunded.
	 *
	 * @param int $order_id Order id.
	 */
	public function on_order_refunded( $order_id ) {
		$this->report_order( $order_id, 'refunded' );
	}

	/**
	 * Status → cancelled.
	 *
	 * @param int $order_id Order id.
	 */
	public function on_order_cancelled( $order_id ) {
		$this->report_order( $order_id, 'cancelled' );
	}

	/**
	 * Build and send the conversion payload for an order.
	 *
	 * @param int    $order_id Order id.
	 * @param string $status   Status to report.
	 */
	private function report_order( $order_id, $status ) {
		$order = wc_get_order( $order_id );
		if ( ! $order instanceof WC_Order ) {
			return;
		}

		// Never report an order that did not come from the network.
		if ( ! $order->get_meta( '_vp_click_id' ) ) {
			return;
		}

		// Each order reports once per status, but a repeat of the SAME status
		// is a no-op — the network is idempotent but there is no need to talk.
		$last = $order->get_meta( '_vp_reported_status' );
		if ( $last === $status ) {
			return;
		}

		// Terminal states are final. A refunded or cancelled order must never
		// be re-credited by a stray payment_complete hook firing afterwards
		// (gateway retries, admin re-saving, a replayed webhook). Only a
		// refund on a previously-completed order may move from completed.
		if ( ( 'refunded' === $last || 'cancelled' === $last ) && 'completed' === $status ) {
			$this->plugin->log( 'ignoring ' . $status . ' on #' . $order_id . ' — already ' . $last );
			return;
		}

		// A refund or cancellation may follow any earlier state, including
		// pending and failed, so those are never blocked. Forwards transitions
		// out of a terminal state are the only thing forbidden above.

		$result = $this->plugin->reporter->report_order( $order, $status );

		if ( ! empty( $result['ok'] ) ) {
			$order->update_meta_data( '_vp_reported_status', $status );
			$order->update_meta_data( '_vp_reported_at', gmdate( 'c' ) );
			$order->save();
			$this->plugin->log( 'reported #' . $order_id . ' as ' . $status );
		} else {
			$this->plugin->log( 'report failed #' . $order_id . ': ' . ( isset( $result['error'] ) ? $result['error'] : 'unknown' ) );
		}
	}
}
