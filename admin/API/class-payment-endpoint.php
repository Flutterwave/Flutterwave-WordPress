<?php
/**
 * This file will create Custom Rest API End Points.
 */
class WP_F4b_Rest_Route extends WP_REST_Controller{

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
	protected $rest_base = 'payments/link';

    public function __construct() 
	{
		$this->f4b_options = get_option( 'f4bflutterwave_options' );
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() 
	{
        register_rest_route( $this->namespace, "/". $this->rest_base, [

            'methods' => WP_REST_Server::EDITABLE,
            'callback' => [ $this, 'getPaymentLink' ],
            'permission_callback' => [ $this, 'renderLink_permission' ]

        ] );

		register_rest_route( $this->namespace, "/public/redirect", [

            'methods' => WP_REST_Server::READABLE,
            'callback' => [ $this, 'webhook_handle' ],
            'permission_callback' => [ $this, 'renderLink_permission' ]

        ] );
    }

	public function getPaymentLink(WP_REST_Request $request): WP_REST_Response 
	{
		$token = $this->f4b_options['secret_key'];
		$body = array(
			"tx_ref" => "WP_FLW|". Date('YmdHis'). "|". rand(100, 999),
			"amount" => $request->get_param('amount'),
			"currency" => $request->get_param('currency'),
			"redirect_url" => $request->get_param('redirect_url'),//make custom endpoint for redirect url
			// "payment_options" => $request->get_param('payment_options'),
			"payment_options" => "card,ussd,qr",
			// "meta" => array(
			// 	"consumer_id" => $request->get_param('consumer_id'),
			// 	"consumer_mac" => $request->get_param('consumer_mac')
			// ),
			"customer" => array(
				"email" => $request->get_param('email'),
				"phonenumber" => $request->get_param('phoneNumber'),
				"name" => $request->get_param('fullName')
			),
			"customizations" => array(
				"title" => $request->get_param('title'),//title of the payment modal
				"description" => $request->get_param('description'),
				"logo" => $request->get_param('logo')// if this is empty, the default logo will be used
			),
		);

		$response = wp_remote_post("https://api.flutterwave.com/v3/payments", array(
            'headers' => array(
                'Content-Type' => 'application/json',
                'Authorization' => "Bearer ".$token
            ),
            'body' => json_encode($body)
        ) );

		//return new WP_REST_Response( $body , 200 );
		return new WP_REST_Response( json_decode($response['body']), 200 );
	}

	public function create_dynamic_plan()
	{
		//create a plan for each transaction and return the plan id
	}

	public function renderLink_permission( $request )
	{
		return true;
	}

	public function webhook_handle(WP_REST_Request $request)
	{
		//render spinner and redirect to status page
		echo "verifying Transaction ...";


		if($request->get_param('transaction_id') == null || empty($request->get_param('transaction_id')))
		{
			//return new WP_REST_Response( 'Transaction ID is required', 400 );
		}

		$result = $this->verify_transaction($request->get_param('transaction_id'));

		if($result->status == 'success')
		{
			//get success url from the database
			$success_url = get_option('f4b_success_url');
			
			return new WP_REST_Response( $request->get_param('tx_ref'), 200 );
		}
		else
		{
			return new WP_REST_Response( 'Transaction Failed', 400 );
		}

		// return new WP_REST_Response( $result, 200 );
	}

	public function verify_transaction($id)
	{
		$token = $this->f4b_options['secret_key'];

		$response = wp_remote_get("https://api.flutterwave.com/v3/transactions/$id/verify", array(
			'headers' => array(
				'Content-Type' => 'application/json',
				'Authorization' => "Bearer ".$token
			)
		) );

		return json_decode($response['body']);
	}

}

// new WP_Flutterwave_Settings_Rest_Route(new WC_Flutterwave_Gateway);