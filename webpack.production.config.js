let path = require('path');
let webpack = require('webpack');
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: {
    index: __dirname + "/src/index.js",
    vendor: ["react", "react-dom", "react-router"]
  },
  output: {
    path: __dirname + "/dist",
    filename: '[name].js',
    chunkFilename: "[name].js",
  },
  resolve: {
    extensions: [
      '.js', '.json', '.webpack.js', ".scss", ".css"
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/, use: [{
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            "presets": ["@babel/preset-env", "@babel/preset-react"],
            "plugins": [
              ["@babel/plugin-proposal-decorators", {"legacy": true}],
              ["@babel/plugin-proposal-class-properties", {"legacy": true}],
              ["@babel/plugin-syntax-dynamic-import"],
              [
                "@babel/plugin-transform-runtime"
              ]
            ],
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.css$/, use: ['style-loader', 'css-loader?module', 'postcss-loader',],
      },
      {
        test: /\.(sass|scss)$/, use: ['style-loader', 'css-loader?module', 'sass-loader'],
      },
      {
        test: /\.(png|jpg)$/, use: ["url-loader"],
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    require('autoprefixer'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname + '/src', 'index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new UglifyjsWebpackPlugin({
      sourceMap: false
    }),

    // 非国际化moment模块优化
    // new webpack.ContextReplacementPlugin(
    //   /moment[/\\]locale$/,
    //   /zh-cn/,
    // ),
    new CleanWebpackPlugin('dist', {
      root: __dirname,
      verbose: true,
      dry: false
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
        }
      }
    },
  }
};