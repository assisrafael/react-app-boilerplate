import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { loadableReady } from "@loadable/component";

import { App } from "./App";

function render() {
  hydrate(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

if (process.env.LAZY_LOAD) {
  loadableReady(() => render());
} else {
  render();
}
