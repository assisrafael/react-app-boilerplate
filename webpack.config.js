module.exports = {
  entry: {
    ssr: "./src/app.js",
  },
  target: "node",
  output: {
    libraryTarget: "commonjs",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
