const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const {resolve} = require("./util");


module.exports = merge(baseConfig, {
  output: {
    publicPath: "http://static2.test.ximalaya.com/sr012018/the-sound-vote-page/last/dist/"
  },
  plugins: [
    new CleanWebpackPlugin('dist', {
      root: resolve(),
      verbose: true,
      dry: false
    }),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('src', 'index.html'),
    }),

    new OptimizeCSSPlugin({
      cssProcessorOptions: {safe: true}
    }),

  ]
});

