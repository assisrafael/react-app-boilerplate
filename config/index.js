"use strict";

require("dotenv").config();

process.env.NODE_ENV = process.env.NODE_ENV ?? "development";
process.env.CSR_PORT = process.env.CSR_PORT ?? 3000;
process.env.SSR_PORT = process.env.SSR_PORT ?? 9000;
process.env.LAZY_LOAD = process.env.LAZY_LOAD ?? false;

exports.isDevelopment = process.env.NODE_ENV !== "production";
exports.SSR_PORT = process.env.SSR_PORT;
exports.CSR_PORT = process.env.CSR_PORT;
exports.LAZY_LOAD = process.env.LAZY_LOAD.toLowerCase() === "true";
