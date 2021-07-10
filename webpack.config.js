const HtmlWebpackPlugin = require("html-webpack-plugin");

const jsRule = {
  test: /\.m?js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
};

module.exports = [
  {
    entry: {
      app: "./src/frontend/index.js",
    },
    target: "web",
    devtool: false,
    module: {
      rules: [jsRule],
    },
    plugins: [new HtmlWebpackPlugin()],
  },
  {
    entry: {
      ssr: "./src/frontend/index.ssr.js",
    },
    target: "node",
    devtool: false,
    output: {
      libraryTarget: "commonjs",
    },
    module: {
      rules: [jsRule],
    },
  },
];
