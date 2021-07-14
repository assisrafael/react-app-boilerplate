"use strict";

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
      plugins: [],
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
    new CompilerHooksWebpackPlugin({
      done() {
        invalidateSSRCache();
      },
    }),
  ],
};
