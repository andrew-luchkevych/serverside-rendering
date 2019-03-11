var webpack = require("webpack");
var CopyPlugin = require("copy-webpack-plugin");
var rules = [
	{
		test: /\.tsx?/,
		exclude: /node_modules/,
		use: [
			{
				loader: 'ts-loader'
			}
		]
	},
	{
		test: /\.(scss)$/,
		use: [
			{
				loader: 'style-loader'
			},
			{
				loader: 'css-loader',
				options: {
					sourceMap: true
				}
			},
			{
				loader: 'sass-loader',
				options: {
					sourceMap: true
				}
			}
		]
	},
	{
		test: /\.(css)$/,
		use: [
			{
				loader: 'style-loader'
			},
			{
				loader: 'css-loader',
				options: {
					sourceMap: true
				}
			}
		]
	},
	{
		test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		use: [
			{
				loader: "url-loader?limit=10000&mimetype=application/font-woff",
				options: {
					name: "fonts/[hash].[ext]"
				}
			}
		]
	},
	{
		test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		use: [
			{
				loader: "file-loader",
				options: {
					name: "fonts/[hash].[ext]"
				}
			}
		]
	}
];
var extensions = [
	".tsx",
	".ts",
	".js",
	".jsx",
];
var devtool = "source-map";
const clientConfig = {
	entry: "./src/client/entry.tsx",
	output: {
		path: __dirname + '/dist/public/',
		filename: "bundle.js",
	},
	devtool,
	module: { rules },
	resolve: { extensions },
};

const serverConfig = {
	entry: "./src/server/index.ts",
	target: "node",
	output: {
		path: __dirname + '/dist/',
		filename: "server.js",
		libraryTarget: "commonjs2",
	},
	devtool,
	module: { rules },
	resolve: { extensions },
	plugins: [
		new CopyPlugin([{
			from: 'static', to: 'public',
		}])
	]
};

module.exports = [clientConfig, serverConfig];
