import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import SignOutButton from "./components/signOutButton";
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
import AssignmentPage from "./pages/AssignmentPage";
import UniqueModulePage from "./pages/uniqueModule";
import makeNewModule from "./pages/makeANewModule";

class App extends Component {
  state = {
    isAuthenticated: false,
    signOutbuttonClass: "hidden"
  };

  // componentDidMount() {
  //   fetch("/isAuthenticated")
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       if (data.isAuthenticated === true) {
  //         this.setState({ signOutbuttonClass: "" });
  //       } else {
  //         this.setState({ signOutbuttonClass: "hidden" });
  //       }
  //     });
  // }

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
            <Route exact path="/quizzes" component={Quizzes} />
            {/* <Route exact path="/loginForm" component={Login} /> */}
            <Route exact path="/Profile" component={Profile} />
            <Route exact path="/Classes" component={ClassPage} />
            <Route exact path="/learn/module1" component={MentalHealthIntro} />
            <Route exact path="/assignmentPage" component={AssignmentPage} />
            <Route
              exact
              path="/classes/:classname"
              component={singleClassPage}
            />
            <Route path="/studentProfile/" component={studentProfilePage} />
            <Route path="/uniqueModule/" component={UniqueModulePage} />
            <Route path="/makeNewModule/" component={makeNewModule} />

            {/* <Route exact path="/blog" component={Blog} />
            <Route path="/contact" component={Contact} /> */}
          </div>
        </Router>
        {/* a */}

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
