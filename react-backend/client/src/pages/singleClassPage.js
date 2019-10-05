import React from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class singleClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: this.props.location.pathname.replace("/classes/", ""),
      studentArray: [],
      stressLevelOverTimeArray: []
    };
  }

  componentDidMount() {
    //setting the state early so that we can fetch the right class page
    this.setState({
      className: this.props.location.pathname.replace("/classes/", "")
    });

    fetch("/displayClass/" + this.state.className)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        var studentStressLevels = [];
        //start with individual student
        data.data.forEach(element => {
          //now add each answer separately--don't have to keep students apart for this particular answer
          element.forEach(elem => {
            const newObject = {
              dateSubmitted: elem.dateSubmitted,
              answer: elem.quizQuestions[0].value
            };
            studentStressLevels.push(newObject);
          });
        });
        console.log("Student stress level array is" + studentStressLevels);
        this.setState({
          studentArray: data.studentNameArray,
          stressLevelOverTimeArray: studentStressLevels
        });
      });
  }
  render() {
    return (
      <div>
        <h2>This is an individual class page for {this.state.className}</h2>
        <div>
          {this.state.studentArray.map((item, i) => (
            <li>
              <Link to={"/studentProfile/" + item}>{item}</Link>
            </li>
          ))}
        </div>
        <h2>Class Data</h2>

        <div>
          <LineChart
            width={300}
            height={300}
            data={this.state.stressLevelOverTimeArray}
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
      </div>
    );
  }
}

export default singleClassPage;
