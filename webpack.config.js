/**
 * Created by Administrator on 2017/10/30/030.
 */
const path = require('path');

module.exports = {
  entry: {
    'lisper': "./V2/index.js"
  },
  output: {
    library: "compile",
    libraryTarget: "umd",
    filename: "compile.js"
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
    },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },{
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static','fonts/[name].[hash:7].[ext]')
        }
      }]
  }
};