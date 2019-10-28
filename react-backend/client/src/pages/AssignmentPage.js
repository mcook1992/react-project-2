import React from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import CoolSelectList from "../pages/newerTestMultiListComponent";
// import MyComponent from "../pages/newMenuTestPage";

// import { CoolSelectList } from "./newerTestMultiListComponent";

import { Welcome } from "./testExportClass";
import CoolSelectList from "./newerTestMultiListComponent";

const newModulesArray = [];

class AssignmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOfAssignment: "",
      otherModulesSelected: [],
      moduleSelected: [],
      classAssigned: "TestTeacher1-103",
      studentsAssigned: "",
      userName: "",
      classArray: ["TestTeacher1-103"],
      moduleArray: []
    };

    this.changeClassSelected = this.changeClassSelected.bind(this);
    this.changeModuleSelected = this.changeModuleSelected.bind(this);
    this.changeModulesSelected = this.changeModulesSelected.bind(this);
    this.createAssignment = this.createAssignment.bind(this);
    this.addNewModule = this.addNewModule.bind(this);
  }

  componentDidMount() {
    fetch("/isAuthenticated", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        newModulesArray = [
          { label: "Mental Health", value: "Mental Health Introduction 1" },
          { label: "Mental Health", value: "Mental Health Introduction 2" },
          { label: "Mental Health", value: "Mental Health Introduction 3" }
        ];
        this.setState({
          username: data.username
        });
      });
  }

  changeModuleSelected(e) {
    console.log("We're logging something when things change");
    console.log(e.target.value);
    this.setState({
      moduleSelected: e.target.value
    });
  }

  changeModulesSelected(options) {
    console.log("We're logging something when things change");
    console.log(options);
    this.setState({
      moduleSelected: options
    });
  }

  changeClassSelected(e) {
    console.log(e.target.value);
    this.setState({
      classAssigned: e.target.value
    });
    console.log(this.state);
  }

  addNewModule(e) {
    console.log("the value is " + e.target.value);
    var newArray = this.state.otherModulesSelected;
    newArray.push(e.target.value);
    this.setState({
      otherModulesSelected: newArray
    });
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
    function changeModuleSelected(e) {
      console.log("We're logging something when things change");
      console.log(e.target.value);
      // this.setState({
      //   moduleSelected: e.target.value
      // });
    }
    const moduleOptions = [
      { label: "Mental Health 1", value: "Mental Health Introduction 1" },
      { label: "Mental Health 2", value: "Mental Health Introduction 2" },
      { label: "Mental Health 3", value: "Mental Health Introduction 3" }
    ];

    const SelectOption = this.state.moduleSelected;

    return (
      <form onSubmit={this.createAssignment}>
        {/* <MyComponent /> */}
        <CoolSelectList
          // name="ModulesSelected"
          name="ModuleSelector"
          placeholder="Select a module"
          options={moduleOptions}
          value={SelectOption}
          onChange={this.changeModulesSelected}
        />

        <label>
          Which mMdule would you like to assign?
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
        {/* <label for="one">
          <input type="checkbox" id="one" />
          First checkbox
        </label> */}

        <label>
          Which modules would you like to assign?
          <br></br>
          <br></br>
        </label>

        {/* <CoolSelectList options={this.state.moduleArray} /> */}

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
