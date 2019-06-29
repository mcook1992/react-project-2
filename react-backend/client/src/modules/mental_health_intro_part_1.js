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
        <h2>Introduction to Mental Health</h2>

        <p className="moduleText">
          What do celebrities like Beyonce, Michael Phelps, and the Rock have in
          common? They've all worked incredibly hard, they've all reached the
          top of their field AND...they've all talked about the importance of
          menal health. But what is mental health? Before we talk more, write a
          little bit about what you think mental health means:
        </p>
        <form className={this.state.part1Class} onSubmit={this.handleSubmit1}>
          <input type="text" />
          <input
            className="btn btn-primary"
            id="firstInput"
            type="submit"
            value="Submit Part 1"
          />
        </form>

        <div id="part2" className="part2 hidden">
          <p className="moduleText">Thanks for sharing your thoughts!</p>
          <img
            src="https://cdn4.vectorstock.com/i/1000x1000/42/73/mental-health-poster-of-brain-cartoon-with-glasses-vector-17784273.jpg"
            width="200"
            height="200"
          />

          <p className="moduleText">
            Generally, mental health refers to your mental, emotional and social
            well-being. People who are mentally healthy can:
            <ul>
              <li>
                <b>
                  can deal with the everyday stresses of life in a healthy way
                </b>
              </li>
              <li>
                <b>can work productively toward their goals</b>
              </li>
            </ul>
            Why do you think mental health might be important?
          </p>

          <form
            id="secondInput"
            className={this.state.part2Class}
            onSubmit={this.handleSubmit2}
          >
            <input type="text" />
            <input
              className="btn btn-primary"
              type="submit"
              value="Submit Part 2"
            />
          </form>
        </div>

        <div id="part3" className="part3 hidden">
          <p className="moduleText"> Thanks for your answer</p>

          <img
            src="http://lisaraffoul.ca/wp-content/uploads/2017/05/mental-health-physical-health.jpg"
            width="200"
            height="200"
          />

          <p className="moduleText">
            Staying mentally healthy helps us become better students, athletes,
            performers, and friends. In these lessons, we'll learn about ways to
            improve our mental health and also deal with mental health
            challenges.
            {/* Just like there are things we can do to improve our physical health,
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
            health and wellbeing. */}
            Please share any questions you have that you're hoping we'll answer
            in these lessons:
          </p>

          <form
            id="thirdInput"
            className={this.state.part3Class}
            onSubmit={this.handleSubmit3}
          >
            <input type="textarea" />
            <input
              className="btn btn-primary"
              type="submit"
              value="Submit Part 3"
            />
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
