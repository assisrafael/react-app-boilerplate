import React from "react";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
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
  );
}
