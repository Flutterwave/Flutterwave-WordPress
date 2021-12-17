/**
 * WordPress dependencies
 */
import { Spinner } from "@wordpress/components";
import { render, Suspense } from "@wordpress/element";
/**
 * Internal dependencies
 */
import { Overview, Plans, Transactions, Subaccounts, Settings } from "../pages";

window.addEventListener("DOMContentLoaded", () => {
	const wpwrap = document.querySelector("#wpwrap");
	const wpcontent = document.querySelector("#wpcontent");
	const wpbody = document.querySelector("#wpbody-content");
	const element = document.querySelector(".f4b-content");

	const notice = document.querySelector(".notice");

	if (notice) {
		notice.style.display = "none";
	}

	if (wpbody && element && wpcontent) {
		wpbody.style.backgroundColor = "white";
		wpcontent.style.backgroundColor = "white";
		wpwrap.style.backgroundColor = "white";
	}

	if (element && f4b_data.page == "toplevel_page_f4b") {
		render(
			<Suspense fallback={<Spinner />}>
				<Overview />
			</Suspense>,
			element
		);
	}

	if (element && f4b_data.page == "flutterwave_page_f4b-settings") {
		render(
			<Suspense fallback={<Spinner />}>
				<Settings />
			</Suspense>,
			element
		);
	}

	if (element && f4b_data.page == "flutterwave_page_f4b-plans") {
		render(
			<Suspense fallback={<Spinner />}>
				<Plans />
			</Suspense>,
			element
		);
	}

	if (element && f4b_data.page == "flutterwave_page_f4b-transactions") {
		render(
			<Suspense fallback={<Spinner />}>
				<Transactions />
			</Suspense>,
			element
		);
	}

	if (element && f4b_data.page == "flutterwave_page_f4b-subaccounts") {
		render(
			<Suspense fallback={<div>Loading page ...</div>}>
				<Subaccounts />
			</Suspense>,
			element
		);
	}
});
