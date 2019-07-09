import React from "react";
import { Link } from "react-router-dom";

function NavTabs() {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>

        <li className="nav-item">
          <Link to="/learn">Learn</Link>
        </li>
        <li className="nav-item">
          <Link to="/quizzes/">Quizzes</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="nav-item">
          <Link to="/Classes">Classes</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavTabs;
