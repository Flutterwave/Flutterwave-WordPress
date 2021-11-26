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

import Icon from "../../icons";

import { Button } from "@wordpress/components";

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
		<div
			style={{
				textAlign: alignment,
				background: "#fff",
				filter:
					"drop-shadow(0px 1.44402px 10.8301px rgba(0, 0, 0, 0.1))",
				padding: "2em",
				borderRadius: "0.5em",
			}}
		>
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
			<img
				src={Icon.status}
				width="15%"
				height="15%"
				alt="f4b-status-icon"
				style={{
					alignSelf: "center",
				}}
			/>
			<RichText
				tagName="h2"
				className="f4b-status-title"
				value={title}
				onChange={onChangeTitle}
				placeholder={__("Enter title", "flutterwave-for-business")}
				style={{
					fontSize: textsize,
					color: "#93CB52",
					marginBottom: "2em",
				}}
			/>

			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<ul style={{ textAlign: "left" }}>
					<li style={{ listStyle: "none" }}>Payment Method</li>
					<li style={{ listStyle: "none" }}>Client Email</li>
					<li style={{ listStyle: "none" }}>Client Mobile</li>
					<li style={{ listStyle: "none" }}>Amount Paid</li>
					{/* transaction meta */}
					<li
						style={{
							listStyle: "none",
							marginTop: "1em",
							fontWeight: "bold",
						}}
					>
						Transaction Id:
					</li>
					<li style={{ listStyle: "none", fontWeight: "bold" }}>
						Transaction Ref:
					</li>
				</ul>
				<ul style={{ textAlign: "right" }}>
					<li style={{ listStyle: "none" }}>Card</li>
					<li style={{ listStyle: "none" }}>olaobajua@gmail.com</li>
					<li style={{ listStyle: "none" }}>09067985861</li>
					<li style={{ listStyle: "none" }}>N 7500</li>
					{/* transaction meta */}
					<li
						style={{
							listStyle: "none",
							marginTop: "1em",
							fontWeight: "bold",
						}}
					>
						954402
					</li>
					<li style={{ listStyle: "none", fontWeight: "bold" }}>
						WP_FLW|000000000|000
					</li>
				</ul>
			</div>

			<Button style={{ background: "#f5a623", marginRight: "1em" }}>
				Print
			</Button>
			<Button style={{ background: "#f5a623", marginRight: "1em" }}>
				cancel
			</Button>
		</div>
	);
};

export default Edit;
