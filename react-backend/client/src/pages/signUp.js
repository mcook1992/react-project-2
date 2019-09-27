import React from "react";
import { Redirect } from "react-router";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      accountType: "Teacher",
      isAuthenticated: false
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAccountTypeChange = this.handleAccountTypeChange.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleAccountTypeChange(event) {
    this.setState({ accountType: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(
      "A username and password were submitted: " +
        this.state.username +
        " " +
        this.state.password
    );

    fetch("/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        accountType: this.state.accountType
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ isAuthenticated: data.authenticated });
      });
  }

  render() {
    if (this.state.isAuthenticated === false) {
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
                type="text"
                name="password"
                onChange={this.handlePasswordChange}
              />
            </label>
            <label>
              Account Type
              <select
                className="form-control quizSelect"
                onChange={this.handleAccountTypeChange}
              >
                <option value="Teacher">I am a teacher</option>
                <option value="Student">I am a student</option>
                <option value="Parent">I am a parent</option>
              </select>
            </label>
            <input className="btn btn-primary" type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/quizzes"
          }}
        />
      );
    }
  }
}

export default SignUp;
