import React from "react";
import { Redirect } from "react-router";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isAuthenticated: false,
      logIn: true,
      signUp: false,
      signOut: false
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(
      "A username and password were submitted: " +
        this.state.username +
        " " +
        this.state.password
    );

    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.authenticated);
        this.setState({ isAuthenticated: data.authenticated });
      });
    //  .catch(err => console.log(err);
  }

  render() {
    if (this.state.isAuthenticated === true) {
      const name = this.state.username;
      return (
        <Redirect
          to={{
            pathname: "/quizzes/" + name
          }}
        />
      );
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                onChange={this.handleUsernameChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                onChange={this.handlePasswordChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>

          {/* <button>Sign Up</button> */}
        </div>
      );
    }
  }
}

export default LogIn;
