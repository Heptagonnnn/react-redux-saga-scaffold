const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: "development",
  entry: ['@babel/polyfill', __dirname + '/src/index.js'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build'
  },
  devtool: 'eval-source-map',
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
            ]
          }
        }],
        exclude: /node_modules/
      },
      {test: /\.css$/, use: ['style-loader', 'css-loader?module', 'postcss-loader',]},
      {test: /\.(sass|scss)$/, use: ['style-loader', 'css-loader?module', 'sass-loader']},
      {test: /\.(png|jpg)$/, use: ["url-loader"]}
    ]
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    inline: true,
    hot: true,
    port: 8085
    // proxy: {
    //   "**": "http://localhost:8081"
    // }
  },
  plugins: [
    require('autoprefixer'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname + '/src', 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    require('autoprefixer')
  ]
};