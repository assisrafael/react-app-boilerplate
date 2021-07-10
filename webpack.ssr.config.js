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
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
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
};
