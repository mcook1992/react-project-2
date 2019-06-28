import React from "react";

class studentProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: this.props.location.pathname.replace("/studentProfile/", ""),
      modulesCompleted: [],
      pastSurveyData: []
    };
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
            <li>{item}</li>
          ))}
        </div>
      </div>
    );
  }
}
export default studentProfilePage;
