import React from "react";

class makeANewModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleName: "Test",
      questionArray: [{ text: "blah blah blah", questionType: "PT" }],
      username: "No user currently",
      accountType: "No account type currently"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("/isAuthenticated", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // newModulesArray = [
        //   { label: "Mental Health", value: "Mental Health Introduction 1" },
        //   { label: "Mental Health", value: "Mental Health Introduction 2" },
        //   { label: "Mental Health", value: "Mental Health Introduction 3" }
        // ];
        this.setState({
          username: data.username,
          accountType: data.accountType
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log(this.state.moduleName, this.state.questionArray);
    fetch("/makeNewModule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        moduleName: this.state.moduleName,
        questionArray: this.state.questionArray
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.success);
      });
  }

  render() {
    return (
      <div>
        <h5>
          Write your own modules below. After each section is a small place for
          where students can engage/write their own answer. To add a section,
          click the "add section" button
        </h5>
        <div>
          <div>
            <h5>Enter the name of the module</h5>
            <textarea
              onChange={e => {
                this.setState({ moduleName: e.target.value });
                // console.log(this.state.moduleName);
              }}
            ></textarea>
          </div>
          {this.state.questionArray.map((item, i) => (
            <div>
              <p>
                Insert text here (after text, students will see an open text box
                that allows them to interact with content)
              </p>
              <textarea
                id={i}
                value={item.text}
                onChange={e => {
                  var testArray = this.state.questionArray;
                  testArray[i].text = e.target.value;
                  this.setState({
                    questionArray: testArray
                  });
                  // console.log(this.state.questionArray[i]);
                }}
              ></textarea>

              <button
                onClick={() => {
                  var newArray = this.state.questionArray;
                  newArray.push({ text: " ", questionType: "PT" });
                  this.setState({ questionArray: newArray });
                }}
              >
                Add section
              </button>
            </div>
          ))}

          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default makeANewModule;
