"use strict";

const express = require("express");
const morgan = require("morgan");

const { renderSSR } = require("./renderSSR");

const PORT = process.env.PORT || 9000;
const server = express();

server.use(morgan("dev"));

server.use("/**", async (req, res, next) => {
  if (/\.[a-z]+/.test(req.originalUrl)) {
    return res.sendStatus(404);
  }

  renderSSR({ url: req.originalUrl })
    .then((html) => {
      res.send(html);
    })
    .catch(next);
});

server.listen(PORT, () => {
  console.log("server listening on port ", PORT);
});
