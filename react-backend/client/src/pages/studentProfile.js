import React from "react";

class studentProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: this.props.location.pathname.replace("/studentProfile/", ""),
      modulesCompleted: [],
      pastSurveyData: []
    };

    this.handleModuleClick = this.handleModuleClick.bind(this);
  }

  handleModuleClick(event) {
    event.preventDefault();
    // console.log("button clicked!");
    const id = event.target;
    const access = event.target.parentElement.id;
    const name = event.target.name;
    var activated = event.target.parentElement.className;
    console.log("The element is current " + activated);

    var questionArray = [];
    var answerArray = [];
    var textDispalyArray = "";
    var newElementArray = [];
    console.log(id);
    console.log(access);
    fetch("/studentProfiles/" + this.state.studentName)
      .then(res => res.json())
      .then(data => {
        var newElem = document.getElementsByClassName(access);
        if (activated == "not-activated") {
          console.log(data);
          data.modules[access].moduleAnswers.forEach(elem => {
            questionArray.push(elem.question);
            answerArray.push(elem.answer);
          });

          for (var i = 0; i < questionArray.length - 1; i++) {
            var brandNewElement = document.createElement("P");
            var brandNewQuestionElement = document.createElement("P");
            brandNewQuestionElement.textContent = questionArray[i];
            var brandNewAnswerElement = document.createElement("P");
            brandNewAnswerElement.textContent = answerArray[i];
            brandNewElement.appendChild(brandNewQuestionElement);
            brandNewElement.appendChild(brandNewAnswerElement);
            newElem[0].appendChild(brandNewElement);
          }

          console.log(questionArray[0] + " " + answerArray[0]);

          console.log(newElem);

          // newElem[0].innerText = "haha ha got it!";
          // document.getElementsByClassName(access).text = "hahaha got it!";
        } else {
        }
      });
  }

  componentDidMount() {
    fetch("/studentProfiles/" + this.state.studentName)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        var tempArray = [];
        data.modules.forEach(element => {
          tempArray.push(element.name);
        });
        this.setState({
          modulesCompleted: tempArray,
          pastSurveyData: data.data
        });
        console.log("Modules completed are " + this.state.modulesCompleted);
      });
  }

  render() {
    return (
      <div>
        <h2>This is a student x profile for {this.state.studentName}</h2>
        <div>
          {this.state.modulesCompleted.map((item, i) => (
            <li
              name={item}
              id={i}
              accessKey={i}
              onClick={this.handleModuleClick}
              className="not-activated"
            >
              <a href>{item}</a>
              <p className={i}></p>
            </li>
          ))}
        </div>
        <div>
          <h2>This is past stress data</h2>
          <div>
            {this.state.pastSurveyData.map((item, i) => (
              <p>{item.quizQuestions[0].value}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default studentProfilePage;
