import currencyList from "./currencyList";
import countriesList from "./countryList";

// STORE AND NAMESPACE FOR API
const NAMESPACE = "flutterwave-for-business/v1";
const STORE = "/payments/settings";
const BASE_URL = "https://api.flutterwave.com/v3/";

// Endpoints
const TRANSACTIONS = "payments/transactions";
// http://localhost/wordpress/wp-json/flutterwave-for-woocommerce/v1/payments/transactions
const PLAN = "payments/plan";
// http://localhost/wordpress/wp-json/flutterwave-for-woocommerce/v1/payments/plan
const SUBACCOUNTS = "payments/subaccounts";
const BANKS = "payments/banks";
export {
	currencyList,
	countriesList,
	NAMESPACE,
	STORE,
	TRANSACTIONS,
	PLAN,
	SUBACCOUNTS,
	BANKS,
	BASE_URL,
};
