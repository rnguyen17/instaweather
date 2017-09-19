const path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	webpack = require('webpack');

var config = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index-bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{test: /\.js$/, use: 'babel-loader'},
			{test: /\.(png|jpg|svg)$/, use: ['file-loader?name=app/img/[name].[ext]', 'image-webpack-loader']},
			{test: /\.css$/, use: ['style-loader', 'css-loader']}
		]
	},
	resolve: {
	  modules: [
	  	path.resolve('./app'),
	  	path.resolve('./node_modules')
	  ]
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './app/index.html'
		})
	]
}

if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	)
}

module.exports = config;