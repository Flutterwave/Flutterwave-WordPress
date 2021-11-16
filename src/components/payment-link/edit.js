/* 
Wordpress dependencies
*/
import { __ } from "@wordpress/i18n";
import {
	RichText,
	RichTextToolbarButton,
	useBlockProps,
	AlignmentToolbar,
	BlockControls,
	InnerBlocks,
	InspectorControls,
	ColorPalette,
	PanelBody,
} from "@wordpress/block-editor";

const Edit = ({ attributes, setAttributes }) => {
	const { link, title, alignment, textsize } = attributes;

	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};

	const onChangeAlignment = (newAlignment) => {
		setAttributes({
			alignment: newAlignment === undefined ? "none" : newAlignment,
		});
	};
	return (
		<div style={{ textAlign: alignment }}>
			{/* <InspectorControls key="setting">
				<PanelBody
					title={__("Link settings", "flutterwave-for-business")}
				>
					<div id="f4blink-controls">
						Welcome to the setting baby!!
					</div>
				</PanelBody>
			</InspectorControls> */}
			<BlockControls>
				<AlignmentToolbar
					value={alignment}
					onChange={onChangeAlignment}
				/>
			</BlockControls>

			<a href={link} style={{ textsize: textsize, textAlign: alignment }}>
				<RichText
					tagName="p"
					placeholder={__("Payment Link", "flutterwave-for-business")}
					value={title}
					onChange={onChangeTitle}
				/>
			</a>
		</div>
	);
};

export default Edit;
