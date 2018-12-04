const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const baseConfig = require("./webpack.base.config");
const merge = require("webpack-merge");
const proxy = require("./proxy");
const {resolve} = require("./util");

module.exports = merge(baseConfig, {
  devtool: "eval-source-map",
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    inline: true,
    hot: true,
    host: '0.0.0.0',
    port: 8085,
    disableHostCheck: true,
    proxy: proxy() || {}
  },
  plugins: [
    new CleanWebpackPlugin('dist', {
      root: resolve(),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(resolve('src'), 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
});
