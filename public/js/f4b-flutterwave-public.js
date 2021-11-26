document.addEventListener("DOMContentLoaded", function () {
	jQuery(document).ready(function ($) {
		// hide all buttons
		$(".f4b-button").on("click", function () {
			$(".f4b-flutterwave-public-form").submit();
		});

		$(".f4b-flutterwave-public-form").submit(function (event) {
			event.preventDefault();
			var form = $(this);
			var data = form.serializeArray();
			var url = form.attr("action");
			console.log(data);

			let payload = {
				public_key: f4b_data.public_key,
				tx_ref: `WP_FLW|${Date.now()}|${Math.floor(
					Math.random() * 100000000
				)}`,
				amount: data[2].value,
				currency: data[4].value,
				payment_options: "card,ussd,qr",
				meta: {
					consumer_id: 23,
					consumer_mac: "92a3-912ba-1192a",
				},
				customer: {
					email: data[1].value,
					phone_number: data[3].value,
					name: data[0].value,
				},
				callback: function (data) {
					console.log(data);
					if (data.status === "successful") {
						window.location.href = f4b_data.success_redirect_url;
					}

					if (data.status === "failed") {
						window.location.href = f4b_data.failed_redirect_url;
					}
				},
				onclose: function () {
					// close modal
				},
				customizations: {},
			};

			switch (data[5].value) {
				case "weekly":
					payload.payment_plan = "weekly";
					break;
				case "monthly":
					payload.payment_plan = "monthly";
					break;
				case "quarterly":
					payload.payment_plan = "quarterly";

					break;
				case "daily":
					payload.payment_plan = "daily";

					break;
				case "yearly":
					payload.payment_plan = "yearly";

					break;

				default:
					break;
			}

			FlutterwaveCheckout(payload);
		});

		$("#f4b-paynow-button").on("click", (e) => {
			e.preventDefault();

			$("#f4b_public_key").val(f4b_data.public_key);
			$("#f4b_txref").val(
				`WP_FLW|BTN|${Date.now()}|${Math.floor(
					Math.random() * 100000000
				)}`
			);

			$("#f4b-form-btn").submit();
		});
	});
});
