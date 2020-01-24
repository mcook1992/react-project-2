import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class Table1 extends React.Component {
  render() {
    return (
      <div>
        <BootstrapTable data={this.props.data}>
          <TableHeaderColumn isKey dataField="id">
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name">Unit 1</TableHeaderColumn>
          <TableHeaderColumn dataField="value">Unit 2</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default Table1;
