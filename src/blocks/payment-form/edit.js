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
} from "@wordpress/block-editor";
import {
	SelectControl,
	Button,
	__experimentalInputControl as InputControl,
	PanelBody,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/components";

/*
Internal dependencies
*/
import { blockStyle } from "./index";
import { Input } from "../../components/form";
import Header from "./partials";

const Edit = ({ attributes, isSelected, setAttributes }) => {
	const { title, alignment } = attributes;
	const handleSubmit = (e) => e.preventDefault();
	const blockProps = useBlockProps({ style: blockStyle });
	const onChangeAlignment = (newAlignment) => {
		setAttributes({
			alignment: newAlignment === undefined ? "none" : newAlignment,
		});
	};

	const ALLOWED_BLOCKS = ["core/image", "core/paragraph"]; //blocks allowed to be inserted inside the block

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
		<div {...blockProps}>
			{
				<BlockControls>
					<AlignmentToolbar
						value={alignment}
						onChange={onChangeAlignment}
					/>
				</BlockControls>
			}

			{
				<InspectorControls>
					<PanelBody title={__("Subaccount settings")}>
						{/* <UnitControl
							label={__("Width")}
							labelPosition="edge"
							__unstableInputWidth="80px"
							value={width || ""}
							onChange={(nextWidth) => {
								nextWidth =
									0 > parseFloat(nextWidth) ? "0" : nextWidth;
								setAttributes({ width: nextWidth });
							}}
							units={units}
						/> */}
					</PanelBody>
					<PanelBody title={__("Color settings")}>
						<div id="f4bform-controls">
							<fieldset>
								<legend className="blocks-base-control__label">
									{__(
										"Background color",
										"flutterwave-for-business"
									)}
								</legend>
								<ColorPalette // Element Tag for Gutenberg standard colour selector
									onChange={onChangeBGColor} // onChange event callback
								/>
							</fieldset>
							<fieldset>
								<legend className="blocks-base-control__label">
									{__(
										"Text color",
										"flutterwave-for-business"
									)}
								</legend>
								<ColorPalette // Element Tag for Gutenberg standard colour selector
									onChange={onChangeTextColor} // onChange event callback
								/>
							</fieldset>
						</div>
					</PanelBody>
				</InspectorControls>
			}

			<div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-end",
					}}
				>
					<div>
						<Button
							style={{
								background: "#828282",
								marginRight: "1em",
								color: "#fff",
							}}
						>
							Cancel
						</Button>

						<Button style={{ background: "#f5a623" }}>
							Make Payment
						</Button>
					</div>
				</div>
				<hr />
				<RichText
					tagName="h6"
					placeholder={__(
						"Flutterwave Title",
						"flutterwave-for-business"
					)}
					value={title}
					style={{ textAlign: "center" }}
					onChange={onChangeTitle}
				/>

				<InnerBlocks
					orientation="horizontal"
					allowedBlocks={ALLOWED_BLOCKS}
				/>
			</div>
			{/* <Header /> */}
			<form onSubmit={handleSubmit}>
				<Input
					label="Full Name"
					type="text"
					placeholder="Felix Obinna"
				/>
				<Input
					label="Email"
					type="email"
					placeholder="email@example.com"
				/>
				<Input label="Amount" type="number" placeholder="5,000" />
				<Input
					label="Phone Number"
					type="tel"
					placeholder="08080909878"
				/>

				{/* <SelectControl
					label="Recurring Payment"
					options={[
						{ label: "none", value: "" },
						{ label: "Weekly", value: "weekly" },
						{ label: "Monthly", value: "monthly" },
						{ label: "Annually", value: "annually" },
						{ label: "Bi-quarterly", value: "bi-quarterly" },
					]}
				/> */}
				{/* none, weekly, monthly, bi-quarterly, anually */}

				{/* <SelectControl
					label="Currency"
					options={[
						{ label: "NGN", value: "NGN" },
						{ label: "USD", value: "USD" },
						{ label: "EUR", value: "EUR" },
						{ label: "GBP", value: "GBP" },
						{ label: "ZMW", value: "ZMW" },
						{ label: "GHS", value: "GHS" },
						{ label: "TZS", value: "TZS" },
						{ label: "KES", value: "KES" },
						{ label: "UGX", value: "UGX" },
						{ label: "RWF", value: "RWF" },
						{ label: "XAF", value: "XAF" },
						{ label: "XOF", value: "XOF" },
						{ label: "ZAR", value: "ZAR" },
					]}
				/> */}
				{/* NGN,UGX,RWF,TZS,GBP,USD,KES,GHS,ZAR,EUR,ZMW, XOF, XAF */}
			</form>

			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
				}}
			>
				{/* <RichText
				tagName="h6"
				value={"Flutterwave Form"}
				placeholder={"Form Title"}
				onChange={(content) => setAttributes({ content })}
			/> */}
				<div>
					<Button
						style={{ background: "#f5a623", marginRight: "1em" }}
					>
						Make Payment
					</Button>
					<Button
						style={{
							background: "#828282",
							color: "#fff",
						}}
					>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Edit;
