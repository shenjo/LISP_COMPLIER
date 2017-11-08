/**
 * Created by Administrator on 2017/10/30/030.
 */
module.exports = {
  entry: {
    'lisper': "./src/app.js"
    // 'electron':"./src/electron.js"
  },
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/dist',
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  }
};