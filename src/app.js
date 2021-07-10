import React from "react";
import { renderToString } from "react-dom/server.node";

function App() {
  return <div>Hello World from SSR and react</div>;
}

export default function () {
  return renderToString(<App />);
}
