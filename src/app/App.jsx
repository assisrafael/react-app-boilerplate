import React, { useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import loadable from "@loadable/component";

const AboutPage = loadable(() =>
  import(/* webpackChunkName: "about" */ "./pages/AboutPage")
);
const HomePage = loadable(() =>
  import(/* webpackChunkName: "home" */ "./pages/HomePage")
);

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
        <RedirectWithStatus status={301} from="/company" to="/about" />
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function NotFound() {
  return (
    <Status code={404}>
      <div>
        <h1>Sorry, can’t find that.</h1>
      </div>
    </Status>
  );
}

function RedirectWithStatus({ from, to, status }) {
  return (
    <Status code={status}>
      <Redirect from={from} to={to} />;
    </Status>
  );
}

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
