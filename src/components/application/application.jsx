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

  render() {
    return (
      <div id='app'>
        <Explorer />
        <Display />
      </div>
    );
  }
}

export default Application;
