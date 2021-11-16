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

			data.push({
				name: "redirect_url",
				value:
					f4b_data.apiUrl +
					"/flutterwave-for-business/v1/public/redirect",
			});

			$.ajax({
				url: url,
				type: "POST",
				data: data,
				success: function (response) {
					console.log(response);

					window.location.href = response.data.link;
				},
			});
		});
	});
});
