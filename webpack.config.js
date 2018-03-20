
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './js/app.js',
  output: {
    // path: 'dist'
    filename: './dist/bundle.js'
  },
  watch: true,
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader','sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'fronted_recruitment',
      template: 'my-index.html' //load
    })
  ]
};
