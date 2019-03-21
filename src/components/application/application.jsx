import React, { Component } from "react";

import Explorer from "../explorer/explorer";
import Display from "../display/display";

import test_entries from "../../test_entries.json";

import "./style/application.css";

class Application extends Component {
  state = {
    data: null,
    currentCard: null
  };

  componentDidMount() {
    this.setState({ data: test_entries }, () => {});
  }

  pop() {
    return this.state.data;
  }

  render() {
    return (
      <div id='app'>
        <Explorer data={this.state.data} />
        <Display currentCard={this.state.currentCard} />
      </div>
    );
  }
}

export default Application;
