import * as path from 'path';
import { Configuration, StatsOptions } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin, { loader } from 'mini-css-extract-plugin';
import 'webpack-dev-server';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const getBuildPath = () => path.resolve(__dirname, 'dist');

const getOutputFilename = (isProd: boolean) => (
	isProd ? 'main-[hash:8].js'
		: undefined
);

const getStyleLoaders = (isProd: boolean) => (
	[
		isProd ? loader
			: 'style-loader',
		'css-loader',
		'postcss-loader',
	]
);

const getPlugins = (isProd: boolean) => {
	const plugins: Array<any> =		[
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
	];

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'main-[hash:8].css',
			}),
			new CleanWebpackPlugin(),
		);
	}

	return plugins;
};

export default (env: StatsOptions, argv: Configuration) => {
	const { mode = 'development' } = argv;

	const config: Configuration = {
		mode,

		resolve: {
			extensions: ['.js', '.ts', '.tsx', '.css'],
		},

		entry: './src/index.tsx',
		output: {
			path: getBuildPath(),
			filename: getOutputFilename(mode === 'production'),
		},

		module: {
			rules: [

				// Loading babel
				{
					test: /\.(js|ts|tsx)$/,
					exclude: /node_modules/,
					use: 'babel-loader',
				},

				// Transform svg to component
				{
					test: /\.svg$/i,
					issuer: /\.[jt]sx?$/,
					use: '@svgr/webpack',
				},

				// Loading images
				{
					test: /\.(png|jpg|jpeg|gif|ico)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: 'images',
								name: '[name]-[sha1:hash:7].[ext]',
							},
						},
					],
				},

				// Loading fonts
				{
					test: /\.(woff(2)?|eot|ttf|otf)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: 'fonts',
								name: '[name].[ext]',
							},
						},
					],
				},

				// Loading css
				{
					test: /\.(css)$/,
					use: getStyleLoaders(mode === 'production'),
				},

				// Loading SASS/SCSS
				{
					test: /\.(s[ca]ss)$/,
					use: [
						...getStyleLoaders(mode === 'production'),
						'sass-loader',
					],
				},
			],
		},

		plugins: getPlugins(mode === 'production'),

		devServer: {
			static: getBuildPath(),
			open: true,
			compress: true,
			port: 3000,
		},
	};

	return config;
};
