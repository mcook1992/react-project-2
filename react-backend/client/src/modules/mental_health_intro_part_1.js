import React from "react";

class MentalHealthIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      part1Completed: false,
      part2Completed: false,
      part3Completed: false
    };

    // this.change = this.change.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleSubmit3 = this.handleSubmit3.bind(this);
  }

  handleSubmit1(event) {
    event.preventDefault();
    this.setState({ part1Completed: true });
  }

  handleSubmit2(event) {
    event.preventDefault();
    this.setState({ part2Completed: true });
  }

  handleSubmit3(event) {
    event.preventDefault();
    this.setState({ part3Completed: true });

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

        <form>
          <input
            type="submit"
            value="Submit Part 1"
            onSubmit={this.handleSubmit1}
          />
        </form>

        <h3>This is part 2</h3>

        <form>
          <input type="submit" value="Submit Part 1" />
        </form>

        <h3> This is part 3</h3>

        <form onSubmit={this.handleSubmit3}>
          <input type="submit" value="Submit Part 1" />
        </form>
      </div>
    );
  }
}

export default MentalHealthIntro;
