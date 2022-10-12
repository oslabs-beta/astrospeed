const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, './astrospeed'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: [
          /node_modules\/(?!astrospeed).*/
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: [
          /node_modules\/(?!astrospeed).*/
        ]
      },
      { test: /\.svg$/, use: ["@svgr/webpack", "url-loader"] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: ({ htmlWebpackPlugin }) =>
        '<!DOCTYPE html><html><head><meta charset="utf-8"><title>astroSpeed Report</title><script src="results.js"></script></head><body><div id="app"></div></body></html>',
      filename: "index.html",
      chunks: 'bundle'
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  }
};

module.exports = config;
