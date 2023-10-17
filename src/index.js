import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./Css/Components/alerts.css";
import "./Css/Components/loading.css";
import "./Css/Components/button.css";
import "./Css/Components/google.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Pages/Auth/Auth.css";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <Router>
          <App />
        </Router>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);
