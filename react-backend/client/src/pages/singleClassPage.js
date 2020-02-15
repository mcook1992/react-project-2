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
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Table1 from "../components/gradebook";
import Moment from "moment";
import moment from "moment";
import { getAverageScore } from "../getting-daily-average";

var data = [
  { id: 1, name: "Gob", value: "2" },
  { id: 2, name: "Buster", value: "5" },
  { id: 3, name: "George Michael", value: "4" }
];

class singleClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: this.props.location.pathname.replace("/classes/", ""),
      studentArray: [],
      stressLevelOverTimeArray: [],
      mostRecentStressLevel: [],
      mostStressedStudentArray: [],
      assignmentsGivenArray: [],
      recommendedAssignments: ["Test", "Test 2"]
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
        //this is the array that will make the line graph of average stress levels over time
        var studentStressLevels = [];
        var mostStressedStudents = [];
        //create an array to replace most recent stress data--for the bar graph
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
            //creating the most recent stress data array--we take the most recent answer from each student and add it to both the stress level over time and bar graph arrays. Other elements are just added to the bar graph array
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
                  mostStressedStudents.push(elem.studentID);
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
        var useThisArrayForStressOverTime = getAverageScore(
          studentStressLevels
        );
        console.log(useThisArrayForStressOverTime);

        //figure out which modules should be recommended
        var newRecommendedAssignments = ["Mental Health Intro Part 1"];

        //if certain stress conditions are met, if so, add more modules (later, we check to see whether those modules have already been completed. Eventually, use a splice so only three modules are displayed)
        var stressArrayCheckedForModules = false;

        useThisArrayForStressOverTime.forEach(stressArrayElem => {
          console.log("value of the answer is " + stressArrayElem.value); //tktktk
          if (
            stressArrayElem.value > 2 &&
            stressArrayCheckedForModules == false
          ) {
            newRecommendedAssignments.push("Dealing with Stress");

            stressArrayCheckedForModules = true;
          }
        });
        //go through assignments given and see if they've already done recommended assignments.
        data.assignmentsGiven.forEach(diffAssignment => {
          console.log("Different assignment is " + diffAssignment.name);
          //now go through each thing in the recommended assignments
          newRecommendedAssignments.forEach(currentlyRecommendedAssignment => {
            console.log(
              "if " +
                diffAssignment.name +
                " == " +
                currentlyRecommendedAssignment
            );
            if (diffAssignment.name == currentlyRecommendedAssignment) {
              newRecommendedAssignments = newRecommendedAssignments.filter(
                el => el !== currentlyRecommendedAssignment
              );
              console.log(
                "new recommended assignment array is " +
                  newRecommendedAssignments
              );
              //tktktk
            }
          });
        });

        this.setState({
          studentArray: data.studentNameArray,
          stressLevelOverTimeArray: useThisArrayForStressOverTime,
          mostRecentStressLevel: mostRecentStressLevelArray,
          mostStressedStudentArray: mostStressedStudents,
          assignmentsGivenArray: data.assignmentsGiven,
          recommendedAssignments: newRecommendedAssignments
        });
        console.log(this.state.recommendedAssignments);
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
        <h2>Stress Data Over Time</h2>

        <div>
          <LineChart
            width={1000}
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
              dataKey="average"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>

          <h2>Most Recent Student Stress Reports</h2>

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

          <div>
            <h2>Students who reported high stress</h2>
            <div>
              {this.state.mostStressedStudentArray.map((item, i) => (
                <li>
                  <Link to={"/studentProfile/" + item}>{item}</Link>
                </li>
              ))}
            </div>
            <br></br>
            <br></br>
          </div>

          <div>
            <h2>Assignments Completed by Students</h2>
            <Table1 data={data} />
          </div>

          <div>
            <h3>Recommended Modules</h3>
            <h5>
              Based on your students stress data, we recomend the following
              modules:
            </h5>
            <div>
              {this.state.recommendedAssignments.map((item, i) => (
                <h4>{item}</h4>
              ))}
            </div>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default singleClassPage;
