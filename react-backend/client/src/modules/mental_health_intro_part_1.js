import React from "react";
import "./Modules.css";

class MentalHealthIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      part1Class: "",
      part2Class: "",
      part3Class: ""
    };

    // this.change = this.change.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleSubmit3 = this.handleSubmit3.bind(this);
  }

  handleSubmit1(event) {
    event.preventDefault();
    this.setState({ part1Class: "hidden" });
    document.getElementById("part2").classList.remove("hidden");
  }

  handleSubmit2(event) {
    event.preventDefault();
    this.setState({ part2Class: "hidden" });
    document.getElementById("part3").classList.remove("hidden");
  }

  handleSubmit3(event) {
    event.preventDefault();
    this.setState({ part3Class: "hidden" });
    document.getElementById("finalMessage").classList.remove("hidden");

    fetch("/learn/updateModulesCompleted", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        module: { id: 1, name: "Mental Health Intro Part 1" }
      })
    });
  }

  render() {
    return (
      <div>
        <h2>This is the mental health module page</h2>

        <p>
          What do celebrities like Beyonce, Michael Phelps, and the Rock have in
          common? They've all worked incredibly hard, they've all reached the
          top of their field AND...they've all talked about the importance of
          menal health. But what is mental health? Before we talk more, write a
          little bit about what you think mental health means:
        </p>
        <form className={this.state.part1Class} onSubmit={this.handleSubmit1}>
          <input type="text" />
          <input id="firstInput" type="submit" value="Submit Part 1" />
        </form>

        <div id="part2" className="part2 hidden">
          <p>
            Thanks for sharing your thoughts. The truth is, there is no one
            definition of mental health. Generally, mental health refers to your
            emotional and social well-being. People who are mentally healthy
            can:
            <ul>
              <li>
                can deal with the everyday stresses of life in a healthy way
              </li>
              <li>can work productively toward their goals</li>
            </ul>
            Why is this important? Taking care of our mental health can make us
            better students, athletes, and performers. It helps us work faster,
            practice harder, and learn more effectively. It also helps us have
            better relationships with our family and friends.
            <li>
              Why do you think it's important to take care of mental health?
            </li>
          </p>

          <form
            id="secondInput"
            className={this.state.part2Class}
            onSubmit={this.handleSubmit2}
          >
            <input type="text" />
            <input type="submit" value="Submit Part 2" />
          </form>
        </div>

        <div id="part3" className="part3 hidden">
          <p>
            Just like there are things we can do to improve our physical health,
            there are also things we can do to improve our mental health. Some
            examples include:
            <ul>
              <li>Sleeping</li>
              <li>Meditating</li>
              <li>Talking with friends and family</li>
              <li>Exercise</li>
              <li>And many more</li>
            </ul>
            In these lessons, we'll explore some of hte many ways we can improve
            our mental health. Just like we can sometimes have physical health
            challenges--like a cold or an injury--we can also have mental health
            challenges. Some common mental health challenges include:
            <ul>
              <li>(Too much) stress</li>
              <li>Anxiety</li>
              <li>Depression</li>
              <li>Trouble Focusing</li>
            </ul>
            In these lessons, we'll learn more about these challenges and how we
            can best deal with them. The good news is, no matter what challenge
            you might be struggling with, you have the power to improve your
            health and wellbeing.
          </p>

          <form
            id="thirdInput"
            className={this.state.part3Class}
            onSubmit={this.handleSubmit3}
          >
            <input type="textarea" />
            <input type="submit" value="Submit Part 3" />
          </form>
        </div>
        <div>
          <h2 id="finalMessage" className="hidden">
            Congrats! You finished this module. Try one of the other modules
            below. Go back to the Quizzes page to select another module
          </h2>
        </div>
      </div>
    );
  }
}

export default MentalHealthIntro;
