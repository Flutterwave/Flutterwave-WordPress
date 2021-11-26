/**
 * WordPress dependencies
 */
import {
	useCallback,
	useState,
	useEffect,
	useReducer,
} from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { addFilter } from "@wordpress/hooks";

/**
 * Internal dependencies
 */
import FlutterwaveBody from "../../shared/layout/body";
import Input from "./Form/Input";
import Checkbox from "./Form/Checkbox";
import Button from "./CallToAction";
import Select from "./Form/Select";
import { NAMESPACE, STORE } from "../../constants";
import { countriesList, currencyList } from "../../constants";
import Notice from "../../components/Notification";

const ACTIONS = {
	UPDATE: "UpdateForm",
	SUBMIT: "SubmitForm",
	RESET: "ResetForm",
	SET_GO_LIVE: "SetGoLive",
};

export default function Settings() {
	const [publicKey, setPublicKey] = useState("");
	const [secretKey, setSecretKey] = useState("");
	const [goLive, setGoLive] = useState(false);
	const [modalTitle, setModalTitle] = useState("Flutterwave Form");
	const [modalLogo, setModalLogo] = useState("");
	const [paymentMethod, setPaymentMethod] = useState(
		"card,ussd,qr,barter,PayPal,mpesa"
	);
	const [modalDescription, setModalDescription] = useState(
		"This is a payment form "
	);
	const [modalButtonText, setModalButtonText] = useState("Make Payment");
	const [modalButtonColor, setModalButtonColor] = useState("#F5A623");
	const [successRedirectUrl, setSuccessRedirectUrl] = useState("");
	const [failedRedirectUrl, setFailedRedirectUrl] = useState("");
	const [currency, setCurrency] = useState("");
	const [chargeCountry, setChargeCountry] = useState("NG");
	const [useFormStyle, setUseFormStyle] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			public_key: publicKey,
			secret_key: secretKey,
			go_live: goLive,
			modal_title: modalTitle,
			payment_method: paymentMethod,
			modal_logo: modalLogo,
			modal_description: modalDescription,
			modal_button_text: modalButtonText,
			modal_button_color: modalButtonColor,
			success_redirect_url: successRedirectUrl,
			failed_redirect_url: failedRedirectUrl,
			currency: currency,
			charge_country: chargeCountry,
			use_form_style: useFormStyle,
		};

		// console.log("onsubmit: ", data);
		apiFetch({
			path: NAMESPACE + STORE,
			method: "POST",
			data,
		}).then((res) => {
			console.log(res);
			setIsSubmitted(true);
		});
	};

	const handleCheckboxChange = (e) => {
		const name = e.target.name;
		const value = e.target.checked;
		setGoLive(value);
	};

	const handleSelectChange = (e) => {
		setCurrency(e.target.value);
	};

	const handleReset = (e) => {
		e.preventDefault();
		console.log("reset");
	};

	useEffect(() => {
		//console.log("onrerender: ", setting);
		//make a call to the api to get the settings
		// GET
		apiFetch({ path: NAMESPACE + STORE }).then((configuration) => {
			const {
				public_key,
				secret_key,
				go_live,
				modal_title,
				payment_method,
				modal_logo,
				modal_description,
				modal_button_text,
				modal_button_color,
				success_redirect_url,
				failed_redirect_url,
				currency,
				charge_country,
				use_form_style,
			} = configuration;
			// console.log(configuration);
			setPublicKey(public_key);
			setSecretKey(secret_key);
			setGoLive(go_live);
			setModalTitle(modal_title);
			setPaymentMethod(payment_method);
			setModalLogo(modal_logo);
			setModalDescription(modal_description);
			setModalButtonText(modal_button_text);
			setModalButtonColor(modal_button_color);
			setSuccessRedirectUrl(success_redirect_url);
			setFailedRedirectUrl(failed_redirect_url);
			setCurrency(currency);
			setChargeCountry(charge_country);
			setUseFormStyle(use_form_style);
		});
	}, [isSubmitted]);

	return (
		<FlutterwaveBody title="Settings">
			<div className="flw-settings-content">
				<form className="f4b-settings-form">
					{/* Beginning of Column One */}
					<div className="flw_one_container">
						<div className="flw-row">
							<Input
								name={"Public Key"}
								value={publicKey}
								type={"text"}
								inputWidth={"100%"}
								onChange={(e) => {
									setPublicKey(e.target.value);
								}}
							/>
						</div>

						<div className="flw-row">
							<Checkbox
								checked={goLive}
								value={goLive}
								name={"Go Live"}
								sname={"goLive"}
								details={"Switch to live account"}
								onChange={(e) => handleCheckboxChange(e)}
							/>
						</div>

						<div className="flw-row">
							<Input
								name={"Modal Title"}
								value={modalTitle}
								type={"text"}
								inputWidth={"100%"}
								onChange={(e) => {
									setModalTitle(e.target.value);
								}}
								bottomNote={"Default: Flw Pay"}
							/>
						</div>

						<div className="flw-row">
							<Input
								name={"Modal Logo"}
								value={modalLogo}
								type={"text"}
								inputWidth={"100%"}
								onChange={(e) => {
									setModalLogo(e.target.value);
								}}
								bottomNote={
									"Full URL (with “http”) to the custom logo"
								}
							/>
						</div>

						<div className="flw-row">
							<Input
								name={"Failed redirect URL (Optional)"}
								value={failedRedirectUrl}
								type={"text"}
								inputWidth={"100%"}
								onChange={(e) => {
									setFailedRedirectUrl(e.target.value);
								}}
								bottomNote={
									"Full URL (with “http”) to redirect to for failed transactions"
								}
							/>
						</div>

						<div className="flw-row">
							<Select
								value={currency}
								name={"Charge Currency (optional) "}
								options={currencyList}
								bottomNote={"Default: NGN"}
								onChange={(e) => {
									handleSelectChange(e);
								}}
							/>
						</div>

						<div className="flw-row">
							<Checkbox
								checked={true}
								value={1}
								onChange={() => console.log("formStyle")}
								name={"Form style"}
								sname={"formStyle"}
								details={"Use default theme style"}
							/>
						</div>
					</div>
					{/* end of Column One  */}
					<div className="flw_one_container">
						<div className="flw-row">
							<Input
								name={"Pay button secret key"}
								value={secretKey}
								type={"text"}
								inputWidth={"100%"}
								onChange={(e) => {
									setSecretKey(e.target.value);
								}}
							/>
						</div>

						<div className="flw-row">
							<Input
								name={"Payment method (Optional)"}
								value={paymentMethod}
								type={"text"}
								inputWidth={"100%"}
								onChange={(e) => {
									setPaymentMethod(e.target.value);
								}}
								bottomNote={"Default: Card and Account"}
							/>
						</div>

						<div className="flw-row">
							<Input
								name={"Modal Description (Optional)"}
								value={modalDescription}
								type={"text"}
								inputWidth={"100%"}
								onChange={(e) => {
									setModalDescription(e.target.value);
								}}
								bottomNote={"Default: Pay for the Product"}
							/>
						</div>

						<div className="flw-row">
							<Input
								name={"Success redirect URL (Optional)"}
								value={successRedirectUrl}
								type={"text"}
								inputWidth={"100%"}
								onChange={(e) => {
									setSuccessRedirectUrl(e.target.value);
								}}
								bottomNote={
									"Full URL (with “http”) to redirect to for success transactions"
								}
							/>
						</div>

						<div className="flw-row">
							<Input
								name={"Pay button text"}
								value={modalButtonText}
								type={"text"}
								inputWidth={"100%"}
								onChange={(e) => {
									setModalButtonText(e.target.value);
								}}
								bottomNote={"Default: Pay Now"}
							/>
						</div>

						<div className="flw-row">
							<Select
								value={chargeCountry}
								name={"Charge Country (optional) "}
								options={countriesList}
								bottomNote={"Default: Nigeria"}
								onChange={(e) => {
									setChargeCountry(e.target.value);
								}}
							/>
						</div>

						<div className="f4b-cta">
							<Button
								name={"Cancel"}
								bg={"#828282"}
								color={"#ffffff"}
								onClick={(e) => {
									handleReset(e);
								}}
							/>
							<Button
								name={"Save Changes"}
								bg={"#F5A623"}
								color={"black"}
								onClick={(e) => {
									handleSubmit(e);
								}}
							/>
						</div>
					</div>
				</form>
			</div>

			{isSubmitted && (
				<Notice
					title={"Updated Successfully"}
					message={"Your settings have been saved."}
					onClose={() => setIsSubmitted(false)}
				/>
			)}
		</FlutterwaveBody>
	);
}
