"use strict";

const { validate } = require("schema-utils");

const pluginSchema = {
  type: "object",
  properties: {
    afterEmit: {
      instanceof: "Function",
    },
    done: {
      instanceof: "Function",
    },
  },
  additionalProperties: false,
};

exports.CompilerHooksWebpackPlugin = class CompilerHooksWebpackPlugin {
  constructor(options) {
    validate(pluginSchema, options, {
      name: "CompilerHooksWebpackPlugin",
    });
    this.options = options;
  }

  apply(compiler) {
    if (this.options.afterEmit) {
      compiler.hooks.afterEmit.tap("CompilerHooksWebpackPlugin", () => {
        this.options.afterEmit();
      });
    }

    if (this.options.done) {
      compiler.hooks.done.tap("CompilerHooksWebpackPlugin", () => {
        this.options.done();
      });
    }
  }
};
