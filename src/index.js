import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

import "./style/index.css";

ReactDOM.render(
  <div>
    <p>henlo</p>
  </div>,
  document.getElementById("root")
);

serviceWorker.unregister();
