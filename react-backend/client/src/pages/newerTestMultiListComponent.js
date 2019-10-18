import React from "react";

import Select from "react-select";

const testArray = [
  { value: "Mental Health 1", label: "Mental Health 1" },
  { value: "Mental Health 2", label: "Mental Health 2" },
  { value: "Mental Health 3", label: "Mental Health 3" }
];

class CoolSelectList extends React.Component {
  render(props) {
    return (
      <Select
        defaultValue={testArray[1]}
        options={testArray}
        isMulti
        // formatGroupLabel={this.props.format}
      />
    );
  }
}

export default CoolSelectList;
