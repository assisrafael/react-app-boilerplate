"use strict";

const fs = require("fs/promises");
const path = require("path");

const htmlPath = path.join(__dirname, "../../dist/client/index.html");
const ssrPath = path.join(__dirname, "../../dist/server/ssr.js");

const bundle = {
  html: null,
  render: null,
};

exports.renderSSR = async function renderSSR({ url }) {
  const context = {};

  if (!bundle.render) {
    await reloadSSRBundle();
  }

  const { html, render } = bundle;

  const partialHtml = render({ url, context });

  return {
    html: html.replace('<div id="root">', `<div id="root">${partialHtml}`),
    context: context,
  };
};

exports.reloadSSRBundle = reloadSSRBundle;

async function reloadSSRBundle() {
  const html = (await fs.readFile(htmlPath)).toString();

  delete require.cache[require.resolve(ssrPath)];
  const render = require(ssrPath).default;

  bundle.html = html;
  bundle.render = render;
}
