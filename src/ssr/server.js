"use strict";

const express = require("express");
const morgan = require("morgan");

const { renderSSR, reloadSSRBundle } = require("./renderSSR");

const PORT = process.env.PORT || 9000;
const server = express();

server.use(morgan("dev"));

server.use("/invalidate-ssr", (req, res) => {
  reloadSSRBundle();
  res.sendStatus(200);
});

server.use("/**", async (req, res, next) => {
  if (/\.[a-z]+/.test(req.originalUrl)) {
    return res.sendStatus(404);
  }

  const label = "SSR";
  console.time(label);
  renderSSR({ url: req.originalUrl })
    .then(({ html, context }) => {
      console.timeEnd(label);
      if (context.url) {
        res.writeHead(301, {
          Location: context.url,
        });
        res.end();
      } else {
        res.set("content-type", "text/html");
        res.write(html);
        res.end();
      }
    })
    .catch(next);
});

server.listen(PORT, () => {
  console.log("server listening on port ", PORT);
});
