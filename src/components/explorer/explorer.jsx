import React, { Component } from "react";

import "./style/explorer.css";

class Explorer extends Component {
  render() {
    return (
      <nav>
        <div id='navigator' className='frame'>
          <ul>
            <li className='nav'>1</li>
          </ul>
          <div className='resizer' />
        </div>

        <div id='list' className='frame'>
          <ul>
            <li className='entry'>1</li>
          </ul>
          <div className='resizer' />
        </div>
      </nav>
    );
  }
}

export default Explorer;
