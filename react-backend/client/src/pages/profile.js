import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      accountType: "none",
      modulesCompleted: [],
      pastSurveyData: []
    };
  }

  componentDidMount() {
    fetch("/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          username: data.username,
          pastSurveyData: data.data,
          modulesCompleted: data.modules
        });
      });
  }

  render() {
    return (
      <div>
        <h2>Profile Page {this.state.username}</h2>

        <h3>Modules Completed</h3>

        <div>
          {this.state.modulesCompleted.map((item, i) => (
            <li>{item.name}</li>
          ))}
        </div>
      </div>
    );
  }
}
export default Profile;
