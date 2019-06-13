import React from "react";
import Axios from "axios";

class Learn extends React.Component {
  state = {
    array: [{ snippet: "test 1" }, { snippet: "test 2" }]
  };

  componentDidMount() {
    Axios.get(
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=mental+health&api-key=ilQ5W4HNLbtSAjTO0BFt3XGTQKrdhdQ6"
    ).then(res => {
      console.log(typeof res.data.response.docs);
      this.setState({ array: res.data.response.docs });
      console.log(this.state);
    });

    // need to figure out how to get the "object" that is actually an array into the array of the state"
  }

  render() {
    return (
      <div>
        <h1>Learn Page</h1>
        <p>We are a page where students can learn about mental health</p>
        <div>
          {this.state.array.map((item, i) => (
            <a href={item.web_url}>
              <li key={i}>{item.snippet}</li>
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default Learn;
