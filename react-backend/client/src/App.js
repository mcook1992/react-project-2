import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/signUp";
import Learn from "./pages/learn";
import NavTabs from "./navTabs";
import Quizzes from "./pages/Quizzes";
import Login from "./pages/Login";
import TestPage from "./pages/protectedPage";

class App extends Component {
  state = { username: "TestUser3" };

  // componentDidMount() {
  //   fetch("/users")
  //     .then(res => res.json())
  //     .then(users => this.setState({ users }));
  // }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavTabs />
            <Route exact path="/" component={SignUp} />
            <Route exact path="/learn" component={Learn} />
            <Route exact path="/quizzes/:name" component={Quizzes} />
            <Route exact path="/loginForm" component={Login} />
            {/* <Route exact path="/blog" component={Blog} />
            <Route path="/contact" component={Contact} /> */}
          </div>
        </Router>

        {/* /* <h1>Users</h1>
        {this.state.users.map(user => (
          <div key={user.id}>{user.username}</div>
        ))}
        // <Login /> */}
      </div>
    );
  }
}

export default App;
