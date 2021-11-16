<?php
/**
 * Plugin Name:     Flutterwave For Business
 * Plugin URI:      https://flutterwave.com/ng/
 * Description:     Official WordPress Plugin for Flutterwave for Business
 * Author:          Flutterwave Developers
 * Author URI:      https://developer.flutterwave.com/docs
 * Text Domain:     flutterwave-for-business
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Flutterwave_For_Business
 */

define( 'WC_F4B_VERSION', '1.1.0' );
define( 'WC_F4B_PLUGIN_FILE', __FILE__ );
define( 'WC_F4B_DIR_PATH', plugin_dir_path( WC_F4B_PLUGIN_FILE ) );
define( 'WC_F4B_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );

function f4b_add_action_plugin( $links ) 
{
	$flonboarding = esc_url( get_admin_url( null, 'admin.php?page=wc-settings&tab=checkout' ) );
	$mylinks_flw = array('<a href="'.$flonboarding.'">' . __('Settings', 'General') . '</a>',
      '<a href="https://developer.flutterwave.com/discuss" target="_blank">Support</a>');
    return array_merge( $links, $mylinks_flw );
}
add_filter( 'plugin_action_links_'.plugin_basename(__FILE__),'f4b_add_action_plugin');



//blocks
function f4b_enqueue_block_assets()
{
    if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}
    $asset_config_file = sprintf('%s/build/index.asset.php', WC_F4B_DIR_PATH);
    $asset_config = require_once $asset_config_file;
    wp_enqueue_script( 
        'f4b-payment-form',
        WC_F4B_URL."/build/index.js",
        $asset_config['dependencies'],
        true
    );

    wp_localize_script( 'f4b-payment-form', 'f4b_data', [
        'apiUrl' => home_url( '/wp-json' ),
        'nonce' => wp_create_nonce( 'wp_rest' )
    ]);

    wp_enqueue_style( 
        'f4b-payment-form-css', 
        WC_F4B_URL."assets/css/index.css",
         array(),
         $asset_config['dependencies'],
        'all');
}
add_action( "enqueue_block_assets", "f4b_enqueue_block_assets");



function load_f4b_scripts()
{
    wp_enqueue_script( "f4bpayments", plugins_url('public/js/f4b-flutterwave-public.js', __FILE__), array('jquery'), true );
    wp_localize_script( 'f4bpayments', 'f4b_data', [
        'apiUrl' => home_url( '/wp-json' ),
        'nonce' => wp_create_nonce( 'wp_rest' )
    ]);
}

add_action( "wp_enqueue_scripts", "load_f4b_scripts" );
include_once WC_F4B_DIR_PATH.'admin/API/class-payment-endpoint.php';

new WP_F4b_Rest_Route();