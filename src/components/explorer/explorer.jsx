import React, { Component } from "react";

import "./style/explorer.css";

class Explorer extends Component {
  render() {
    return (
      <nav>
        <div id='navigator'>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>

        <div id='resizer' />
      </nav>
    );
  }
}

export default Explorer;

//
