import React from "react";
import ReactDOM from "react-dom";

import AlertBox from "./components/alertBox/alertBox";
import Application from "./components/application/application";

import * as serviceWorker from "./serviceWorker";

import "./style/index.css";

ReactDOM.render(
  <React.Fragment>
    <AlertBox />
    <Application />
  </React.Fragment>,
  document.getElementById("root")
);

serviceWorker.unregister();
