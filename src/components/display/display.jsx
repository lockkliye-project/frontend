import React, { Component } from "react";

import ToolBar from "./toolBar";

import "./style/display.css";

class Display extends Component {
  state = {
    dirtyFlag: false
  };

  filter = text => {
    if (!text.includes("<div>")) return text;

    let filteredText = text.replace(/<br>/g, "");
    filteredText = text.replace(/(<formatted>).+?\s+(<formatted>)/g, "");
    filteredText = filteredText.replace(/<div>/g, "<br>");
    filteredText = filteredText.replace(/<\/div>/g, "");
    filteredText = filteredText.replace(/&nbsp;/g, " ");
    return filteredText;
  };

  word = string => {
    let p = document.createElement("p");
    p.id = string;
    p.className = "word";
    p.innerHTML = string;
    return p;
  };

  line = string => {};

  paragraph = string => {};

  package = text => {
    console.log(text);
    text = text.split(/[\s]/g);
    console.log(text);
    let packagedText = document.createElement("div");

    for (let string of text) {
      console.log(string);
      packagedText.appendChild(this.word(string));
    }

    console.log(packagedText);
    packagedText.innerHTML =
      "<formatted>" + packagedText.innerHTML + "</formatted>";
    return packagedText;
  };

  render() {
    return (
      <div id='display' className='screen'>
        <ToolBar />
        <main
          contentEditable='true'
          onInput={e => {}}
          onBlur={e => {
            e.target.appendChild(this.package(this.filter(e.target.innerHTML)));
          }}
        />
      </div>
    );
  }
}

export default Display;
