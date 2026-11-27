<?php
/**
 * Admin settings screen and claim-code connection flow.
 *
 * @package ViralPeps_Affiliate
 */

defined( 'ABSPATH' ) || exit;

/**
 * Builds the Settings → ViralPeps Affiliate screen and handles the
 * one-time claim-code exchange that turns a supplier profile into a
 * connected store.
 */
class VP_Affiliate_Admin {

	/** @var VP_Affiliate_Plugin */
	private $plugin;

	/** Admin page slug. */
	const PAGE = 'viralpeps-affiliate';

	/**
	 * Constructor.
	 *
	 * @param VP_Affiliate_Plugin $plugin Plugin instance.
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;

		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		add_action( 'admin_post_vp_aff_connect', array( $this, 'handle_connect' ) );
		add_action( 'admin_post_vp_aff_disconnect', array( $this, 'handle_disconnect' ) );
		add_action( 'admin_post_vp_aff_clear_log', array( $this, 'handle_clear_log' ) );
		add_action( 'admin_post_vp_aff_send_test', array( $this, 'handle_send_test' ) );
	}

	/** Register the menu entry. */
	public function add_menu() {
		add_submenu_page(
			'woocommerce',
			__( 'ViralPeps Affiliate', 'viralpeps-affiliate' ),
			__( 'ViralPeps Affiliate', 'viralpeps-affiliate' ),
			'manage_woocommerce',
			self::PAGE,
			array( $this, 'render_page' )
		);
	}

	/** Render the settings page. */
	public function render_page() {
		if ( ! current_user_can( 'manage_woocommerce' ) ) {
			wp_die( esc_html__( 'You do not have permission to manage this store.', 'viralpeps-affiliate' ) );
		}

		$connected = $this->plugin->is_connected();
		$vendor    = $this->plugin->get_vendor_slug();
		$hint      = $this->plugin->get_token_hint();
		$store     = (string) get_option( VP_Affiliate_Plugin::OPT_STORE_NAME, '' );
		$connected_at = (string) get_option( VP_Affiliate_Plugin::OPT_CONNECTED_AT, '' );
		$notice    = isset( $_GET['vp_notice'] ) ? sanitize_key( wp_unslash( $_GET['vp_notice'] ) ) : '';
		$message   = isset( $_GET['vp_message'] ) ? sanitize_text_field( rawurldecode( wp_unslash( $_GET['vp_message'] ) ) ) : '';
		?>
		<div class="wrap">
			<h1><?php esc_html_e( 'ViralPeps Affiliate', 'viralpeps-affiliate' ); ?></h1>

			<?php $this->render_notice( $notice, $message ); ?>

			<?php if ( ! $connected ) : ?>
				<?php $this->render_connect_form(); ?>
			<?php else : ?>
				<?php $this->render_connected( $vendor, $hint, $store, $connected_at ); ?>
			<?php endif; ?>

			<?php $this->render_log(); ?>
		</div>
		<?php
	}

	/**
	 * Admin notice from a redirect.
	 *
	 * @param string $notice  Notice key.
	 * @param string $message Extra text.
	 */
	private function render_notice( $notice, $message ) {
		if ( ! $notice ) {
			return;
		}
		$map = array(
			'connected'    => array( 'success', __( 'Store connected. Conversions will now report automatically.', 'viralpeps-affiliate' ) ),
			'disconnected' => array( 'success', __( 'Store disconnected. No further conversions will be reported.', 'viralpeps-affiliate' ) ),
			'log_cleared'  => array( 'success', __( 'Log cleared.', 'viralpeps-affiliate' ) ),
			'test_sent'    => array( 'success', __( 'Test conversion sent to the network.', 'viralpeps-affiliate' ) ),
			'error'        => array( 'error', $message ? $message : __( 'Something went wrong.', 'viralpeps-affiliate' ) ),
		);
		if ( ! isset( $map[ $notice ] ) ) {
			return;
		}
		$class = 'notice notice-' . $map[ $notice ][0] . ' is-dismissible';
		printf( '<div class="%s"><p>%s</p></div>', esc_attr( $class ), esc_html( $map[ $notice ][1] ) );
	}

	/** The claim-code form shown before the store is connected. */
	private function render_connect_form() {
		?>
		<div class="card" style="max-width:680px;padding:8px 20px 20px;">
			<h2><?php esc_html_e( 'Connect this store', 'viralpeps-affiliate' ); ?></h2>
			<p>
				<?php esc_html_e( 'Enter the claim code shown on your ViralPeps supplier profile. It is single-use and expires 24 hours after it is generated.', 'viralpeps-affiliate' ); ?>
			</p>
			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<input type="hidden" name="action" value="vp_aff_connect" />
				<?php wp_nonce_field( 'vp_aff_connect' ); ?>
				<table class="form-table" role="presentation">
					<tr>
						<th scope="row"><label for="vp_claim_code"><?php esc_html_e( 'Claim code', 'viralpeps-affiliate' ); ?></label></th>
						<td>
							<input name="vp_claim_code" id="vp_claim_code" type="text" class="regular-text"
								placeholder="vpc_xxxxxxxxxxxxxxxx" autocomplete="off" spellcheck="false" required />
							<p class="description">
								<?php esc_html_e( 'Found under Affiliate Network on your ViralPeps profile. Looks like vpc_ followed by 16 characters.', 'viralpeps-affiliate' ); ?>
							</p>
						</td>
					</tr>
				</table>
				<?php submit_button( __( 'Connect store', 'viralpeps-affiliate' ) ); ?>
			</form>
		</div>
		<?php
	}

	/**
	 * Connected state: status, token hint, test + disconnect actions.
	 *
	 * @param string $vendor       Supplier slug.
	 * @param string $hint         Token hint.
	 * @param string $store        Store name as registered.
	 * @param string $connected_at ISO timestamp.
	 */
	private function render_connected( $vendor, $hint, $store, $connected_at ) {
		?>
		<div class="card" style="max-width:680px;padding:8px 20px 20px;">
			<h2 style="margin-bottom:4px;">
				<span style="color:#46b450;">&#10003;</span>
				<?php esc_html_e( 'Connected', 'viralpeps-affiliate' ); ?>
			</h2>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><?php esc_html_e( 'Supplier', 'viralpeps-affiliate' ); ?></th>
					<td><code><?php echo esc_html( $vendor ); ?></code>
						<?php if ( $store ) : ?>
							<span style="color:#666;"> &mdash; <?php echo esc_html( $store ); ?></span>
						<?php endif; ?>
					</td>
				</tr>
				<tr>
					<th scope="row"><?php esc_html_e( 'Store token', 'viralpeps-affiliate' ); ?></th>
					<td><code><?php echo esc_html( $hint ); ?></code>
						<p class="description">
							<?php esc_html_e( 'Stored on this server only. The full token is never displayed and never leaves this site except when reporting a conversion.', 'viralpeps-affiliate' ); ?>
						</p>
					</td>
				</tr>
				<?php if ( $connected_at ) : ?>
				<tr>
					<th scope="row"><?php esc_html_e( 'Connected since', 'viralpeps-affiliate' ); ?></th>
					<td><?php echo esc_html( $connected_at ); ?></td>
				</tr>
				<?php endif; ?>
				<tr>
					<th scope="row"><?php esc_html_e( 'Attribution window', 'viralpeps-affiliate' ); ?></th>
					<td><?php echo esc_html( sprintf( __( '%d days from the click', 'viralpeps-affiliate' ), VP_Affiliate_Plugin::COOKIE_DAYS ) ); ?></td>
				</tr>
			</table>

			<p style="display:flex;gap:8px;flex-wrap:wrap;">
				<a class="button" href="<?php echo esc_url( wp_nonce_url( admin_url( 'admin-post.php?action=vp_aff_send_test' ), 'vp_aff_send_test' ) ); ?>">
					<?php esc_html_e( 'Send a test conversion', 'viralpeps-affiliate' ); ?>
				</a>
				<a class="button button-link-delete" href="<?php echo esc_url( wp_nonce_url( admin_url( 'admin-post.php?action=vp_aff_disconnect' ), 'vp_aff_disconnect' ) ); ?>"
					onclick="return confirm('<?php echo esc_js( __( 'Disconnect this store from the affiliate network?', 'viralpeps-affiliate' ) ); ?>');">
					<?php esc_html_e( 'Disconnect', 'viralpeps-affiliate' ); ?>
				</a>
			</p>
		</div>
		<?php
	}

	/** Recent activity table. */
	private function render_log() {
		$log = $this->plugin->get_log();
		?>
		<div class="card" style="max-width:680px;padding:8px 20px 20px;margin-top:16px;">
			<h2 style="display:flex;align-items:center;gap:12px;">
				<?php esc_html_e( 'Recent activity', 'viralpeps-affiliate' ); ?>
				<?php if ( ! empty( $log ) ) : ?>
					<a class="button button-small" href="<?php echo esc_url( wp_nonce_url( admin_url( 'admin-post.php?action=vp_aff_clear_log' ), 'vp_aff_clear_log' ) ); ?>">
						<?php esc_html_e( 'Clear', 'viralpeps-affiliate' ); ?>
					</a>
				<?php endif; ?>
			</h2>
			<?php if ( empty( $log ) ) : ?>
				<p style="color:#666;"><?php esc_html_e( 'Nothing yet. Activity appears here as visits are tracked and orders reported.', 'viralpeps-affiliate' ); ?></p>
			<?php else : ?>
				<pre style="max-height:260px;overflow:auto;background:#f6f7f7;padding:12px;border:1px solid #dcdcde;font-size:12px;line-height:1.6;"><?php
					echo esc_html( implode( "\n", array_reverse( $log ) ) );
				?></pre>
			<?php endif; ?>
		</div>
		<?php
	}

	/**
	 * Exchange a claim code for the store's server token.
	 */
	public function handle_connect() {
		if ( ! current_user_can( 'manage_woocommerce' ) ) {
			wp_die( esc_html__( 'Permission denied.', 'viralpeps-affiliate' ) );
		}
		check_admin_referer( 'vp_aff_connect' );

		$code = isset( $_POST['vp_claim_code'] ) ? trim( sanitize_text_field( wp_unslash( $_POST['vp_claim_code'] ) ) ) : '';
		if ( '' === $code ) {
			$this->redirect_error( __( 'Please enter a claim code.', 'viralpeps-affiliate' ) );
		}

		$response = wp_remote_post(
			VP_Affiliate_Plugin::CLAIM_ENDPOINT,
			array(
				'timeout' => 20,
				'headers' => array(
					'Content-Type' => 'application/json',
					'Accept'       => 'application/json',
				),
				'body'    => wp_json_encode(
					array(
						'claim_code'  => $code,
						'store_url'   => home_url(),
						'store_name'  => get_bloginfo( 'name' ),
						'platform'    => 'woocommerce',
						'plugin_ver'  => VP_AFF_VERSION,
					)
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			$this->redirect_error( $response->get_error_message() );
		}

		$status = (int) wp_remote_retrieve_response_code( $response );
		$body   = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( 200 !== $status || ! is_array( $body ) || empty( $body['token'] ) || empty( $body['vendor_slug'] ) ) {
			$reason = is_array( $body ) && ! empty( $body['reason'] ) ? $body['reason'] : sprintf( 'HTTP %d', $status );
			$this->plugin->log( 'claim failed: ' . $reason );
			$this->redirect_error( $this->humanise_claim_error( $reason ) );
		}

		update_option( VP_Affiliate_Plugin::OPT_TOKEN, $body['token'], false );
		update_option( VP_Affiliate_Plugin::OPT_TOKEN_HINT, isset( $body['token_hint'] ) ? $body['token_hint'] : $this->hint_from_token( $body['token'] ), false );
		update_option( VP_Affiliate_Plugin::OPT_VENDOR_SLUG, $body['vendor_slug'], false );
		update_option( VP_Affiliate_Plugin::OPT_STORE_NAME, get_bloginfo( 'name' ), false );
		update_option( VP_Affiliate_Plugin::OPT_CONNECTED_AT, gmdate( 'Y-m-d H:i:s' ), false );

		$this->plugin->log( 'connected as ' . $body['vendor_slug'] );

		wp_safe_redirect( add_query_arg( 'vp_notice', 'connected', $this->page_url() ) );
		exit;
	}

	/**
	 * Build a display hint from a token: first 8 + ellipsis + last 4.
	 *
	 * @param string $token Full token.
	 * @return string
	 */
	private function hint_from_token( $token ) {
		$token = (string) $token;
		if ( strlen( $token ) < 16 ) {
			return 'vps_****';
		}
		return substr( $token, 0, 8 ) . '…' . substr( $token, -4 );
	}

	/**
	 * Map a machine reason to something a store owner can act on.
	 *
	 * @param string $reason Machine reason.
	 * @return string
	 */
	private function humanise_claim_error( $reason ) {
		$map = array(
			'invalid_claim_code' => __( 'That claim code is not valid. Generate a fresh one from your ViralPeps profile.', 'viralpeps-affiliate' ),
			'claim_code_expired' => __( 'That claim code has expired. Claim codes last 24 hours — generate a new one.', 'viralpeps-affiliate' ),
			'claim_code_used'    => __( 'That claim code has already been used. Generate a new one from your profile.', 'viralpeps-affiliate' ),
			'store_already_connected' => __( 'This store is already connected. Disconnect first if you want to re-connect it.', 'viralpeps-affiliate' ),
			'vendor_not_found'   => __( 'No supplier profile matches that code.', 'viralpeps-affiliate' ),
		);
		return isset( $map[ $reason ] ) ? $map[ $reason ] : $reason;
	}

	/** Disconnect handler. */
	public function handle_disconnect() {
		if ( ! current_user_can( 'manage_woocommerce' ) ) {
			wp_die( esc_html__( 'Permission denied.', 'viralpeps-affiliate' ) );
		}
		check_admin_referer( 'vp_aff_disconnect' );

		$this->plugin->log( 'disconnected' );
		$this->plugin->disconnect();

		wp_safe_redirect( add_query_arg( 'vp_notice', 'disconnected', $this->page_url() ) );
		exit;
	}

	/** Clear log handler. */
	public function handle_clear_log() {
		if ( ! current_user_can( 'manage_woocommerce' ) ) {
			wp_die( esc_html__( 'Permission denied.', 'viralpeps-affiliate' ) );
		}
		check_admin_referer( 'vp_aff_clear_log' );
		$this->plugin->clear_log();
		wp_safe_redirect( add_query_arg( 'vp_notice', 'log_cleared', $this->page_url() ) );
		exit;
	}

	/** Send a test conversion so the owner can prove the link works. */
	public function handle_send_test() {
		if ( ! current_user_can( 'manage_woocommerce' ) ) {
			wp_die( esc_html__( 'Permission denied.', 'viralpeps-affiliate' ) );
		}
		check_admin_referer( 'vp_aff_send_test' );

		if ( ! $this->plugin->is_connected() ) {
			$this->redirect_error( __( 'Connect the store first.', 'viralpeps-affiliate' ) );
		}

		$result = $this->plugin->reporter->report_test();

		if ( empty( $result['ok'] ) ) {
			$this->redirect_error( isset( $result['error'] ) ? $result['error'] : __( 'Test failed.', 'viralpeps-affiliate' ) );
		}

		$this->plugin->log( 'test conversion: ' . wp_json_encode( $result['response'] ) );
		wp_safe_redirect( add_query_arg( 'vp_notice', 'test_sent', $this->page_url() ) );
		exit;
	}

	/**
	 * Redirect back to the settings page with an error.
	 *
	 * @param string $message Message.
	 */
	private function redirect_error( $message ) {
		wp_safe_redirect(
			add_query_arg(
				array(
					'vp_notice'  => 'error',
					'vp_message' => rawurlencode( $message ),
				),
				$this->page_url()
			)
		);
		exit;
	}

	/**
	 * Settings page URL.
	 *
	 * @return string
	 */
	private function page_url() {
		return admin_url( 'admin.php?page=' . self::PAGE );
	}
}
