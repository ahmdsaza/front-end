import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./Css/Components/alerts.css";
import "./Css/Components/loading.css";
import "./Css/Components/button.css";
import "./Css/Components/google.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Pages/Auth/AuthOperations/Auth.css";
import "./custom.css";
import "react-loading-skeleton/dist/skeleton.css";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";
import CartContext from "./Context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <CartContext>
          <Router>
            <App />
          </Router>
        </CartContext>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);
