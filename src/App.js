import React, { Component } from "react";
import { connect } from "react-redux";
import superagent from "superagent";

class App extends Component {
  state = {
    text: ""
  };
  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = event => {
      console.log("event test data:", event.data);

      //de serialise string into an array again
      const action = JSON.parse(event.data);
      console.log("action test:", action);

      this.props.dispatch(action);
    };
  }
  onChange = event => {
    // const value = event.target.value fancy way:
    // const { value } = event.target even fancier:
    // const { target } =
    const {
      target: { value }
    } = event;
    this.setState({ text: value });
  };
  reset = () => {
    console.log("reset test");
    this.setState({ text: "" });
  };
  onSubmit = async event => {
    console.log("onSubmit test:");
    event.preventDefault();
    const url = "http://localhost:4000/message";

    const response = await superagent.post(url).send(this.state);

    this.reset();

    console.log("response test:", response);
  };
  render() {
    console.log("this.props.messagestest:", this.props); // youll see empty array, put an x in the reducer array and you will see an x as state
    const { messages } = this.props;
    const list = messages.map(message => (
      <p key={message.id}>{message.text}</p>
    ));
    return (
      <main>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} type="text" value={this.state.text} />
          <button>Submit</button>
        </form>
        <button onClick={this.reset}>Reset</button>
        {list}
      </main>
    );
  }
}
//get data from store
function mapStateToProps(state) {
  //state is the current state in the redux store

  //each property of the object becomes a prop in the component
  return {
    messages: state //inside of the component , this.props.messages will be the entire state of the redux store
  };
}

export default connect(mapStateToProps)(App);
