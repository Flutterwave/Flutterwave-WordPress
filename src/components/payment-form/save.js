/* 
Wordpress dependencies
*/
import { __ } from "@wordpress/i18n";
import {
	RichText,
	RichTextToolbarButton,
	useBlockProps,
	InnerBlocks,
} from "@wordpress/block-editor";
//How to use TextControl
import { Button, BaseControl } from "@wordpress/components";
/*
Internal dependencies
*/
import { blockStyle } from "./index";

const Save = ({ attributes, className }) => {
	const { title, alignment } = attributes;

	const handleSubmit = (e) => console.log("hey the form submitted");
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps} style={{ ...blockStyle }}>
			{/* <BaseControl id="textarea-1" label="Text" help="Enter some text">
				<textarea id="textarea-1" />
			</BaseControl> */}
			<div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-end",
					}}
				>
					<div>
						<button
							style={{
								background: "#828282",
								marginRight: "1em",
								color: "#fff",
							}}
							className="f4b-button"
						>
							Cancel
						</button>

						<button
							style={{ background: "#f5a623" }}
							className="f4b-button"
						>
							Make Payment
						</button>
					</div>
				</div>
				<hr />
				<h6 style={{ textAlign: attributes.alignment }}>
					{title || "Flutterwave Payment Form"}
				</h6>

				<InnerBlocks.Content />
			</div>
			{/* <Header /> */}

			{/* {
    "name":"Abraham Olaobaju Jesulayomi",
    "class": "f4b-payment-form",
    "Payment": "LIVE",
    "amount": 10,
    "email": "olaobajua@gmail.com",
    "fullname": "Olaobaju Abraham Jesulayomi",
    "title": "The form of life",
    "currency": "NGN",
    "description": "This form is for the kids in the streets",
    "redirect_url": "https://webhook.site/b0425eb6-f76a-4daf-ab1d-4cf4fd4f2eda"
} */}
			<form
				onSubmit={handleSubmit}
				className="f4b-flutterwave-public-form"
				action={
					f4b_data.apiUrl +
					"/flutterwave-for-business/v1/payments/link"
				}
			>
				<label for="fullName">Full Name</label>
				<input
					label="Full Name "
					type="text"
					name="fullName"
					placeholder="Felix Obinna"
					className="f4b-input"
					style={{ marginBottom: "1em" }}
				/>
				<label for="email">Email</label>
				<input
					label="Email"
					type="email"
					name="email"
					placeholder="email@example.com"
					className="f4b-input"
					style={{ marginBottom: "1em" }}
				/>
				<label for="amount">Amount</label>
				<input
					label="Amount"
					type="number"
					name="amount"
					placeholder="5,000"
					className="f4b-input"
					style={{ marginBottom: "1em" }}
				/>
				<label for="phoneNumber">Phone Number</label>
				<input
					label="Phone Number"
					type="tel"
					name="phoneNumber"
					placeholder="08080909878"
					className="f4b-input"
					style={{ marginBottom: "1em" }}
				/>
				<label for="currency">Currency</label>
				<select
					className="f4b-input f4b-select-input"
					name="currency"
					style={{ marginBottom: "1em" }}
				>
					<option value="NGN">NGN</option>
					<option value="GHS">GHS</option>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
					<option value="GBP">GBP</option>
					<option value="KES">KES</option>
					<option value="UGX">UGX</option>
					<option value="ZAR">ZAR</option>
					<option value="XOR">XOF</option>
					<option value="XAF">XAF</option>
					<option value="ZMW">ZMW</option>
					<option value="RWF">RWF</option>
					<option value="TZS">TZS</option>
					{/* NGN,UGX,RWF,TZS,GBP,USD,KES,GHS,ZAR,EUR,ZMW, XOF, XAF */}
				</select>
				<label for="recurringPayment">Recurring Payment</label>
				<select
					className="f4b-input f4b-select-input"
					name="recurringPayment"
					style={{ marginBottom: "1em" }}
				>
					<option value="">None</option>
					<option value="weekly">Weekly</option>
					<option value="monthly">Monthly</option>
					<option value="bi-quarterly">Bi-quarterly</option>
					<option value="annually">annually</option>
					{/* none, weekly, monthly, bi-quarterly, anually */}
				</select>
			</form>
			{/* form end */}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
				}}
			>
				{/* <RichText
				tagName="h6"
				value={"Flutterwave Form"}
				placeholder={"Form Title"}
				onChange={(content) => setAttributes({ content })}
			/> */}
				<div style={{ marginTop: "1em" }}>
					<button
						style={{ background: "#f5a623", marginRight: "1em" }}
						className="f4b-button"
					>
						Make Payment
					</button>
					<button
						style={{
							background: "#828282",
							color: "#fff",
						}}
						className="f4b-button"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default Save;
