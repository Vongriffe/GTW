const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: __dirname + './dist',
    filename: './js/bundle.js'
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
      // {
      //   test: /\.css$/,
      //   loader: ['style-loader', 'css-loader','sass-loader']
      // },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader','sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'fronted_recruitment',
      filename:'./../index.html',
      hash: true,
      template: 'my-index.html' //load
    })
  ]
};
