import React from "react";
import ModuleNav from "../ModuleNav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MentalHealthIntro from "../modules/mental_health_intro_part_1";

class Quizzes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      username: this.props.location.pathname.replace("/quizzes/", ""),
      // currentText: "",
      questionArray: [
        { label: "how stressed are you?", value: "", key: 1 },
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
          <h1>Welcome {this.state.username}</h1>

          <form onSubmit={this.handleSubmit}>
            {this.state.questionArray.map((item, i) => (
              <div>
                <p>{item.label}</p>
                <select accessKey={i} onChange={this.change}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            ))}
            <input type="submit" value="Submit" />
          </form>

          <ModuleNav />
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
