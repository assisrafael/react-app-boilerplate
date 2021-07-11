import React from "react";
import { StaticRouter } from "react-router";

import { App } from "./App";

export default function SSR({ url, context }) {
  return (
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  );
}
