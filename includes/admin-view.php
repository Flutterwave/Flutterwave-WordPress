<?php

function f4b_overview_page()
{
    if(get_option( 'f4b_onboarding_mode' )){
        include_once(WC_F4B_DIR_PATH . '/admin/views/admin-overview-page.php');
    }else{
        wp_safe_redirect( admin_url( 'admin.php?page=f4b-settings', 'http' ));
    }
}

function  f4b_settings_page()
{
    include_once(WC_F4B_DIR_PATH . '/admin/views/admin-settings-page.php');
}

function f4b_transactions_page()
{
    include_once(WC_F4B_DIR_PATH . '/admin/views/admin-transactions-page.php');
}

function f4b_subscriptions_page()
{
    include_once(WC_F4B_DIR_PATH . '/admin/views/admin-subscriptions-page.php');
}

function f4b_plans_page()
{
    include_once(WC_F4B_DIR_PATH . '/admin/views/admin-plan-page.php');
}

function f4b_subaccounts_page()
{
    include_once(WC_F4B_DIR_PATH . '/admin/views/admin-subaccount-page.php');
}