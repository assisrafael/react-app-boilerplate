import React, { useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";

export function App() {
  useEffect(() => {
    console.log("use efect");
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/about" exact>
          <AboutPage />
        </Route>
      </Switch>
    </>
  );
}
