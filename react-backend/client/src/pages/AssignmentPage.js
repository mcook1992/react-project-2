import React from "react";
import { Link } from "react-router-dom";

class AssignmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOfAssignment: "",
      moduleSelected: "",
      classAssigned: "TestTeacher1-103",
      studentsAssigned: "",
      userName: "",
      classArray: ["TestTeacher1-103"],
      moduleArray: [
        "",
        "Mental Health Introduction",
        "Dealing with Anxiety",
        "Stress busting"
      ]
    };

    this.changeClassSelected = this.changeClassSelected.bind(this);
    this.changeModuleSelected = this.changeModuleSelected.bind(this);
    this.createAssignment = this.createAssignment.bind(this);
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

  changeModuleSelected(e) {
    console.log(e.target.value);
    this.setState({
      moduleSelected: e.target.value
    });
  }

  changeClassSelected(e) {
    console.log(e.target.value);
    this.setState({
      classAssigned: e.target.value
    });
    console.log(this.state);
  }

  createAssignment(event) {
    event.preventDefault();
    if (this.state.moduleSelected && this.state.classAssigned) {
      fetch("/createAssignment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classAssigned: this.state.classAssigned,
          moduleAssigned: this.state.moduleSelected,
          username: this.state.userName
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        });
    } else {
      console.log("No request made");
    }
  }

  render() {
    return (
      <form onSubmit={this.createAssignment}>
        <label>
          Which module would you like to assign?
          <br></br>
          <br></br>
          <select
            name="moduleAssigned"
            value={this.state.moduleSelected}
            onChange={this.changeModuleSelected}
          >
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
          <select
            name="classAssigned"
            value={this.state.classAssigned}
            onChange={this.changeClassSelected}
          >
            {this.state.classArray.map((e, key) => {
              return (
                <option key={key} value={e}>
                  {e}
                </option>
              );
            })}
          </select>
        </label>
        <input
          className="submit btn btn-primary"
          type="submit"
          value="Create Assignment!"
        />
      </form>
    );
  }
}

export default AssignmentPage;

// createListOfModules() {
//   let modules = [];
//   for (let i = 0; i <= this.state.moduleArray.length; i++) {
//     var moduleName = this.state.moduleArray[i];

//     modules.push(
//       <option key={i} value={moduleName}>
//         {moduleName}
//       </option>
//     );
//     //here I will be creating my options dynamically based on
//     //what props are currently passed to the parent component
//   }
//   for (let i = 0; i <= this.state.classArray; i++) {
//     var className = this.state.classArray[i];
//     modules.push(
//       <option key={i} value={className}>
//         {className}
//       </option>
//     );
//   }

//   return modules;
// }

// createListOfClasses() {
//   let classNameArray = [];
//   for (let i = 0; i <= this.state.classArray; i++) {
//     var className = this.state.classArray[i];
//     classNameArray.push(
//       <option key={i} value={className}>
//         {className}
//       </option>
//     );
//   }