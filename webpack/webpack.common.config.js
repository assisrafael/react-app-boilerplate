"use strict";

/*
 * Right now using https://github.com/gregberge/loadable-components/pull/778
 * FIXME: after new release updated package.json
 */
const LoadablePlugin = require("@loadable/webpack-plugin");

const { CompilerHooksWebpackPlugin } = require("./CompilerHooksWebpackPlugin");
const { invalidateSSRCache } = require("./invalidateSSRCache");

const isDevelopment = process.env.NODE_ENV !== "production";
const resolveExtensions = [".js", ".jsx", ".json", ".wasm"];

exports.isDevelopment = isDevelopment;

exports.defaultJsRule = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      plugins: ["@loadable/babel-plugin"],
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
};

exports.commonConfig = {
  mode: isDevelopment ? "development" : "production",
  resolve: {
    extensions: resolveExtensions,
  },
  plugins: [
    new LoadablePlugin(),
    new CompilerHooksWebpackPlugin({
      done() {
        invalidateSSRCache();
      },
    }),
  ],
};
