import React, { Component } from "react";

import "./style/list.css";

class List extends Component {
  state = {
    collapsed: false
  };

  render() {
    return (
      <div
        id='list'
        className={`screen ${this.state.collapsed ? "collapsed" : ""}`}
      >
        <ul>
          <li className='entry'>entry</li>
        </ul>
        <div
          className='collapser'
          onClick={() => {
            this.setState({ collapsed: !this.state.collapsed });
          }}
        />
      </div>
    );
  }
}

export default List;
