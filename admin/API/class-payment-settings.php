<?php


    class WP_F4b_Settings_Rest_Route extends WP_REST_Controller 
    {
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
	    protected $rest_base = 'payments/settings';

        public function __construct() 
        {
            add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
        }

        public function create_rest_routes() 
        {
    
            register_rest_route( $this->namespace, "/". $this->rest_base, [
    
                'methods' => WP_REST_Server::READABLE,
                'callback' => [ $this, 'getSettings' ],
                'permission_callback' => [ $this, 'get_permission' ]
    
            ] );

            register_rest_route( $this->namespace, "/". $this->rest_base, [
    
                'methods' => WP_REST_Server::EDITABLE,
                'callback' => [ $this, 'post_settings' ],
                'permission_callback' => [ $this, 'get_permission' ]
    
            ] );
        }

        public function get_permission() 
        {
            return current_user_can( 'manage_options' );
            // return true;
        }

        public function getSettings( $request ): WP_REST_Response
        {
            $settings = get_option( 'f4bflutterwave_options' );

            return new WP_REST_Response( $settings, 200 );
        }

        public function post_settings(WP_REST_Request $request ): WP_REST_Response
        {
            $settings = $request->get_params();
            update_option( 'f4bflutterwave_options', $settings );
            return new WP_REST_Response( ["message" => 'Updated Successfully', 'data' => $settings], 200 );
        }
        
    }
    