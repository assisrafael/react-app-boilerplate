"use strict";

const path = require("path");

const nodeExternals = require("webpack-node-externals");
const { LAZY_LOAD } = require("../config");

const { defaultJsRule, commonConfig } = require("./webpack.common.config");

module.exports = {
  ...commonConfig,
  name: "ssr",
  target: "node",
  entry: {
    ssr: "./src/app/index.ssr.jsx",
  },
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    publicPath: `/dist/server/`,
    libraryTarget: "commonjs2",
    globalObject: "global",
    // clean: true,
  },
  devtool: false,
  externals: [LAZY_LOAD && "@loadable/component", nodeExternals()].filter(
    Boolean
  ),
  module: {
    rules: [defaultJsRule],
  },
};
