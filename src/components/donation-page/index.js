/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import {
	AlignmentControl,
	BlockControls,
	RichText,
} from "@wordpress/block-editor";

const Sample = ({ firstname, setAttributes }) => {
	return (
		<RichText
			tagName="div"
			placeholder={__("Firstname", "Flutterwave-for-Business")}
			value={firstname}
			onChange={(value) => setAttributes({ firstname: value })}
		/>
	);
};

const FinalSample = () => {
	return (
		<form>
			<input name="firstname" />
			<input name="lastname" />
			<input name="amount" />
			<input name="currency" />
		</form>
	);
};

registerBlockType("f4b-blocks/form-block", {
	title: __("Flutterwave Payment Form", "form-blocks"),
	icon: "megaphone",
	category: "common",
	attributes: {
		firstname: {
			type: "array",
			source: "children",
			selector: "p",
		},
	},
	edit: (props) => {
		console.log(props);
		return <Sample {...props} />;
		// return <div>Editing..</div>;
	},
	save: () => <FinalSample />,
});
