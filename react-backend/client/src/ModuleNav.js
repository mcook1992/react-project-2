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
        <li className="nav-item">
          <Link
            to={{
              pathname: "/uniqueModule",
              state: {
                name: "Test Unique Module",
                array: [
                  {
                    questionType: "PT",
                    text: "First sample test question about mental health"
                  },
                  {
                    questionType: "PT",
                    text: "Second sample test question about mental health"
                  },
                  {
                    questionType: "PT",
                    text: "Third sample test question about mental health"
                  }
                ],
                teacher: "testTeacher1"
              }
            }}
          >
            Test Unique Module
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ModuleNav;
