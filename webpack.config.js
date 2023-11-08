const path = require('path');

module.exports = {
	entry: {
		main: './src/js/main.js',
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
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					test: /node_modules|bower_components/,
					name: 'vendor',
					enforce: true,
				},
			},
		},
	},
};
