const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const {resolve} = require("./util");

module.exports = merge(baseConfig, {
  output: {
    publicPath: 'http://s1.xmcdn.com/sr012018/the-sound-vote-page/last/dist/'
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

    new OptimizeCSSPlugin(),
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false, //不需要格式化
          comments: false //不保留注释
        },
        compress: {
          warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器}
        }
      }
    })
  ]
});

