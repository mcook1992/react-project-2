import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class SignOutButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedOut: false
    };

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    fetch("/signOut")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.props.history.push("/");
      });
  }
  render() {
    return (
      <button className="pull-right btn btn-link" onClick={this.signOut}>
        Sign Out
      </button>
    );
  }
}

export default SignOutButton;
