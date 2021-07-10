"use strict";

const { defaultJsRule, commonConfig } = require("./webpack.common.config");

module.exports = {
  ...commonConfig,
  entry: {
    ssr: "./src/app/index.ssr.js",
  },
  target: "node",
  devtool: false,
  output: {
    libraryTarget: "commonjs",
  },
  module: {
    rules: [defaultJsRule],
  },
};
