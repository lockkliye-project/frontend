import React, { Component } from "react";

import "./style/navigator.css";

class Navigator extends Component {
  state = {
    isResizing: false,
    lastDownX: 0,
    newWidth: {}
  };

  handleMousedown = e => {
    this.setState({ isResizing: true, lastDownX: e.clientX });
  };

  handleMousemove = e => {
    // we don't want to do anything if we aren't resizing.
    if (!this.state.isResizing) {
      return;
    }

    let offsetRight =
      document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
    let minWidth = 50;
    let maxWidth = 600;
    if (offsetRight > minWidth && offsetRight < maxWidth) {
      this.setState({ newWidth: { width: offsetRight } });
    }
  };

  handleMouseup = e => {
    this.setState({ isResizing: false });
  };

  componentDidMount() {
    document.addEventListener("mousemove", e => this.handleMousemove(e));
    document.addEventListener("mouseup", e => this.handleMouseup(e));
  }

  render() {
    return (
      <nav
        className={`screen ${this.state.collapsed ? "collapsed" : ""}`}
        style={this.state.newWidth}
      >
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
          className='resizer'
          onMouseDown={event => {
            this.handleMousedown(event);
          }}
        />
      </nav>
    );
  }
}

export default Navigator;
