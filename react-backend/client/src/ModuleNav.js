import React from "react";
import { Link } from "react-router-dom";

function ModuleNav() {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link to="/learn/module1">Module 1 </Link>
        </li>

        <li className="nav-item">
          <Link to="/learn/module2">Module 2</Link>
        </li>
        <li className="nav-item">
          <Link to="/learn/module3">module3</Link>
        </li>
      </ul>
    </div>
  );
}

export default ModuleNav;
