const path = require("path");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {resolve} = require("./util");


module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    index: "./src/index.js",
    vendor: ["react", "react-dom", "react-router"]
  },
  output: {
    path: resolve("dist"),
    filename: '[name].js',
    chunkFilename: "[name].[hash].js",
  },
  resolve: {
    extensions: [
      '.js', '.json', '.webpack.js', ".scss", ".css"
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader?module', 'postcss-loader'],
        include: [resolve('src')], //限制范围，提高打包速度
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader?module', 'postcss-loader', 'sass-loader'],
        include: [resolve('src')],
        exclude: /node_modules/
      },
      {
        test: /\.js$/, use: [{
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            "presets": ["@babel/preset-env", "@babel/preset-react"],
            "plugins": [
              ["@babel/plugin-proposal-decorators", {"legacy": true}],
              ["@babel/plugin-proposal-class-properties", {"legacy": true}],
              ["@babel/plugin-syntax-dynamic-import"],
              ["@babel/plugin-transform-runtime"]
            ],
          }
        }],
        include: [resolve('src')],
        exclude: /node_modules/
      },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          name: "vendor",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
  ]
};