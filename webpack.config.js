const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var url = path.resolve('./');
let isEnvProduction = true;
module.exports = {
	mode: 'development',
	entry: url + '/src/index.js',
	output: {
		path: url + "/dist",
		filename: '[name].[contenthash:8].js',
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				parser: {
					requireEnsure: false
				}
			},
			{
				test: /\.(js|mjs|jsx|ts|tsx)$/,
				enforce: 'pre',
				use: [{
					options: {
						// cache: true,
						formatter: require.resolve('react-dev-utils/eslintFormatter'),
						eslintPath: require.resolve('eslint'),
						resolvePluginsRelativeTo: __dirname
					},
					loader: require.resolve('eslint-loader')
				}],
				include: path.resolve("src"),
			},
			{
				oneOf: [{
					test: /\.(js|mjs|jsx|ts|tsx)$/,
					loader: require.resolve('babel-loader'),
					options: {
						customize: require.resolve('babel-preset-react-app/webpack-overrides'),
					}
				}, ]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: __dirname + '/dist/index.html',
			template: path.resolve(__dirname, './src/index.html'),
			// chunks: ['entry']
		}),
	],
	devServer: {
		contentBase: path.resolve(__dirname, './dist'),
		compress: true,
		port: 3000,
		open: true,
	}
};