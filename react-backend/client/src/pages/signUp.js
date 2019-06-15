import React from "react";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      accountType: "none"
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
      .then(data => console.log(data));
    //  .catch(err => console.log(err);
  }

  render() {
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
            <input
              type="text"
              name="accountType"
              onChange={this.handleAccountTypeChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SignUp;
