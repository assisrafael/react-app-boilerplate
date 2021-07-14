import React, { useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

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
            <Link to="/company">Company</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/invalid-page">Invalid page</Link>
          </li>
        </ul>
      </nav>
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
    </>
  );
}

function NotFoundRoute() {
  return (
    <Status code={404}>
      <div>
        <h1>Sorry, can’t find that.</h1>
      </div>
    </Status>
  );
}

function RedirectWithStatusRoute({ from, to, status }) {
  return (
    <Status code={status}>
      <Redirect from={from} to={to} />;
    </Status>
  );
}
RedirectWithStatusRoute.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  status: PropTypes.number,
};

function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.status = code;
        return children;
      }}
    />
  );
}
Status.propTypes = {
  code: PropTypes.number,
  children: PropTypes.node,
};
