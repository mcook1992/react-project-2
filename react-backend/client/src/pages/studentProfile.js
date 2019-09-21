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
    const id = event.target;
    console.log(id);
  }

  componentDidMount() {
    fetch("/studentProfiles/" + this.state.studentName)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          modulesCompleted: data.modules,
          pastSurveyData: data.data
        });
      });
  }

  render() {
    return (
      <div>
        <h2>This is a student profile for {this.state.studentName}</h2>
        <div>
          {this.state.modulesCompleted.map((item, i) => (
            <li id={item} onClick={this.handleModuleClick}>
              <a href>{item}</a>
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
