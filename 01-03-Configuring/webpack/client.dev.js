const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  // REQUIRED: webpackHotServerMiddleware is expecting two webpack configs,
  // one with a name 'client', one with a name 'server'.
  name: "client",
  // Target browsers for our client config
  target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader"
        ]
      }
    ]
  },
  devtool: "eval",
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    // REQUIRED: file and chunk names should match
    filename: "[name].js",
    chunkFilename: "[name].js",
    // REQUIRED: where to write files to
    path: path.resolve(__dirname, "../buildClient"),
    // REQUIRED: where files will be served from
    publicPath: "/static/"
  },
  plugins: [
    // REQUIRED: We have to initialize our ExtractCssChunks plugin
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  optimization: {
    splitChunks: {
      name: "bootstrap",
      filename: "[name].js",
      minChunks: Infinity
    }
  }
};
