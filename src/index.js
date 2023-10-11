import React from "react";
import ReactDOM from "react-dom/client";
import "./Css/base/media.css";
import "./index.css";
import "./Css/Components/alerts.css";
import "./Css/Components/loading.css";
import "./Css/Components/form.css";
import "./Css/Components/button.css";
import "./Css/Components/google.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
