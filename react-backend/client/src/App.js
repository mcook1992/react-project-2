import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Learn from "./pages/learn";
import NavTabs from "./navTabs";
import Quizzes from "./pages/Quizzes";
import Login from "./pages/Login";
import Profile from "./pages/profile";
import MentalHealthIntro from "./modules/mental_health_intro_part_1";
import ClassPage from "./pages/classesPage";
import singleClassPage from "./pages/singleClassPage";
import studentProfilePage from "./pages/studentProfile";
import landingPage from "./pages/landingPage";

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
            <Route exact path="/" component={landingPage} />
            <Route exact path="/learn" component={Learn} />
            <Route exact path="/quizzes/:name" component={Quizzes} />
            {/* <Route exact path="/loginForm" component={Login} /> */}
            <Route exact path="/Profile" component={Profile} />
            <Route exact path="/Classes" component={ClassPage} />
            <Route exact path="/learn/module1" component={MentalHealthIntro} />
            <Route exact path="/classes/:name" component={singleClassPage} />
            <Route
              exact
              path="/studentProfile/:name"
              component={studentProfilePage}
            />

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
