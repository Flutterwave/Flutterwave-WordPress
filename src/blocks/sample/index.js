/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import attributes from "./attributes";
import edit from "./edit";
import save from "./save";

const defaultSettings = {
	attributes,
	example: {},
	edit,
	save,
};

export default defaultSettings;
