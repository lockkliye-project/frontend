import React, { Component } from "react";

import ToolBar from "./toolBar";
import Block from "./block";

import "./style/display.css";

class Display extends Component {
  state = {};

  render() {
    return (
      <div id='display' className='screen'>
        <ToolBar />
        <main>
          <Block />
        </main>
      </div>
    );
  }
}

export default Display;
