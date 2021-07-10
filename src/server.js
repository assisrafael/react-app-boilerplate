const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const server = express();

server.use(require("morgan")("dev"));

server.use("/**", async (req, res) => {
  if (/\.js/.test(req.originalUrl)) {
    return res.sendFile(path.join(__dirname, `../dist/${req.originalUrl}`));
  }

  const html = (await fs.readFile("dist/index.html")).toString();
  const render = require("../dist/ssr").default;

  res.send(html.replace("<body>", `<body><div id="root">${render()}</div>`));
});

const PORT = 9000;

server.listen(PORT, () => {
  console.log("server listening on port ", PORT);
});
