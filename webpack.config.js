/**
 * Created by Administrator on 2017/10/30/030.
 */
module.exports = {
	entry: {
		'lisper': "./src/main.js"
		// 'electron':"./src/electron.js"
	},
	devtool: 'inline-source-map',
	output: {
		path: __dirname + '/dist',
		filename: "[name].js"
	}
};