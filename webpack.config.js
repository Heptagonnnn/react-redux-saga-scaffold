const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: ['@babel/polyfill', __dirname + '/src/index.js'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: [
      '.js', '.json', '.webpack.js', '.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/, use: [{
          loader: 'babel-loader',
          options: {
            "presets": ["@babel/preset-env", "@babel/preset-react"],
            "plugins": [
              ["@babel/plugin-proposal-decorators", {"legacy": true}],
              ["@babel/plugin-proposal-class-properties", {"legacy": true}],
              ["import", {
                libraryName: "antd-mobile",
                style: "css"
              }]
            ]
          }
        }]
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
    // proxy: {
    //   "**": "http://localhost:8081"
    // }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname + '/src', 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    require('autoprefixer')
  ]
};