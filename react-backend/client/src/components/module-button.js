import React from "react";

class ModuleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  click() {
    this.setState({ active: true });
  }

  render() {
    if (this.state.active == false) {
      return (
        <button className="hidden" onClick={this.click.bind(this)}></button>
      );
    } else {
      return <button onClick={this.click.bind(this)}></button>;
    }
  }
}

export default ModuleButton;
