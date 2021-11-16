const Save = ({ attributes }) => {
	const { justify, fontsize, title, backgroundcolor, textcolor } = attributes;
	return (
		<div style={{ textAlign: justify }}>
			<button
				id="f4b-paynow-button"
				style={{
					fontSize: fontsize,
					lineHeight: "1.25",
					padding: "1.1em 1.44em",
					textTransform: "uppercase",
					backgroundColor: backgroundcolor,
					color: textcolor,
					border: "none",
					borderRadius: "0.3em",
				}}
			>
				<h6 style={{ margin: "0" }}>{title}</h6>
			</button>
		</div>
	);
};

export default Save;
