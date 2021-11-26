const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry,
		frontend: "./src/frontend.js",
		blocks: "./src/blocks/index.js",
		admin: "./src/admin/index.js",
	},
};
