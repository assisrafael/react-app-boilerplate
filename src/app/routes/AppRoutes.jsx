import React from "react";
import { Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";

import { NotFoundRoute } from "./NotFoundRoute";
import { RedirectWithStatusRoute } from "./RedirectWithStatusRoute";

const AboutPage = process.env.LAZY_LOAD
  ? loadable(() => import(/* webpackChunkName: "about" */ "../pages/AboutPage"))
  : require("../pages/AboutPage").default;
const HomePage = process.env.LAZY_LOAD
  ? loadable(() => import(/* webpackChunkName: "home" */ "../pages/HomePage"))
  : require("../pages/HomePage").default;

export function AppRoutes() {
  return (
    <Switch>
      <Route path="/about">
        <AboutPage />
      </Route>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <RedirectWithStatusRoute status={301} from="/company" to="/about" />
      <NotFoundRoute />
    </Switch>
  );
}
