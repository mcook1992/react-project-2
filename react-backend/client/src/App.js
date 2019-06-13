import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/signUp";
import Learn from "./pages/learn";
import NavTabs from "./navTabs";
import Quizzes from "./pages/Quizzes";

class App extends Component {
  state = { users: [] };

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
            <Route exact path="/" component={Login} />
            <Route exact path="/learn" component={Learn} />
            <Route exact path="/quizzes" component={Quizzes} />
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
