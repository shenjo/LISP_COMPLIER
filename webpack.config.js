/**
 * Created by Administrator on 2017/10/30/030.
 */
module.exports =   {
	entry: "./src/main.js",
  devtool: 'inline-source-map',
	output: {
		path: __dirname+'/dist',
		filename: "bundle.js"
	}
};