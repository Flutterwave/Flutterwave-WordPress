const Save = ({ attributes }) => {
	const { link, title, alignment, textsize } = attributes;
	return (
		<div style={{ textAlign: alignment }}>
			<h2 className="f4b-status-title">{title}</h2>

			<div className="f4b-container">
				<ul className="f4b-left-detail"></ul>
				<ul className="f4b-right-detail"></ul>

				<button
					id="f4b-status-print"
					style={{ background: "#f5a623", marginRight: "1em" }}
				>
					Print
				</button>
				<button
					id="f4b-status-cancel"
					style={{ background: "#f5a623", marginRight: "1em" }}
				>
					cancel
				</button>
			</div>
		</div>
	);
};

export default Save;
