const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpack = require("webpack");

const baseConfig = require("./webpack.base.config");
const merge = require("webpack-merge");
const proxy = require("./proxy");
const {resolve} = require("./util");

module.exports = merge(baseConfig, {
  output: {
    publicPath: "/"
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    inline: true,
    hot: true,
    port: 8085,
    proxy: proxy() || {}
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(resolve('src'), 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
});
