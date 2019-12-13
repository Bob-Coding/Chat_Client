import React, { Component } from "react";

class App extends Component {
  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = event => {
      console.log("event test data:", event.data);

      //de serialise string into an array again
      const parsed = JSON.parse(event.data);
      console.log("parsed text test:", parsed);
    };
  }

  render() {
    return <div>Client</div>;
  }
}

export default App;
