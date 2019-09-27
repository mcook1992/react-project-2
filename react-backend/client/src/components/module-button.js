import React from "react";

class ModuleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClassName: "inactive module-button",
      textClassName: "hidden module-answer-text"
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState() {
    if (this.state.buttonClassName == "inactive module-button") {
      this.setState({
        buttonClassName: "active module-button",
        textClassName: "module-answer-text"
      });
    } else {
      this.setState({
        buttonClassName: "inactive module-button",
        textClassName: "hidden module-answer-text"
      });
    }
  }

  render() {
    return (
      <div>
        <button
          className={this.state.buttonClassName}
          onClick={this.changeState}
        >
          {this.props.buttonName}
        </button>

        <div className={this.state.textClassName}>
          {this.props.item.moduleAnswers.map((element, e) => (
            <p>
              {element.question}

              <br></br>

              {element.answer}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default ModuleButton;
