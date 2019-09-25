import React from "react";
import { Link } from "react-router-dom";
import { randomBytes } from "crypto";

class ClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: "",
      currentClasses: [],
      classClicked: false,
      classArray: { name: "", array: [] },
      newClassName: ""
    };

    this.addClass = this.addClass.bind(this);
    this.joinClass = this.joinClass.bind(this);

    //bind functions here
  }

  viewClass(event, groupName) {
    event.preventDefault();
    console.log(groupName);
  }

  addClass(event) {
    event.preventDefault();
    fetch("/addClasses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        newClassName: Math.random() * 1000
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ currentClasses: data.classNames });
      });
  }

  joinClass(event) {
    event.preventDefault();
    fetch("/joinClasses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        newClassName: "testClass3"
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let array = this.state.currentClasses;
        array.push(data.newClass);
        this.setState({ currentClasses: array });
      });
  }

  componentDidMount() {
    fetch("/addClasses")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          accountType: data.accountType,
          currentClasses: data.currentClasses
        });
      });
  }

  render() {
    if (this.state.accountType === "Student") {
      return (
        <div>
          <button className="btn btn-primary" onClick={this.joinClass}>
            {" "}
            Join Class
          </button>

          {/* eventually map stuff here */}

          <h3>Your Classes</h3>

          <li>{this.state.currentClasses[0]}</li>
          <li>{this.state.currentClasses[1]}</li>
        </div>
      );
    } else if (this.state.accountType === "Teacher") {
      return (
        <div>
          <button className="btn btn-primary" onClick={this.addClass}>
            Add Class
          </button>
          <h2>Your classes</h2>
          {this.state.currentClasses.map((item, i) => (
            <li>
              <Link to={"/classes/" + item}>{item}</Link>
            </li>
          ))}
        </div>
      );
    } else {
      return <h2>Could not find any data. Make sure you are logged in</h2>;
    }
  }
}

export default ClassPage;
