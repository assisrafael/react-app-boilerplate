"use strict";

const { LAZY_LOAD } = require("../../config");
const {
  reloadAssetsLazy,
  reloadAssets,
  renderHtml,
  renderHtmlLazy,
} = require("./assets");

const bundle = {};

exports.renderSSR = async function renderSSR({ url }) {
  const context = {};

  console.log("renderSSR", { LAZY_LOAD });

  if (!bundle.SSR) {
    //initial load
    if (LAZY_LOAD) {
      await reloadAssetsLazy(bundle);
    } else {
      await reloadAssets(bundle);
    }
  }

  return {
    html: LAZY_LOAD
      ? renderHtmlLazy(bundle, { url, context })
      : renderHtml(bundle, { url, context }),
    context: context,
  };
};

exports.reloadAssets = () => reloadAssets(bundle);
