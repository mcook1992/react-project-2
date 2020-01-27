import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

class Table1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      columns: [],
      studentNames: ["TestStudent1", "TestStudent2"],
      testArray: [
        { name: "Mental Health Intro Part 1", completed: ["TestStudent1"] },
        { name: "Mental Health Intro Part 2", completed: ["TestStudent2"] }
      ],
      biggerTestArray: []
    };

    // this.getColumns = this.getColumns.bind(this);
  }

  componentDidMount() {
    var newArray = [];

    //sort through the student array

    this.state.studentNames.forEach(element => {
      var newElement = { name: element, modulesFinished: [] };
      var checkOrEx = "x";

      //sort through the list of modules
      this.state.testArray.forEach(elem => {
        //for each module, go through their completed section--if one of the completed names matches, change from x to check
        elem.completed.forEach(studentName => {
          if (studentName == element) {
            checkOrEx = "check";
          }
        });

        newElement.modulesFinished.push({
          moduleName: elem.name,
          completed: checkOrEx
        });
        checkOrEx = "x";
      });
      newArray.push(newElement);
      console.log(newArray);
    });

    this.setState({
      biggerTestArray: newArray
    });

    console.log("the new big array is ");
    console.log(this.state.biggerTestArray);
  }

  //Steps for gradebook

  //1. List of assignments in header (done)
  //2. So the easiest thing would be to have the data organized like: column 1--list of student names, column 2: first assignment. Beneath that, a list of x's and o's based on whether students have completed them
  //3. So organize by student--rows should have student name, then whether it's completed

  //   getColumns() {
  //     console.log(this.state.testArray);
  //     var newGradebook = document.createElement("table");
  //     var newGradebookTableHead = document.createElement("tr");
  //     this.props.data.forEach(element => {
  //       var newTableHeading = document.createElement("th");
  //       newTableHeading.textContent = element.name;
  //       newGradebookTableHead.append(newTableHeading);
  //     });
  //     newGradebook.append(newGradebookTableHead);
  //     return newGradebook;
  //   }

  render() {
    // const tableHead = this.getColumns();
    return (
      <div>
        <div>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>Students</th>
                {this.state.testArray.map(item => (
                  <th>{item.name}</th>
                ))}
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {/* Going through the new reformated array in the state and getting all values  */}
              {this.state.biggerTestArray.map(text => (
                <tr>
                  {/* printing student name in first cell or row */}
                  <td>{text.name}</td>

                  {/* populating rest of row with infor from the modulesFinished array */}
                  {text.modulesFinished.map(yesOrNo => (
                    <td>{yesOrNo.completed}</td>
                  ))}
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>

        {/* <div>
          <BootstrapTable
            data={this.state.data}
            keyField={this.state.data[0].name}
          >
            {this.state.data.map(name => (
              <TableHeaderColumn dataField={name.name}>
                {name.name}
              </TableHeaderColumn>
            ))}
          </BootstrapTable>
        </div>

        <BootstrapTable data={this.props.data}>
          <TableHeaderColumn isKey dataField="id">
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name">Unit 1</TableHeaderColumn>
          <TableHeaderColumn dataField="value">Unit 2</TableHeaderColumn>
        </BootstrapTable> */}
      </div>
    );
  }
}

export default Table1;
