import React from "react";
import LogIn from "./Login";
import SignUp from "./signUp";

class landingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signIn: true,
      signUp: false
    };

    this.switchToLogIn = this.switchToLogIn.bind(this);
    this.switchToSignUp = this.switchToSignUp.bind(this);
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
    if (this.state.signIn === true) {
      return (
        <div>
          <h2>Welcome. Please sign in</h2>
          <LogIn />
          <button onClick={this.switchToSignUp}>Sign Up</button>
        </div>
      );
    } else if (this.state.signUp === true) {
      return (
        <div>
          <h2>Welcome! Please sign up</h2>
          <SignUp />
          <button onClick={this.switchToLogIn}>LogIn</button>
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
