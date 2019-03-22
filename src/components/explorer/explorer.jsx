import React, { Component } from "react";

import "./style/explorer.css";

class Explorer extends Component {
  render() {
    return (
      <div id='explorer' className='screen'>
        <nav className='frame'>
          <ul>
            {Object.keys(this.props.data).map(entry => {
              return <li className='nav'>{entry}</li>;
            })}
          </ul>
        </nav>
        <div className='resizer' />

        <div id='list' className='frame'>
          <ul>
            <li className='entry'>entry</li>
          </ul>
        </div>
        <div id='r2' className='resizer' />
      </div>
    );
  }
}

export default Explorer;
