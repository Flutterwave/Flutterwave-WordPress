import { select } from "@wordpress/data";
import { store } from "@wordpress/viewport";
import { useEffect } from "@wordpress/element";

const { isViewportMatch } = select(store);
const isSmall = isViewportMatch("< medium");
const isWideOrHuge = isViewportMatch(">= wide");

import Logo from "../images/flutterwave-logo.svg";

const Header = ({ title }) => {
	useEffect(() => {}, [isSmall, isWideOrHuge]);
	return (
		<>
			{/* {isSmall && <div className="header-container">Hey there</div>} */}
			{isWideOrHuge && (
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						backgroundColor: "#fff",
						zIndex: "1001",
						boxSizing: "border-box",
						position: "fixed",
						width: "calc(100% - 160px)",
						padding: "1em",
					}}
				>
					<img src={Logo} />
					<h1 style={{ marginLeft: "15px", fontSize: "14px" }}>
						{title || "Flutterwave Header"}
					</h1>
				</div>
			)}
		</>
	);
};

export default Header;
