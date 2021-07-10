const HtmlWebpackPlugin = require("html-webpack-plugin");

const jsRule = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
};
const resolveExtensions = [".js", ".jsx", ".json", ".wasm"];

module.exports = [
  {
    entry: {
      app: "./src/frontend/index.js",
    },
    target: "web",
    devtool: false,
    devServer: {
      port: 3000,
      writeToDisk: true,
      clientLogLevel: "debug",
      index: "",
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
    ],
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
    resolve: {
      extensions: resolveExtensions,
    },
  },
];
