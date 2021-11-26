import { useState } from "@wordpress/element";

const Save = ({ attributes }) => {
	const { justify, fontsize, title, backgroundcolor, textcolor } = attributes;
	return (
		<>
			<div id="sample-btn-test"></div>
			<div style={{ textAlign: justify }}>
				<form
					id="f4b-form-btn"
					method="POST"
					action="https://checkout.flutterwave.com/v3/hosted/pay"
				>
					<input
						id="f4b_public_key"
						type="hidden"
						name="public_key"
						value="FLWPUBK_TEST-SANDBOXDEMOKEY-X"
					/>
					<input
						id="f4b_customer_email"
						type="hidden"
						name="customer[email]"
						value="johndoe@gmail.com"
					/>
					<input
						id="f4b_phone"
						type="hidden"
						name="customer[phone_number]"
						value="+23408067985861"
					/>
					<input
						id="f4b_customer"
						type="hidden"
						name="customer[name]"
						value="John Doe"
					/>
					<input
						id="f4b_txref"
						type="hidden"
						name="tx_ref"
						value="flw-boom-123456"
					/>
					<input
						id="f4b_amount"
						type="hidden"
						name="amount"
						value="100"
					/>
					<input
						id="f4b_currency"
						type="hidden"
						name="currency"
						value="NGN"
					/>
					<input
						id="f4b_meta"
						type="hidden"
						name="meta[token]"
						value="54"
					/>
					<input
						id="f4b_redirect"
						type="hidden"
						name="redirect_url"
						value="hello"
					/>

					<button
						id="f4b-paynow-button"
						style={{
							fontSize: fontsize,
							lineHeight: "1.25",
							padding: "1.1em 1.44em",
							textTransform: "uppercase",
							backgroundColor: backgroundcolor,
							color: textcolor,
							border: "none",
							borderRadius: "0.3em",
						}}
					>
						<h6 style={{ margin: "0" }}>{title}</h6>
					</button>
				</form>
			</div>
		</>
	);
};

export default Save;
