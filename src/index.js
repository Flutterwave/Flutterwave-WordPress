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
import Icon from "./icons";
import formSettings from "./components/payment-form";
// import sampleSettings from "./components/sample";
import buttonSettings from "./components/payment-button";
import linkSettings from "./components/payment-link";
import statusSettings from "./components/status-page";

function MyToolbar() {
	return (
		<Toolbar label="Options">
			<ToolbarButton icon={formatBold} label="Bold" />
			<ToolbarButton icon={formatItalic} label="Italic" />
			<ToolbarButton icon={link} label="Link" />
		</Toolbar>
	);
}

setCategories([
	...getCategories().filter(({ slug }) => slug !== "flutterwave"),
	{
		slug: "flutterwave",
		title: __("Flutterwave", "flutterwave-for-business"),
		icon: <img src={Icon.logo} />,
	},
]);

// registerBlockType("f4b-blocks/sample-block", {
// 	title: __("Payment Form Sample", "flutterwave-for-business"),
// 	icon: "megaphone",
// 	category: "flutterwave",
// 	...sampleSettings,
// });

registerBlockType("f4b-blocks/form-block", {
	title: __("FLW Payment Form", "flutterwave-for-business"),
	icon: <img className={"block-editor-block-icon svg"} src={Icon.form} />,
	category: "flutterwave",
	...formSettings,
});

registerBlockType("f4b-blocks/button-block", {
	title: __("FLW Payment Button", "flutterwave-for-business"),
	icon: <img className={"block-editor-block-icon svg"} src={Icon.btn} />,
	category: "flutterwave",
	...buttonSettings,
});

registerBlockType("f4b-blocks/link-block", {
	title: __("FLW Payment Link", "flutterwave-for-business"),
	icon: <img className={"block-editor-block-icon svg"} src={Icon.link} />,
	category: "flutterwave",
	...linkSettings,
});

registerBlockType("f4b-blocks/status-page", {
	title: __("FLW Status Page", "flutterwave-for-business"),
	icon: <img className={"block-editor-block-icon svg"} src={Icon.status} />,
	category: "flutterwave",
	...statusSettings,
});

registerBlockType("f4b-blocks/donate", {
	title: __("FLW Donate page", "flutterwave-for-business"),
	icon: <img className={"block-editor-block-icon svg"} src={Icon.donate} />,
	category: "flutterwave",
	...statusSettings,
});
