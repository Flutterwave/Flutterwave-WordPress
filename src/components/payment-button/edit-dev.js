/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	BlockControls,
	JustifyToolbar,
	InspectorControls,
	RichText,
	ColorPalette,
	PanelBody,
} from "@wordpress/block-editor";

// import { Button } from "@wordpress/components";
const Edit = ({ attributes, setAttributes }) => {
	const { justify, fontsize, title, backgroundcolor, textcolor } = attributes; //get the attributes

	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};

	const onChangeBGColor = (hexColor) => {
		setAttributes({ bg_color: hexColor });
	};

	const onChangeTextColor = (hexColor) => {
		setAttributes({ text_color: hexColor });
	};

	return (
		<div style={{ textAlign: justify }}>
			<BlockControls>
				<JustifyToolbar
					value={attributes.justify}
					onChange={(value) => setAttributes({ justify: value })}
				/>
			</BlockControls>

			<button
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
				onClick={(e) => e.preventDefault()} //prevent default action
			>
				<RichText
					tagName="h6"
					placeholder={__("Button Text", "flutterwave-for-business")}
					value={title}
					onChange={onChangeTitle}
					style={{ marginBottom: "0.3em", marginTop: "0.3em" }}
				/>
				{/* {title} */}
			</button>
		</div>
	);
};

export default Edit;
