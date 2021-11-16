const blockAttributes = {
	url: {
		type: "string",
		source: "attribute",
		selector: "img",
		attribute: "src",
	},
	title: {
		type: "string",
		selector: "h1",
	},
	size: {
		enum: ["large", "small"],
	},
};

export default blockAttributes;
