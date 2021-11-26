<?php

class F4b_base_class{
    public function __construct(){
        add_action('init', array($this, 'init'));
    }

    public function init(){
        add_action('admin_menu', array($this, 'admin_menu'));
        add_action( 'wp_ajax_process_payment', array( $this, 'process_payment' ) );
        add_action( 'wp_ajax_nopriv_process_payment', array( $this, 'process_payment' ) );

    }


    /**
    * Processes payment record information
    *
    * @return void
    */
    public function process_payment()
    {
        global $wpdb; // this is how you get access to the database

        $table_name = $wpdb->prefix . 'f4b_transactions';
        $data = $_POST;
        $data['payment_method'] = 'paypal';
        $data['payment_status'] = 'pending';
        $data['payment_date'] = date('Y-m-d H:i:s');
        $data['payment_amount'] = $data['amount'];
        $data['payment_currency'] = 'USD';
        $data['payment_details'] = json_encode($data);
    }
}