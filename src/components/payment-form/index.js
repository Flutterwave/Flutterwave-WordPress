/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
// import Saved from "./save-development";
import blockAttributes from "./attributes";
export const blockStyle = {
	backgroundColor: "#fff",
	color: "black",
	padding: "20px",
	paddingLeft: "48px",
	paddingRight: "48px",
	filter: "drop-shadow(0px 1.44402px 10.8301px rgba(0, 0, 0, 0.1))",
	fontFamily: "Inter",
	fontWeight: "300",
};

const defaultSettings = {
	attributes: blockAttributes,
	example: {},
	supports: {
		// Declare support for specific alignment options.
		//work needs to be done to handle multiple alignments
		// align: ["normal", "left", "right", "full"],
		spacing: {
			margin: true, // Enable margin UI control.
			padding: true, // Enable padding UI control.
		},
		alignWide: false,
		// Remove the support for the custom className.
		customClassName: false,
		// Remove the Default Style picker.
		defaultStylePicker: false,
	},
	edit: Edit,
	save: Save,
};

export default defaultSettings;
