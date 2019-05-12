import React, { Component } from 'react';

import ToolBar from './toolBar';

import './style/display.css';

class Display extends Component {
  state = {
    dirtyFlag: false
  };

  filter = text => {
    console.log(text);
    text = text.replace(/<br>/g, '');
    text = text.replace(/<div>/g, '§');
    text = text.replace(/<\/div>/g, '');
    text = text.replace(/&nbsp;/g, ' ');
    console.log(text);
  };

  word = string => {
    let p = document.createElement('p');
    p.id = string;
    p.className = 'word';
    p.innerHTML = string;
    return p;
  };

  line = string => { };

  paragraph = string => { };

  package = text => {
    console.log(text);
    text = text.split(/[\s]/g);
    console.log(text);
    let packagedText = document.createElement('div');

    for (let string of text) {
      console.log(string);
      packagedText.appendChild(this.word(string));
    }

    console.log(packagedText);
    packagedText.innerHTML =
      '<formatted>' + packagedText.innerHTML + '</formatted>';
    return packagedText;
  };

  render() {
    return (
      <div id='display' className='screen'>
        <ToolBar />
        <main
          contentEditable='true'
          onInput={e => {
            this.filter(e.target.innerHTML);
          }}
          onBlur={e => { }}
        />
      </div>
    );
  }
}

export default Display;
