import React from "react";

class Quizzes extends React.Component {
  state = {
    isComplete: false
  };

  render() {
    return (
      <div>
        <form>
          <p>How happy are you?</p>
          <select>
            <option value="1">1</option>
            <option value="2">Saab</option>
            <option value="3">Opel</option>
            <option value="4">Audi</option>
          </select>
        </form>
      </div>
    );
  }
}

export default Quizzes;
