const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {resolve} = require("./util");
const argv = require("yargs").argv;

const __ENV__ = {
  prod: false,
  test: false,
  dev: false
};


if (argv.prod) {
  __ENV__.prod = true;
} else if (argv.test) {
  __ENV__.test = true;
} else {
  __ENV__.dev = true;
}

console.log("environment config", __ENV__);


module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: resolve("dist"),
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
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "img/[name].[hash:7].[ext]"
          }
        }],
        include: [resolve('src')],
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
      __ENV__
    }),
  ]
};
