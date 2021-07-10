import React from "react";
import { renderToString } from "react-dom/server.node";
import { App } from "./App";

export default function () {
  return renderToString(<App />);
}
