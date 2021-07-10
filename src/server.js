const express = require("express");

const server = express();

server.use(require("morgan")("dev"));

server.use("/**", (req, res) => {
  const render = require("../dist/ssr").default;

  res.status(200).send(render());
});

const PORT = 9000;

server.listen(PORT, () => {
  console.log("server listening on port ", PORT);
});
