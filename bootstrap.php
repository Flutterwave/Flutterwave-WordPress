<?php
//flutterwave blocks
function f4b_enqueue_block_assets()
{
    if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

    $asset_config_file = sprintf('%s/build/blocks.asset.php', WC_F4B_DIR_PATH);
    $asset_config = require_once $asset_config_file;
    wp_enqueue_script( 
        'f4b-payment-form',
        WC_F4B_URL."/build/blocks.js",
        $asset_config['dependencies'],
        true
    );

    wp_enqueue_style( 
        'f4b-payment-form-css', 
        WC_F4B_URL."assets/css/index.css",
         array(),
         $asset_config['dependencies'],
        'all');

    wp_localize_script( 'f4b-payment-form', 'f4b_data', [
        'apiUrl' => home_url( '/wp-json' ),
        'nonce' => wp_create_nonce( 'wp_rest' )
    ]);
}

add_action( "enqueue_block_assets", "f4b_enqueue_block_assets");

// function create_f4b_button_block_block_init() {
//     register_block_type( __DIR__, array(
//         'render_callback' => 'render_f4b_button_block_with_attribures'
//     ) );
// }

// function enqueue_frontend_script() {
//     $script_path       = 'build/frontend.js';
//     $script_asset_path = 'build/frontend.asset.php';
//     $script_asset      = require( $script_asset_path );
//     $script_url = plugins_url( $script_path, __FILE__ );
//     wp_enqueue_script( 'script', $script_url, $script_asset['dependencies'], $script_asset['version'] );
// }

// function add_attributes_to_block( $attributes = [], $content = '' ) {
//     $escaped_data_attributes = [];
 
//     foreach ( $attributes as $key => $value ) {
//         if ( is_bool( $value ) ) {
//             $value = $value ? 'true' : 'false';
//         }
//         if ( ! is_scalar( $value ) ) {
//             $value = wp_json_encode( $value );
//         }
//         $escaped_data_attributes[] = 'data-' . esc_attr( strtolower( preg_replace( '/(?<!\ )[A-Z]/', '-$0', $key ) ) ) . '="' . esc_attr( $value ) . '"';
//     }
 
//     return preg_replace( '/^<div /', '<div ' . implode( ' ', $escaped_data_attributes ) . ' ', trim( $content ) );
// }

// function render_block_with_attribures( $attributes = [], $content = '' ) {
//     if ( ! is_admin() ) {
//         enqueue_frontend_script();
//     }
//     $attributes =[
//         'fontsize' => $attributes['fontsize'],
//     ];
//     return add_attributes_to_block($attributes, $content);
// };

// add_action( 'init', 'create_f4b_button_block_block_init' );

function load_f4b_scripts()
{
    $asset_config_file = sprintf('%s/build/frontend.asset.php', WC_F4B_DIR_PATH);
    $asset_config = require_once $asset_config_file;
    wp_enqueue_script( 
        'f4b-payment-f4bbutton',
        WC_F4B_URL."/build/frontend.js",
        $asset_config['dependencies'],
        false
    );
    $setting = get_option( 'f4bflutterwave_options', ['public_key' => 'FLWSECK_TEST-SANDBOXDEMOKEY-X', 'success_redirect_url' => '', 'failed_redirect_url' => ''] );
    wp_enqueue_script( "f4bpayments", plugins_url('public/js/f4b-flutterwave-public.js', __FILE__), array('jquery'), true );
    wp_localize_script( 'f4bpayments', 'f4b_data', [
        'apiUrl' => home_url( '/wp-json' ),
        'public_key' => $setting['public_key'],
        'success_redirect_url' => $setting['success_redirect_url'],
        'failed_redirect_url' => $setting['failed_redirect_url'],
    ]);
}

add_action( "wp_enqueue_scripts", "load_f4b_scripts" );
include_once WC_F4B_DIR_PATH.'admin/API/class-payment-endpoint.php';
include_once WC_F4B_DIR_PATH.'admin/API/class-payment-settings.php';
include_once WC_F4B_DIR_PATH.'admin/API/class-payment-plan.php';
include_once WC_F4B_DIR_PATH.'admin/API/class-payment-subaccount.php';
include_once WC_F4B_DIR_PATH.'admin/API/class-payment-transaction.php';
new WP_F4b_Rest_Route();
new WP_F4b_Settings_Rest_Route();
new WP_F4b_Plan_Rest_Route();
new WP_F4b_Subaccounts_Rest_Route();
new WP_F4b_Transactions_Rest_Route();