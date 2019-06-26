import React from "react";

class ClassButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: "",
      currentClasses: []
    };

    // this.handleUsernameChange = this.handleUsernameChange.bind(this);
    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleAccountTypeChange = this.handleAccountTypeChange.bind(this);
  }

  render() {
    return <button>Classes</button>;
  }
}

export default ClassButton;
