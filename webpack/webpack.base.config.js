const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {detectEnv} = require("./util/detectEnv");
const {resolvePath} = require("./util/resolvePath");

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: resolvePath("dist"),
    filename: '[name].js',
    chunkFilename: "[name].[hash].js",
  },
  resolve: {
    extensions: [
      '.js', ".scss", ".css"
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader?module', 'postcss-loader'],
        // include: [resolve('src')], //限制范围，提高打包速度
        // exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader?module', 'postcss-loader', 'sass-loader'],
        include: [resolvePath('src')],
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
        include: [resolvePath('src')],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "img/[name].[hash:7].[ext]"
          }
        }],
        include: [resolvePath('src')],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].[hash:7].css"
    }),
    new webpack.DefinePlugin({
      __ENV__: detectEnv()
    })
  ]
};
