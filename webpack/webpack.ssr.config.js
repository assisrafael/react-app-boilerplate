"use strict";

const path = require("path");

const nodeExternals = require("webpack-node-externals");

const { defaultJsRule, commonConfig } = require("./webpack.common.config");

module.exports = {
  ...commonConfig,
  name: "ssr",
  entry: {
    ssr: "./src/app/index.ssr.jsx",
  },
  target: "node",
  devtool: false,
  output: {
    libraryTarget: "commonjs2",
    globalObject: "global",
    path: path.resolve(__dirname, "../dist/server"),
    publicPath: `/dist/server/`,
  },
  externals: ["@loadable/component", nodeExternals()],
  module: {
    rules: [defaultJsRule],
  },
};
