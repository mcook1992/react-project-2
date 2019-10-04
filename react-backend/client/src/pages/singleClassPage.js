import React from "react";
import { Link } from "react-router-dom";

class singleClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: this.props.location.pathname.replace("/classes/", ""),
      studentArray: [],
      data: []
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
        this.setState({ studentArray: data.studentNameArray });
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
      </div>
    );
  }
}

export default singleClassPage;
