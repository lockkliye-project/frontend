import React, { Component } from "react";

import "./style/list.css";

class List extends Component {
  state = {};

  render() {
    return (
      <div
        id='list'
        className={`screen ${this.state.collapsed ? "collapsed" : ""}`}
      >
        <ul>
          <li className='entry'>entry</li>
        </ul>
        <div className='resizer' />
      </div>
    );
  }
}

export default List;
