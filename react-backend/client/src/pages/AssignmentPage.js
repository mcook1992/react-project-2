import React from "react";
import { Link } from "react-router-dom";

class AssignmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOfAssignment: "",
      classAssigned: "",
      studentsAssigned: "",
      userName: "",
      classArray: ["TestTeacher1-103"],
      moduleArray: [
        "Mental Health Introduction",
        "Dealing with Anxiety",
        "Stress busting"
      ]
    };

    this.createListOfClasses = this.createListOfClasses.bind(this);
    this.createListOfModules = this.createListOfModules.bind(this);
  }

  componentDidMount() {
    fetch("/isAuthenticated", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          username: data.username
        });
      });
  }

  createListOfModules() {
    let modules = [];
    for (let i = 0; i <= this.state.moduleArray.length; i++) {
      var moduleName = this.state.moduleArray[i];

      modules.push(
        <option key={i} value={moduleName}>
          {moduleName}
        </option>
      );
      //here I will be creating my options dynamically based on
      //what props are currently passed to the parent component
    }
    for (let i = 0; i <= this.state.classArray; i++) {
      var className = this.state.classArray[i];
      modules.push(
        <option key={i} value={className}>
          {className}
        </option>
      );
    }

    return modules;
  }

  createListOfClasses() {
    let classNameArray = [];
    for (let i = 0; i <= this.state.classArray; i++) {
      var className = this.state.classArray[i];
      classNameArray.push(
        <option key={i} value={className}>
          {className}
        </option>
      );
    }

    return classNameArray;
  }

  render() {
    return (
      <form>
        <label>
          Which module would you like to assign?
          <br></br>
          <br></br>
          <select name="moduleAssigned" value="test">
            {this.state.moduleArray.map((e, key) => {
              return (
                <option key={key} value={e}>
                  {e}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Which class would you like to assign it to?
          <br></br>
          <br></br>
          <select name="classAssigned" value="testing">
            {this.state.classArray.map((e, key) => {
              return (
                <option key={key} value={e}>
                  {e}
                </option>
              );
            })}
          </select>
        </label>
      </form>
    );
  }
}

export default AssignmentPage;
