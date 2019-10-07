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
import { BarChart, Bar } from "recharts";
import Moment from "moment";
import moment from "moment";

class singleClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: this.props.location.pathname.replace("/classes/", ""),
      studentArray: [],
      stressLevelOverTimeArray: [],
      mostRecentStressLevel: []
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
        //create an array to replace most recent stress data
        var mostRecentStressLevelArray = [
          { name: "stress-level-1", value: 0 },
          { name: "stress-level-2", value: 0 },
          { name: "stress-level-3", value: 0 },
          { name: "stress-level-4", value: 0 }
        ];
        //start with individual student
        data.data.forEach(element => {
          //counter
          var i = 0;

          //now add each answer separately--don't have to keep students apart for this particular answer
          element.forEach(elem => {
            const date = moment(elem.dateSubmitted).format("DD MMM, YYYY");
            // console.log(date);
            //creating the most recent stress data array
            if (i == element.length - 1) {
              console.log("we're in the if statement");
              console.log(elem.quizQuestions[0].value);
              switch (elem.quizQuestions[0].value) {
                case "1":
                  console.log("we're in the case statement");
                  mostRecentStressLevelArray[0].value++;
                  break;
                case "2":
                  console.log("we're in the case statement");
                  mostRecentStressLevelArray[1].value++;
                  break;
                case "3":
                  console.log("we're in the case statement");
                  mostRecentStressLevelArray[2].value++;
                  break;
                case "4":
                  console.log("we're in the case statement");
                  mostRecentStressLevelArray[3].value++;
                  break;
                default:
                // execute default code block
              }
            }

            const newObject = {
              dateSubmitted: date,
              answer: elem.quizQuestions[0].value
            };
            studentStressLevels.push(newObject);
            i++;
          });
        });
        console.log("Student stress level array is" + studentStressLevels);
        this.setState({
          studentArray: data.studentNameArray,
          stressLevelOverTimeArray: studentStressLevels,
          mostRecentStressLevel: mostRecentStressLevelArray
        });
        this.state.mostRecentStressLevel.forEach(info => {
          console.log(info.name + info.value);
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

          <BarChart
            width={600}
            height={300}
            data={this.state.mostRecentStressLevel}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    );
  }
}

export default singleClassPage;
