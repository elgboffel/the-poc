const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	entry: "./src/server.ts",
	target: "node",
	mode: "production",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "auto",
	},
	resolve: {
		extensions: [".ts", ".js"],
		plugins: [new TsconfigPathsPlugin()],
	},
	externals: [nodeExternals()],
	externalsPresets: {
		node: true,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
};
