import React, { Component } from "react";

import "./style/explorer.css";

class Explorer extends Component {
  render() {
    return (
      <div id='explorer' className='screen'>
        <nav className='frame'>
          <ul>
            <li className='nav'>1</li>
          </ul>
        </nav>
        <div className='resizer' />

        <div id='list' className='frame'>
          <ul>
            <li className='entry'>1</li>
          </ul>
        </div>
        <div className='resizer' />
      </div>
    );
  }
}

export default Explorer;
