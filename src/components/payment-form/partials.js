/* 
Wordpress dependencies
*/
import { __ } from "@wordpress/i18n";
import { Button, RichText } from "@wordpress/components";

const Header = ({ className, attributes, setAttributes }) => {
	let title = "My Form Title";
	const onChangeTitle = (e) => {
		console.log(e.target.value);
	};
	return (
		<div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-end",
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
		</div>
	);
};

export default Header;
