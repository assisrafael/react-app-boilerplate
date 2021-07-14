import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { RouteWithStatus } from "./RouteWithStatus";

export function RedirectWithStatusRoute({ from, to, status }) {
  return (
    <RouteWithStatus code={status}>
      <Redirect from={from} to={to} />;
    </RouteWithStatus>
  );
}

RedirectWithStatusRoute.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  status: PropTypes.number,
};
