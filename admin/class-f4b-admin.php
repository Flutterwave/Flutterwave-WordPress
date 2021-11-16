<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://developer.flutterwave.com/docs
 * @since      0.1.0
 *
 * @package    Flutterwave_For_Business
 * @subpackage Flutterwave_For_Business/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Flutterwave_For_Business
 * @subpackage Flutterwave_For_Business/admin
 * @author     Flutterwave Developers <developers@flutterwavego.com>
 */
class F4b_Admin {

    /**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
    public function __construct( $plugin_name, $version )
    {
        $this->plugin_name = $plugin_name;
		$this->version = $version;
    }

    /**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles($hook) {

        $url_params = wp_unslash( $_GET );

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Fpf_Flutterwave_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Fpf_Flutterwave_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

         //get page as well

        // if ( !isset($url_params['path']) || empty($url_params['path'])) {
        //      return;
        // }

		// if($hook == 'woocommerce_page_wc-admin' && $url_params['path'] == '/overview' || $hook == 'woocommerce_page_wc-admin' && $url_params['path'] == '/payments/settings'){
		// 	// wp_dequeue_style($this->plugin_name."_settings");
		// 	wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/flutterwave-admin.css', array(), $this->version, 'all' );
		// }

	}

    /**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts($hook) {
        global $pagenow, $submenu;
        $url_params = wp_unslash( $_GET );
		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Fpf_Flutterwave_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Fpf_Flutterwave_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

        // if ( !isset($url_params['path']) || empty($url_params['path']))
        // {
        //     return;
        // }
        // if($url_params['path'] == '/overview'|| $url_params['path'] == '/payments/settings'){
		// 	$script_path = '/js/overview.js';
    	// 	$script_asset_path = dirname( __FILE__ ) . '/js/overview.asset.php';
    	// 	$script_asset = file_exists( $script_asset_path )
        // 	? require( $script_asset_path )
        // 	: array( 'dependencies' => array(), 'version' => filemtime( $script_path ) );
		// 	wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/overview.js', $script_asset['dependencies'], $script_asset['version'], false );
		// }

	}

    /**
    * Overview page content
    * @return void
    */
    public function admin_overview_page() {
		include_once( plugin_dir_path( __FILE__ ) . 'views/admin-overview-page.php' );
		//include_once( plugin_dir_path( __FILE__ ) . 'partials/fpf-flutterwave-admin-display.php' );
	}

	/**
    * Admin page content
    * @return void
    */
    public function admin_setting_page() {
      include_once( plugin_dir_path( __FILE__ ) . 'views/admin-settings-page.php' );
      //include_once( plugin_dir_path( __FILE__ ) . 'partials/fpf-flutterwave-admin-display.php' );
    }

	/**
    * Form Settings page
    * @return void
    */
	public function form_setting_page() {
		include_once( plugin_dir_path( __FILE__ ) . 'views/admin-payment-form-page.php' );
	}

}