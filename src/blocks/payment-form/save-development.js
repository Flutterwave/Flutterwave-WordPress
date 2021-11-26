/* 
Wordpress dependencies
*/
import { __ } from "@wordpress/i18n";
import {
	RichText,
	RichTextToolbarButton,
	useBlockProps,
	InnerBlocks,
} from "@wordpress/block-editor";
//How to use TextControl
import { Button } from "@wordpress/components";
/*
Internal dependencies
*/
import { blockStyle } from "./index";

const Save = ({ attributes, className }) => {
	const { title, alignment } = attributes;

	const handleSubmit = (e) => console.log("hey the form submitted");
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-end",
					}}
				>
					<div>
						<button
							style={{
								background: "#828282",
								marginRight: "1em",
								color: "#fff",
							}}
						>
							Cancel
						</button>

						<button style={{ background: "#f5a623" }}>
							Make Payment
						</button>
					</div>
				</div>
				<hr />

				<h6 style={{ textAlign: "center" }}>{title}</h6>
			</div>
			{/* <Header /> */}
		</div>
	);
};

export default Save;
