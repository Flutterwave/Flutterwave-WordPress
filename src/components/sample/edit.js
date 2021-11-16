/**
 * WordPress dependencies
 */
import { RichText, InnerBlocks } from "@wordpress/block-editor";

const Edit = ({ attributes, setAttributes }) => {
	const onEdit = (e) => {
		// console.log(e);
		setAttributes({ url: e });
	};

	const onEditTitle = (e) => {
		// console.log(e);
		setAttributes({ title: e });
	};

	return (
		<div style={{ padding: "2em", backgroundColor: "antiquewhite" }}>
			<RichText
				onChange={(e) => onEditTitle(e)}
				value={attributes.title}
				placeholde="Form Title"
			/>
			<RichText onChange={(e) => onEdit(e)} value={attributes.url} />
		</div>
	);
};

export default Edit;
