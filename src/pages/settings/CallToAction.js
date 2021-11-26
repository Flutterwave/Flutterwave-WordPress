import React, { Component } from "react";

const Button = (props) => {
	const { color, name, bg, onClick } = props;

	return (
		<div className="flw-btn">
			<button
				style={{
					backgroundColor: bg,
					color,
					border: "none",
					padding: "9px, 16px, 9px, 16px",
					fontSize: "12px",
					borderRadius: "4px",
					width: "113px",
					height: "32px",
				}}
				onClick={onClick || (() => {})}
			>
				{name}
			</button>
		</div>
	);
};

export default Button;
