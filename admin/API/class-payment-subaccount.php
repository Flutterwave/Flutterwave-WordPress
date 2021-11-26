<?php


class WP_F4b_Subaccounts_Rest_Route extends WP_REST_Controller{
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
	protected $rest_base = 'payments/subaccounts';

    public function __construct() {
		$this->f4b_options = get_option( 'f4bflutterwave_options' );
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {

        register_rest_route( $this->namespace, "/". $this->rest_base, [

            'methods' => WP_REST_Server::READABLE,
            'callback' => [ $this, 'get_subaccounts' ],
            'permission_callback' => [ $this, 'get_subaccounts_permission' ]
            
        ] );
        
        register_rest_route( $this->namespace, "/payments/banks", [

            'methods' => WP_REST_Server::EDITABLE,
            'callback' => [ $this, 'get_banks' ],
            'permission_callback' => [ $this, 'get_banks_permission' ]
            
        ] );

        register_rest_route( $this->namespace, "/". $this->rest_base, [

            'methods' => WP_REST_Server::EDITABLE,
            'callback' => [ $this, 'post_subaccounts' ],
            'permission_callback' => [ $this, 'post_subaccounts_permission' ]
            
        ] );
    }


    /**
	 * Retrieve Subaccounts.
	 *
	 * @return WP_REST_Response
	 */
    public function get_banks(WP_REST_Request $request): WP_REST_Response {

        $token = $this->f4b_options['secret_key'];

        $country = $request['country'];

        $url = $this->flw_base_url . "/banks/$country";

        $response = wp_remote_get($url, array(
            'headers' => array(
                'Content-Type' => 'application/json',
                'Authorization' => $token
              )
         ) );

        return new WP_REST_Response( json_decode($response['body']) );
    }

    /**
	 * Retrieve Subaccounts.
	 *
	 * @return WP_REST_Response
	 */
    public function get_subaccounts(WP_REST_Request $request): WP_REST_Response {

        $token = $this->f4b_options['secret_key'];

        $response = wp_remote_get($this->flw_base_url."subaccounts", array(
            'headers' => array(
                'Content-Type' => 'application/json',
                'Authorization' => "Bearer ". $token
              )
        ) );

        return new WP_REST_Response( json_decode($response['body']) );
    }

    /**
	 * Create subaccounts.
	 *
	 * @return WP_REST_Response
	 */
    public function post_subaccounts(WP_REST_Request $request): WP_REST_Response {

        $token = $this->f4b_options['secret_key'];

        $payload = array(
            'account_bank' => $request['account_bank'],
            'business_name' => $request['business_name'],
            'account_number' => $request['account_number'],
            'business_email' => $request['business_email'],
            'business_mobile' => $request['business_mobile'],
            'country' => $request['country'],
            'split_type' => $request['split_type'],
            'split_value' => $request['split_value'],
        );

        $response = wp_remote_post($this->flw_base_url."subaccounts", array(
            'headers' => array(
                'Content-Type' => 'application/json',
                'Authorization' => "Bearer ".$token
            ),
            'body' => json_encode($payload)
        ) );

        return new WP_REST_Response( json_decode($response['body']) );
    }

    public function get_subaccounts_permission()
    {
        return current_user_can( 'manage_options' );
    }

    public function post_subaccounts_permission()
    {
        return current_user_can( 'manage_options' );
    }

    public function get_banks_permission()
    {
        return true;
    }
}
