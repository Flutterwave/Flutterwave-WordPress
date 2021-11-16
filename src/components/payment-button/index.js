/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
// import Edited from "./edit-dev";
import blockAttributes from "./attributes";
export const blockStyle = {
	backgroundColor: "#fff",
	color: "black",
	padding: "20px",
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
		align: ["normal", "left", "right", "full"],
	},
	color: {
		// This also enables text and background UI controls.
		background: true,
		gradients: true, // Enable gradients UI control.
	},
	edit: Edit,
	save: Save,
};

export default defaultSettings;
