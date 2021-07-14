"use strict";

const express = require("express");
const morgan = require("morgan");
const { SSR_PORT } = require("../../config");

const { renderSSR, reloadSSRBundle } = require("./renderSSR");

const server = express();

server.use(morgan("dev"));

server.use("/api/ssr/invalidate", (req, res) => {
  reloadSSRBundle();
  res.sendStatus(200);
});

server.use("/**", async (req, res, next) => {
  if (/\.[a-z]+/.test(req.originalUrl)) {
    return res.sendStatus(404);
  }

  renderSSR({ url: req.originalUrl })
    .then(({ html, context }) => {
      if (context.url) {
        res.writeHead(301, {
          Location: context.url,
        });
      } else {
        res.set("Content-Type", "text/html");
        res.write(html);
      }
      res.end();
    })
    .catch(next);
});

server.listen(SSR_PORT, () => {
  console.log("server listening on port ", SSR_PORT);
});
