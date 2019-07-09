import React from "react";
// import { withRouter } from "react-router-dom";
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
    console.log("Sign out pressed");
    fetch("/signOut", { credentials: "same-origin" })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // document.location("/");
        // this.props.history.push("/");
      });
  }
  render() {
    return (
      <Link to="/" className="pull-right btn btn-link" onClick={this.signOut}>
        Sign Out
      </Link>
    );
  }
}

export default SignOutButton;
