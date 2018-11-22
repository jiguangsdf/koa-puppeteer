// backend webpack

const path = require('path');
const webpack = require('webpack')

const config  = {
	target:'node',
	mode:'production',//'development',
	entry:'./app.js',
	output:{
		path:path.resolve(__dirname, 'dist'),
		filename:'index.js'
	},
	plugins:[new webpack.BannerPlugin('http://jiguang.in  updateAt:2018-10-30T05:52:43.036Z')]
			
};

module.exports = config;