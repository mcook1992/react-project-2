import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      accountType: "none",
      modulesCompleted: [],
      pastSurveyData: [],
      stressLevelArray: []
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

        const stressLevelArray = [];
        data.data.forEach(element => {
          const newObject = {
            dateSubmitted: element.dateSubmitted,
            answer: element.quizQuestions[0].value
          };
          stressLevelArray.push(newObject);
        });

        this.setState({
          username: data.username,
          pastSurveyData: data.data,
          modulesCompleted: data.modules,
          stressLevelArray: stressLevelArray
        });

        console.log(this.state.stressLevelArray);
      });
  }

  render() {
    return (
      <div>
        <h2>Profile Page {this.state.username}</h2>

        <h3>Modules Completed</h3>

        <div>
          {this.state.modulesCompleted.map((item, i) => (
            <li>
              <button value={item.name}>{item.name}</button>
              <div>
                {item.moduleAnswers.map((element, e) => (
                  <p>
                    {element.question}

                    <br></br>

                    {element.answer}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </div>
        {/* <div>
          <h2>This is past stress data</h2>
          <div>
            {this.state.pastSurveyData.map((item, i) => (
              <p>
                {item.dateSubmitted}: {item.quizQuestions[0].value}
              </p>
            ))}
          </div>
        </div> */}

        <LineChart
          width={300}
          height={300}
          data={this.state.stressLevelArray}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="dateSubmitted" />
          <YAxis type="number" domain={[0, 4]} />
          <CartesianGrid strokeDasharray="3 4" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="answer"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </div>
    );
  }
}
export default Profile;
