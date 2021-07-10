import React, { useEffect } from "react";

export function App() {
  useEffect(() => {
    console.log("use efect");
  }, []);

  return <div>Hello World from SSR and react</div>;
}
