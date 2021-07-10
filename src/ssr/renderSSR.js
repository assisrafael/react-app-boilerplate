"use strict";

const fs = require("fs/promises");
const path = require("path");

const htmlPath = path.join(__dirname, "../../dist/index.html");
const ssrPath = path.join(__dirname, "../../dist/ssr.js");

exports.renderSSR = async function renderSSR() {
  const html = (await fs.readFile(htmlPath)).toString();

  const render = requireFreshRender(ssrPath);
  const partialHtml = render();

  return html.replace('<div id="root">', `<div id="root">${partialHtml}`);
};

function requireFreshRender(filepath) {
  delete require.cache[require.resolve(filepath)];
  return require(filepath).default;
}
