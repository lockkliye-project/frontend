import React from "react";
import ReactDOM from "react-dom";

import Alerts from "./components/alerts/alerts";
import Explorer from "./components/explorer/explorer";
import Display from "./components/display/display";

import * as serviceWorker from "./serviceWorker";

import "./style/index.css";

ReactDOM.render(
  <React.Fragment>
    <Alerts />
    <div id='app'>
      <Explorer />
      <Display />
    </div>
    <div id='bg' />
  </React.Fragment>,
  document.getElementById("root")
);

serviceWorker.unregister();
