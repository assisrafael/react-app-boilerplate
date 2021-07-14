import React, { useEffect } from "react";

import { Navigation } from "./components/Navigation";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
  useEffect(() => {
    console.log("use efect");
  }, []);

  return (
    <>
      <Navigation />
      <AppRoutes />
    </>
  );
}
