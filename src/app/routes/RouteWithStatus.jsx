import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

export function RouteWithStatus({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.status = code;
        return children;
      }}
    />
  );
}

RouteWithStatus.propTypes = {
  code: PropTypes.number,
  children: PropTypes.node,
};
