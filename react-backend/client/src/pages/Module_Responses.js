import React from "react";

class moduleAnswers extends React.Component {
  constructor(props) {
    this.state = {
      studentName: "TestSTudent3",
      moduleName: "Module1"
    };
  }

  compnentDidMount() {
      fetch("/studentModuleData/" + this.state.moduleName).then(res=> res.json())
  }
}
