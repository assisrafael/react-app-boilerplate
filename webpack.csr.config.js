const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";
const resolveExtensions = [".js", ".jsx", ".json", ".wasm"];

const jsRule = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      plugins: [
        // ... other plugins
        isDevelopment && require.resolve("react-refresh/babel"),
      ].filter(Boolean),
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
};

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: {
    app: "./src/frontend/index.js",
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
    rules: [jsRule],
  },
  resolve: {
    extensions: resolveExtensions,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "My App",
      template: "src/frontend/template.html",
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
