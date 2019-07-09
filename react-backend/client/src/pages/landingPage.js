import React from "react";
import LogIn from "./Login";
import SignUp from "./signUp";
import { Redirect } from "react-router";

class landingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signIn: true,
      signUp: false,
      isAuthenticated: false,
      username: ""
    };

    this.switchToLogIn = this.switchToLogIn.bind(this);
    this.switchToSignUp = this.switchToSignUp.bind(this);
  }

  componentDidMount() {
    fetch("/isAuthenticated")
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.isAuthenticated === true && data.username) {
          this.setState({
            isAuthenticated: data.isAuthenticated,
            username: data.username
          });
        } else {
          console.log("there's no user logged in!");
        }
      });
  }

  switchToSignUp() {
    this.setState({ signIn: false, signUp: true });
    console.log(this.state);
  }

  switchToLogIn() {
    this.setState({ signIn: true, signUp: false });
    console.log(this.state);
  }

  render() {
    if (this.state.isAuthenticated === true) {
      return (
        <Redirect
          to={{
            pathname: "/quizzes"
          }}
        />
      );
    } else if (this.state.signIn === true) {
      return (
        <div>
          <h2>Welcome! Please sign in</h2>
          <LogIn />
          <h5 className="secondHeading">Don't yet have an account?</h5>
          <button
            className="extra btn btn-primary"
            onClick={this.switchToSignUp}
          >
            Sign Up
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Welcome! Please sign up</h2>
          <SignUp />

          <h5 className="secondHeading">Already have an account?</h5>
          <button
            className="extra btn btn-primary"
            onClick={this.switchToLogIn}
          >
            LogIn
          </button>
        </div>
      );
      // } else {
      //   //   <div>
      //   <h1> Click the button below to signout</h1>;
      //   {
      //     /* <button>Sign Out</button>
      //   </div>; */
      //   }
    }
  }
}
export default landingPage;
