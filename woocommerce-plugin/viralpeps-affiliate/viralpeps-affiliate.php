<?php
/**
 * Plugin Name:       ViralPeps Affiliate
 * Plugin URI:        https://www.viralpeps.co.uk/affiliate-network
 * Description:       Connects your WooCommerce store to the ViralPeps affiliate network. Tracks referred visits, attributes orders, and reports conversions automatically.
 * Version:           1.0.2
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            ViralPeps
 * Author URI:        https://www.viralpeps.co.uk
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       viralpeps-affiliate
 * Domain Path:       /languages
 * WC requires at least: 7.0
 * WC tested up to:   9.5
 *
 * @package ViralPeps_Affiliate
 */

defined( 'ABSPATH' ) || exit;

define( 'VP_AFF_VERSION', '1.0.2' );
define( 'VP_AFF_PLUGIN_FILE', __FILE__ );
define( 'VP_AFF_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'VP_AFF_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/**
 * Main plugin bootstrap.
 */
final class VP_Affiliate_Plugin {

	/** Network endpoint for conversion reports. */
	const CONVERSION_ENDPOINT = 'https://www.viralpeps.co.uk/api/affiliate/conversions';

	/** Network endpoint that exchanges a claim code for the store's token. */
	const CLAIM_ENDPOINT = 'https://www.viralpeps.co.uk/api/affiliate/store-claim';

	/** Query param the network appends to the outbound click. */
	const TRACKING_PARAM = 'vp_tid';

	/** Cookie name that carries the click id through the customer's session. */
	const COOKIE_NAME = 'vp_tid';

	/** How long a click keeps attribution, in days. Mirrors the network. */
	const COOKIE_DAYS = 90;

	/** Option keys. */
	const OPT_TOKEN        = 'vp_aff_token';
	const OPT_TOKEN_HINT   = 'vp_aff_token_hint';
	const OPT_VENDOR_SLUG  = 'vp_aff_vendor_slug';
	const OPT_STORE_NAME   = 'vp_aff_store_name';
	const OPT_CONNECTED_AT = 'vp_aff_connected_at';
	const OPT_LAST_REPORT  = 'vp_aff_last_report';
	const OPT_LOG          = 'vp_aff_log';

	/** @var VP_Affiliate_Plugin|null */
	private static $instance = null;

	/** @var VP_Affiliate_Admin */
	public $admin;

	/** @var VP_Affiliate_Tracker */
	public $tracker;

	/** @var VP_Affiliate_Reporter */
	public $reporter;

	/**
	 * Singleton accessor.
	 *
	 * @return VP_Affiliate_Plugin
	 */
	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/** Constructor. */
	private function __construct() {
		$this->includes();
		$this->init_hooks();

		$this->admin    = new VP_Affiliate_Admin( $this );
		$this->tracker  = new VP_Affiliate_Tracker( $this );
		$this->reporter = new VP_Affiliate_Reporter( $this );
	}

	/** Load files. */
	private function includes() {
		require_once VP_AFF_PLUGIN_DIR . 'includes/class-vp-affiliate-admin.php';
		require_once VP_AFF_PLUGIN_DIR . 'includes/class-vp-affiliate-tracker.php';
		require_once VP_AFF_PLUGIN_DIR . 'includes/class-vp-affiliate-reporter.php';
	}

	/** Wire up WordPress. */
	private function init_hooks() {
		add_action( 'plugins_loaded', array( $this, 'load_textdomain' ) );
		add_action( 'before_woocommerce_init', array( $this, 'declare_hpos_compatibility' ) );
		add_filter( 'plugin_action_links_' . plugin_basename( VP_AFF_PLUGIN_FILE ), array( $this, 'action_links' ) );
		add_action( 'admin_notices', array( $this, 'woocommerce_missing_notice' ) );
	}

	/** Translations. */
	public function load_textdomain() {
		load_plugin_textdomain( 'viralpeps-affiliate', false, dirname( plugin_basename( VP_AFF_PLUGIN_FILE ) ) . '/languages' );
	}

	/** Declare HPOS (custom order tables) compatibility. */
	public function declare_hpos_compatibility() {
		if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) ) {
			\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', VP_AFF_PLUGIN_FILE, true );
		}
	}

	/**
	 * Settings link on the plugins screen.
	 *
	 * @param array $links Existing links.
	 * @return array
	 */
	public function action_links( $links ) {
		$url = admin_url( 'admin.php?page=viralpeps-affiliate' );
		array_unshift( $links, '<a href="' . esc_url( $url ) . '">' . esc_html__( 'Settings', 'viralpeps-affiliate' ) . '</a>' );
		return $links;
	}

	/** Warn when WooCommerce is not active. */
	public function woocommerce_missing_notice() {
		if ( class_exists( 'WooCommerce' ) ) {
			return;
		}
		echo '<div class="notice notice-error"><p>';
		esc_html_e( 'ViralPeps Affiliate requires WooCommerce to be installed and active.', 'viralpeps-affiliate' );
		echo '</p></div>';
	}

	// ── connection state ──────────────────────────────────────────────────

	/**
	 * Is the store connected to the network?
	 *
	 * @return bool
	 */
	public function is_connected() {
		$token  = (string) get_option( self::OPT_TOKEN, '' );
		$vendor = (string) get_option( self::OPT_VENDOR_SLUG, '' );
		return '' !== $token && '' !== $vendor;
	}

	/**
	 * The stored server token (never printed to the page).
	 *
	 * @return string
	 */
	public function get_token() {
		return (string) get_option( self::OPT_TOKEN, '' );
	}

	/**
	 * The supplier slug this store reports under.
	 *
	 * @return string
	 */
	public function get_vendor_slug() {
		return (string) get_option( self::OPT_VENDOR_SLUG, '' );
	}

	/**
	 * Display-only hint of the token, e.g. vps_a1b2…f9.
	 *
	 * @return string
	 */
	public function get_token_hint() {
		return (string) get_option( self::OPT_TOKEN_HINT, '' );
	}

	/** Forget the connection. */
	public function disconnect() {
		delete_option( self::OPT_TOKEN );
		delete_option( self::OPT_TOKEN_HINT );
		delete_option( self::OPT_VENDOR_SLUG );
		delete_option( self::OPT_STORE_NAME );
		delete_option( self::OPT_CONNECTED_AT );
	}

	/**
	 * Append a line to the rolling debug log (last 50 entries).
	 *
	 * @param string $message Log line.
	 */
	public function log( $message ) {
		$log = get_option( self::OPT_LOG, array() );
		if ( ! is_array( $log ) ) {
			$log = array();
		}
		$log[] = gmdate( 'Y-m-d H:i:s' ) . ' ' . $message;
		if ( count( $log ) > 50 ) {
			$log = array_slice( $log, -50 );
		}
		update_option( self::OPT_LOG, $log, false );
	}

	/**
	 * Read the rolling log.
	 *
	 * @return array
	 */
	public function get_log() {
		$log = get_option( self::OPT_LOG, array() );
		return is_array( $log ) ? $log : array();
	}

	/** Empty the log. */
	public function clear_log() {
		delete_option( self::OPT_LOG );
	}
}

/**
 * Boot the plugin once WooCommerce is known to exist.
 */
function vp_affiliate_bootstrap() {
	if ( ! class_exists( 'WooCommerce' ) ) {
		// Keep the admin notice path alive so the user learns why nothing works.
		VP_Affiliate_Plugin::instance();
		return;
	}
	VP_Affiliate_Plugin::instance();
}
add_action( 'plugins_loaded', 'vp_affiliate_bootstrap', 5 );

/**
 * Convenience accessor.
 *
 * @return VP_Affiliate_Plugin
 */
function vp_affiliate() {
	return VP_Affiliate_Plugin::instance();
}
