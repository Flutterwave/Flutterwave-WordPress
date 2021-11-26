/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
/**
 * Internal dependencies
 */
import { Header } from "../partials";

const FlutterwaveBody = ({ title, children, attr }) => {
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<Header title={__(title, "flutterwave-for-business")} />
			{/* Header End */}
			<div className="flw-main-container" style={attr}>
				{/* <div className="flw-set-container"> lorem .,...</div>
            <div className="flw-set-container">lorem .....mnnh</div> */}
				{children}
			</div>
		</div>
	);
};

export default FlutterwaveBody;
