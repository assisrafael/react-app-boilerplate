"use strict";

const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const { defaultJsRule, commonConfig } = require("./webpack.common.config");
const { CSR_PORT, SSR_PORT, LAZY_LOAD, isDevelopment } = require("../config");

if (isDevelopment) {
  //enable SSR with fast-refresh
  defaultJsRule.use.options.plugins.push(
    require.resolve("react-refresh/babel")
  );
  commonConfig.plugins.push(
    ...[
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
    ]
  );
}

module.exports = {
  ...commonConfig,
  name: "csr",
  target: "web",
  entry: {
    app: "./src/app/index.jsx",
  },
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    publicPath: `/dist/client/`,
    // clean: true,
  },
  devtool: false,
  devServer: {
    port: CSR_PORT,
    writeToDisk(filename) {
      //only loadable-stats.json need to be written to the disk
      return filename.endsWith("loadable-stats.json");
    },
    clientLogLevel: "debug",
    hot: true,
    index: "",
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: [
      {
        context: ["/**", "!.js"],
        target: `http://localhost:${SSR_PORT}`,
        logLevel: "debug",
      },
    ],
  },
  module: {
    rules: [defaultJsRule],
  },
  plugins: [
    ...commonConfig.plugins,
    !LAZY_LOAD &&
      new HtmlWebpackPlugin({
        template: "src/app/template.html",
      }),
  ].filter(Boolean),
};
