<?php
/**
 * This file will create Custom Rest API End Points.
 */
class WP_F4b_Transactions_Rest_Route extends WP_REST_Controller{

    /**
	 * payment base_url.
	 *
	 * @var string
	 */
    protected $flw_base_url = 'https://api.flutterwave.com/v3/';

    /**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'flutterwave-for-business/v1';

    /**
	 * Endpoint path.
	 *
	 * @var string
	 */
	protected $rest_base = 'payments/transactions';

    public function __construct() {
        $this->f4b_options = get_option( 'f4bflutterwave_options' );
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {

        register_rest_route( $this->namespace, "/". $this->rest_base, [

            'methods' => WP_REST_Server::READABLE,
            'callback' => [ $this, 'get_transactions' ],
            'permission_callback' => [ $this, 'get_transactions_permission' ]
            
        ] );

    }

	/**
	 * Retrieve settings.
	 *
	 * @return WP_REST_Response
	 */
    public function get_transactions(WP_REST_Request $request): WP_REST_Response {

        $page = $request->get_param('page');

        $token = $this->f4b_options['secret_key'];

        $response = wp_remote_get($this->flw_base_url."transactions/?page=$page", array(
            'headers' => array(
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer '.$token
              )
        ) );

        return new WP_REST_Response( json_decode($response['body']) );

    }

    public function get_transactions_permission() {
        return current_user_can( 'manage_options' );
    }
}
