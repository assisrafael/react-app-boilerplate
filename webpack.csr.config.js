"use strict";

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const {
  isDevelopment,
  defaultJsRule,
  commonConfig,
} = require("./webpack.common.config");

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
  entry: {
    app: "./src/app/index.jsx",
  },
  target: "web",
  devtool: false,
  devServer: {
    port: 3000,
    writeToDisk: true,
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
        target: "http://localhost:9000",
        logLevel: "debug",
      },
    ],
  },
  module: {
    rules: [defaultJsRule],
  },
  plugins: [
    ...commonConfig.plugins,
    new HtmlWebpackPlugin({
      template: "src/app/template.html",
    }),
  ],
};
