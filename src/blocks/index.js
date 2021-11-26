/**
 * WordPress dependencies
 */
import { getCategories, setCategories } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { Toolbar, ToolbarButton } from "@wordpress/components";
import { formatBold, formatItalic, link } from "@wordpress/icons";

/**
 * Internal dependencies
 */
import Icon from "../icons";
import formSettings from "./payment-form";
// import sampleSettings from "./components/sample";
import buttonSettings from "./payment-button";
import linkSettings from "./payment-link";
import statusSettings from "./status-page";

setCategories([
	...getCategories().filter(({ slug }) => slug !== "flutterwave"),
	{
		slug: "flutterwave",
		title: __("Flutterwave", "flutterwave-for-business"),
		icon: <img src={Icon.logo} />,
	},
]);

registerBlockType("flutterwave/form-block", {
	title: __("FLW Payment Form", "flutterwave-for-business"),
	icon: <img className={"block-editor-block-icon svg"} src={Icon.form} />,
	category: "flutterwave",
	...formSettings,
});

registerBlockType("flutterwave/button-block", {
	title: __("FLW Payment Button", "flutterwave-for-business"),
	icon: <img className={"block-editor-block-icon svg"} src={Icon.btn} />,
	category: "flutterwave",
	...buttonSettings,
});

registerBlockType("flutterwave/link-block", {
	title: __("FLW Payment Link", "flutterwave-for-business"),
	icon: <img className={"block-editor-block-icon svg"} src={Icon.link} />,
	category: "flutterwave",
	...linkSettings,
});

registerBlockType("flutterwave/status-page", {
	title: __("FLW Status Page", "flutterwave-for-business"),
	icon: <img className={"block-editor-block-icon svg"} src={Icon.status} />,
	category: "flutterwave",
	...statusSettings,
});

registerBlockType("flutterwave/donate", {
	title: __("FLW Donate page", "flutterwave-for-business"),
	icon: <img className={"block-editor-block-icon svg"} src={Icon.donate} />,
	category: "flutterwave",
	...statusSettings,
});
