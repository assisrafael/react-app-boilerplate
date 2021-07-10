const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const server = express();

server.use(require("morgan")("dev"));

server.use("/**", async (req, res) => {
  if (/\.[a-z]+/.test(req.originalUrl)) {
    return res.sendStatus(404);
  }

  const html = (await fs.readFile("dist/index.html")).toString();
  const partialHtml = renderSSR();

  res.send(html.replace('<div id="root">', `<div id="root">${partialHtml}`));
});

function renderSSR() {
  let partialHtml = "";

  try {
    delete require.cache[require.resolve("../dist/ssr")];
    const render = require("../dist/ssr.js").default;
    partialHtml = render();
  } catch (e) {
    console.log(e);
  }

  return partialHtml;
}

const PORT = 9000;

server.listen(PORT, () => {
  console.log("server listening on port ", PORT);
});
