import React, { Component } from "react";

import "./style/navigator.css";

class Navigator extends Component {
  state = {
    collapsed: false
  };

  render() {
    return (
      <nav className={`screen ${this.state.collapsed ? "collapsed" : ""}`}>
        <ul>
          {Object.keys(this.props.data).map(entry => {
            return (
              <li key={entry} className='nav'>
                {entry}
              </li>
            );
          })}
        </ul>
        <div
          className='collapser'
          onClick={() => {
            this.setState({ collapsed: !this.state.collapsed });
          }}
        />
      </nav>
    );
  }
}

export default Navigator;
