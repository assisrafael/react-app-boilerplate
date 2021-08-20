"use strict";

const { LAZY_LOAD } = require("../../config");
const { LazyLoadRenderer, SingleEntryRenderer } = require("./assets");

const renderer = LAZY_LOAD ? new LazyLoadRenderer() : new SingleEntryRenderer();

exports.renderSSR = async function renderSSR({ url }) {
  const context = {};

  if (!renderer.isLoaded()) {
    //initial load
    renderer.loadAssets();
  }

  return {
    html: renderer.renderStaticHtml({ url, context }),
    context: context,
  };
};

exports.reloadAssets = () => {
  renderer.clearAssetsCache();
};
