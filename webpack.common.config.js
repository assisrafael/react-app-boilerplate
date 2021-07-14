"use strict";

const { CompilerHooksWebpackPlugin } = require("./CompilerHooksWebpackPlugin");
const http = require("http");

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

function invalidateSSRCache() {
  setTimeout(() => {
    console.log("!! Invalidating SSR cache");
    const req = http.request(
      {
        hostname: "localhost",
        port: 9000,
        path: "/invalidate-ssr",
        method: "GET",
      },
      (res) => {
        if (res.statusCode !== 200) {
          console.log("!! SSR cache invalidation FAILED");
        }
      }
    );

    req.on("error", (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.end();
  }, 0);
}
