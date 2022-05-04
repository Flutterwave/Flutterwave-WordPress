<?php

/**
 * Plugin Name:     Flutterwave For Business
 * Plugin URI:      https://flutterwave.com/ng/
 * Description:     Official WordPress Plugin for Flutterwave for Business
 * Author:          Flutterwave Developers
 * Author URI:      https://developer.flutterwave.com/docs
 * Text Domain:     flutterwave-for-business
 * Domain Path:     /languages
 * Version:         1.1.0
 *
 * Elementor tested up to: 3.5.0
 * Elementor Pro tested up to: 3.5.0
 *
 * @package         Flutterwave_For_Business
 */

if( defined( 'ABSPATH')) return exit;

define('WC_F4B_VERSION', '1.1.0');
define('WC_F4B_PLUGIN_FILE', __FILE__);
define('WC_F4B_DIR_PATH', plugin_dir_path(WC_F4B_PLUGIN_FILE));
define('WC_F4B_URL', trailingslashit(plugins_url('/', __FILE__)));

/**
 * Activate the plugin.
 */
function f4b_on_activate()
{
    require_once WC_F4B_DIR_PATH . 'includes/class-f4b-activator.php';
    Flutterwave_For_Business_Activator::activate();
}
register_activation_hook(__FILE__, 'f4b_on_activate');


function f4b_add_action_plugin($links)
{
    $flonboarding = esc_url(get_admin_url(null, 'admin.php?page=f4b'));
    $mylinks_flw = array(
        '<a href="' . $flonboarding . '">' . __('Settings', 'General') . '</a>',
        '<a href="https://developer.flutterwave.com/discuss" target="_blank">Support</a>'
    );
    return array_merge($links, $mylinks_flw);
}

add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'f4b_add_action_plugin');

//admin enqueue styles
function f4b_admin_styles()
{
    wp_enqueue_style('f4b-admin-style', plugins_url('admin/css/settings.css', __FILE__));
}

function f4b_admin_scripts($hook)
{
    $asset_config_file = sprintf('%s/build/admin.asset.php', WC_F4B_DIR_PATH);
    $asset_config = require_once $asset_config_file;
    if (is_admin()) {
        wp_enqueue_script(
            'flwbusiness',
            plugins_url('build/admin.js', __FILE__),
            $asset_config['dependencies'],
            true
        );

        wp_localize_script('flwbusiness', 'f4b_data', [
            'apiUrl' => home_url('/wp-json'),
            'nonce' => wp_create_nonce('wp_rest'),
            'page' => $hook
        ]);
    }
}
add_action('admin_enqueue_scripts', 'f4b_admin_scripts');
add_action('admin_enqueue_scripts', 'f4b_admin_styles');

//create an admin menu
add_action('admin_menu', 'f4b_admin_menu');

function f4b_admin_menu()
{

    // if('')
    add_menu_page(
        'flutterwave', //page title
        'Flutterwave', //menu title
        'manage_options', //capabilities
        'f4b', //menu slug
        'f4b_overview_page', //function
        plugin_dir_url(__FILE__) . 'admin/images/flutterwave-logo.svg', //icon url
        '2.1', //after dashboard option
    );

    // $f4b_pages = [ 'transactions', 'subscriptions', 'plans', 'invoices', 'payouts' ];
    $f4b_pages = ['settings', 'transactions', 'plans', 'subaccounts'];
    foreach ($f4b_pages as $page) {
        add_submenu_page(
            'f4b',
            ucfirst($page),
            ucfirst($page),
            'manage_options',
            'f4b-' . $page,
            'f4b_' . $page . '_page'
        );
    }
}

require_once(WC_F4B_DIR_PATH . 'includes/admin-view.php');

require_once(WC_F4B_DIR_PATH . 'bootstrap.php');

function add_flutterwave_elementor_widget_categories( $elements_manager ) {

	$elements_manager->add_category(
		'flutterwave-blocks',
		[
			'title' => esc_html__( 'Flutterwave Blocks', 'flutterwave-for-business' ),
			'icon' => 'fa fa-plug',
		]
	);
}

/**
 * custom option
 */
function f4bflutterwave_settings_init()
{
    $data = array(
        'public_key' => "",
        'secret_key' =>  "",
        'go_live' => "false",
        'modal_title' => "",
        'payment_method' => "",
        'modal_logo' => "",
        'modal_description' => "",
        'modal_button_text' => "Make Payment",
        'modal_button_color' =>  "",
        'failed_redirect_url' => "",
        'success_redirect_url' => "",
        'currency' => "NGN",
        'charge_country'  => "NG",
        'use_form_style' => "false",
    );

    // $value = serialize($data);
    add_option('f4bflutterwave_options', $data);

	if (is_plugin_active( 'elementor/elementor.php' )) {
		add_action( 'elementor/elements/categories_registered', 'add_flutterwave_elementor_widget_categories' );
		//check if flutterwave for elementor is installed

	}
}



/**
 * Register our f4bflutterwave_settings_init to the admin_init action hook.
 */
add_action('admin_init', 'f4bflutterwave_settings_init');