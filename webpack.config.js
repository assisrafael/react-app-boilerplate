module.exports = {
  entry: {
    ssr: "./src/app.js",
  },
  target: "node",
  output: {
    libraryTarget: "commonjs",
  },
};
