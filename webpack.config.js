'use strict';

const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PROD = (process.env.NODE_ENV && process.env.NODE_ENV === 'production');

const conf = {
  devtool: 'source-map',
  entry  : {
    main: `${__dirname}/src/app/main.js`,
  },
  output: {
    path    : `${__dirname}/dist`,
    filename: '[name].bundle.[hash].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      {
        test  : /\.scss$/,
        loader: (PROD) ? (['style', 'css', 'sass']) : (ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap', 'sass-loader')),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      minify  : (PROD) ? ({ removeComments: true, collapseWhitespace: true, minifyJS: true }) : (false),
    }),
  ],
};

if (PROD) {
  conf.plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
} else {
  conf.plugins.push(new ExtractTextPlugin('styles.css'));
}

module.exports = conf;
