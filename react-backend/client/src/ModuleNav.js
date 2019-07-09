import React from "react";
import { Link } from "react-router-dom";

function ModuleNav() {
  return (
    <div className="sidebar-header pull-left moduleNav">
      <ul className="list-unstyled components">
        <h4 className="list-group-item-heading">Lessons</h4>
        <li className="nav-item">
          <Link to="/learn/module1">Mental Health Introduction Part 1 </Link>
        </li>

        <li className="nav-item">
          <Link to="/learn/module2">Dealing with stress</Link>
        </li>
        <li className="nav-item">
          <Link to="/learn/module3">What is anxiety?</Link>
        </li>
      </ul>
    </div>
  );
}

export default ModuleNav;
