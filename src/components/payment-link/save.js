const Save = ({ attributes }) => {
	const { link, title, alignment, textsize } = attributes;
	return (
		<div style={{ textAlign: alignment }}>
			<a href={link} style={{ textsize: textsize }}>
				{title}
			</a>
		</div>
	);
};

export default Save;
