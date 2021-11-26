<?php


    class Flutterwave_For_Business_Activator 
    {

        static function activate() 
        {
            $isOnboarding = Flutterwave_For_Business_Activator::option_exist( 'f4b_onboarding_mode' );

            if (!$isOnboarding) {
                add_option( 'f4b_onboarding_mode', true );
                
            }else{
                update_option( 'f4b_onboarding_mode', false );
            }
        }

        static function option_exist( $option_name, $site_wide=false ) {
            global $wpdb; 
            return $wpdb->query("SELECT * FROM ". ($site_wide ? $wpdb->base_prefix : $wpdb->prefix). "options WHERE option_name ='$option_name' LIMIT 1");
        }
        
    }
    