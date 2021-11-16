/* 
Wordpress dependencies
*/
import { __experimentalInputControl as InputControl } from "@wordpress/components";

const Input = ({ label, help, type, placeholder }) => {
	const hideLabelFromVision = false;
	const className = "";
	return (
		<div
			style={{
				marginBottom: "24px",
				fontFamilty: "Inter",
				fontWeight: "200",
			}}
		>
			<InputControl
				label={label}
				hideLabelFromVision={hideLabelFromVision}
				help={help}
				type={type}
				placeholder={placeholder}
				className={className}
				style={{
					width: "100%",
					height: "40px",
					fontFamilty: "Inter",
					fontWeight: "200",
				}}
			/>
		</div>
	);
};

export default Input;
