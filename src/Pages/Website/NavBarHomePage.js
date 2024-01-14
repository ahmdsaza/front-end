import React from "react";
import "./navbarhome.css";
import { Link } from "react-router-dom";

export default function NavBarHomePage() {
  return (
    <body className="body1">
      <nav className="nav1">
        <Link className="item" to={"/"}>
          Home
        </Link>
        <Link className="item" to={"/about"}>
          About
        </Link>
        <Link className="item">
          Skills
          <div className="dropdown1">
            <div>
              <Link className="a1">React</Link>
              <Link className="a1">Angular</Link>
              <Link className="a1">Vue</Link>
            </div>
          </div>
        </Link>
        <Link className="item" to={"/dashboard"}>
          Dashboard
        </Link>
        <div className="underline"></div>
      </nav>
    </body>
  );
}
