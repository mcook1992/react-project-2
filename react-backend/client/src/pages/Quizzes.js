import React from "react";

class Quizzes extends React.Component {
  state = {
    isComplete: false,
    username: "Test Student"
  };

  render() {
    console.log(this.props.location);
    const name = this.props.location.pathname.replace("/quizzes/", "");
    console.log(name);

    return (
      <div>
        <h1>Welcome {name}</h1>

        <form>
          <p>How happy are you?</p>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <p>How stressed are you?</p>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <p>
            Do you feel like you have someone who would listen to your problems?
          </p>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Quizzes;
