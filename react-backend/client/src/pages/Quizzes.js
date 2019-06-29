import React from "react";
import ModuleNav from "../ModuleNav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MentalHealthIntro from "../modules/mental_health_intro_part_1";
import SignOutButton from "../components/signOutButton";

class Quizzes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      username: this.props.location.pathname.replace("/quizzes/", ""),
      // currentText: "",
      questionArray: [
        { label: "How stressed do you currently feel?", value: "", key: 1 },
        {
          label: "Do you feel like you have someone you can talk to?",
          value: "",
          key: 2
        },
        {
          label: "Do you feel like your teacher cares about",
          value: "",
          key: 3
        }
      ],
      currentQuizID: "test"
      // question2: { label: "", answer: "" },
      // question3: { label: "", answer: "" }
    };
    this.change = this.change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  change(event, id) {
    console.log(event.target.value);

    const newArray = this.state.questionArray;
    newArray[event.target.accessKey].value = event.target.value;

    this.setState({ questionArray: newArray });
    console.log(this.state.questionArray);
  }

  handleSubmit(event, id) {
    event.preventDefault();
    fetch("/quizzes/" + id + "/" + this.state.username, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        array: this.state.questionArray,
        id: this.state.currentQuizID,
        username: this.state.username
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ isComplete: true });
      });
  }

  render() {
    console.log(this.props.location);
    const name = this.props.location.pathname.replace("/quizzes/", "");
    console.log(name);

    if (this.state.isComplete == false) {
      return (
        <div>
          <SignOutButton className="btn btn-link pull-right" />
          <ModuleNav />
          <h1>Welcome {this.state.username}</h1>
          <h5 className="subheading">
            <i>
              Pleae answer a few quick questions below. Then get started by
              clicking a lesson on the left.
            </i>
          </h5>

          <form className="form-group" onSubmit={this.handleSubmit}>
            {this.state.questionArray.map((item, i) => (
              <div>
                <p>{item.label}</p>
                <select
                  className="form-control quizSelect"
                  accessKey={i}
                  onChange={this.change}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            ))}
            <input
              className="submit btn btn-primary"
              type="submit"
              value="Submit"
            />
          </form>

          {/* <Router>
            <div>
              <ModuleNav />
              <Route
                exact
                path="/learn/module1"
                component={MentalHealthIntro}
              />
              <Route
                exact
                path="/learn/module2"
                component={MentalHealthIntro}
              />
              <Route
                exact
                path="/learn/module3"
                component={MentalHealthIntro}
              />
            </div>
          </Router> */}
        </div>
      );
    } else {
      return (
        <div>
          <SignOutButton className="btn btn-link pull-right" />
          <ModuleNav />
          <h2>
            Thanks for submitting this quiz. Feel free to complete one of the
            quizzes on the side
          </h2>

          <Router>
            <div>
              <moduleNav />
              <Route
                exact
                path="/learn/module1"
                component={MentalHealthIntro}
              />
              <Route
                exact
                path="/learn/module2"
                component={MentalHealthIntro}
              />
              <Route
                exact
                path="/learn/module3"
                component={MentalHealthIntro}
              />
            </div>
          </Router>
        </div>
      );
    }
  }
}

export default Quizzes;
