const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const {resolvePath} = require("./util/resolvePath");


module.exports = merge(baseConfig, {
  plugins: [
    new CleanWebpackPlugin('dist', {
      root: resolvePath(),
      verbose: true,
      dry: false
    }),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: resolvePath('test', 'index.html'),
    }),

    new OptimizeCSSPlugin({
      cssProcessorOptions: {safe: true}
    }),

  ]
});

