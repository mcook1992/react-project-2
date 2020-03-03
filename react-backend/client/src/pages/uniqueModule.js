import React from "react";

class UniqueModulePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleName: this.props.location.state.name,
      questionArray: this.props.location.state.array,
      teacherName: this.props.location.state.teacher,
      //keep track of answers to the form
      answerArray: []
    };
  }

  render() {
    return (
      <div>
        <h1>
          This is a unique module page for students of {this.state.teacherName}
        </h1>
        <div>
          <form>
            {this.state.questionArray.map((item, i) => {
              if (item.questionType != "MC") {
                return (
                  <div>
                    <p>{item.text}</p>
                    <textarea
                      id={i}
                      onChange={e => {
                        var testArray = this.state.answerArray;
                        testArray[{ i }] = e.target.value;
                        console.log(this.state.answerArray[i]);
                        this.setState({ answerArray: testArray });
                      }}
                    ></textarea>
                  </div>
                );
              }
            })}

            <button>Submit! (JK)</button>
          </form>
        </div>
      </div>
    );
  }
}

export default UniqueModulePage;
