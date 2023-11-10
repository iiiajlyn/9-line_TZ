const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		index: './src/js/index.js',
		isIE: './src/js/isIE.js',
	},
	output: {
		path: path.resolve(__dirname, 'build/js'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules|bower_components/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	optimization: {
		splitChunks: {
			// chunks: 'all',
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					test: /node_modules|bower_components/,
					name: 'vendor',
					enforce: true,
					minChunks: 2,
				},
			},
		},
	},
	plugins: [
		// new BundleAnalyzerPlugin(),
	],
};
