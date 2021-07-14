"use strict";

require("dotenv").config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.CSR_PORT = process.env.CSR_PORT || 3000;
process.env.SSR_PORT = process.env.SSR_PORT || 9000;

exports.isDevelopment = process.env.NODE_ENV !== "production";
exports.SSR_PORT = process.env.SSR_PORT;
exports.CSR_PORT = process.env.CSR_PORT;
