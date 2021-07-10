import React from "react";
import { renderToString } from "react-dom/server.node";
import { StaticRouter } from "react-router";

import { App } from "./App";

export default function ({ url, context }) {
  return renderToString(
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  );
}
