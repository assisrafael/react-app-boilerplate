"use strict";

const http = require("http");

const { SSR_PORT } = require("../config");

exports.invalidateSSRCache = function invalidateSSRCache() {
  setTimeout(() => {
    console.log("!! Invalidating SSR cache");
    const req = http.request(
      {
        hostname: "localhost",
        port: SSR_PORT,
        path: "/api/ssr/invalidate",
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
};
