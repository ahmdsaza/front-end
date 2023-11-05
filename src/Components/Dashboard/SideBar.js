import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { NavLink } from "react-router-dom";

import React from "react";
import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../../Context/MenuContext";
import { useContext } from "react";
import { WindowSize } from "../../Context/WindowContext";

export default function SideBar() {
  // Menu Context
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  // WindowSize Context
  const window = useContext(WindowSize);
  const windowSize = window.windowSize;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba( 0, 0, 0, 0.2)",
          display: windowSize < "768" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar pt-3"
        style={{
          left: windowSize < "786" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "240px" : "fit-content",
          position: windowSize < "768" ? "fixed" : "sticky",
        }}
      >
        <NavLink
          to={"users"}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
          <FontAwesomeIcon
            style={{
              padding: isOpen ? "10px 8px 10px 15px" : "10px 13px",
            }}
            icon={faUsers}
          />
          <p
            className="m-0"
            style={{
              display: isOpen ? "block" : "none",
            }}
          >
            Users
          </p>
        </NavLink>
        <NavLink
          to={"/dashboard/user/add"}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
          <FontAwesomeIcon
            style={{
              padding: isOpen ? "10px 8px 10px 15px" : "10px 13px",
            }}
            icon={faPlus}
          />
          <p
            className="m-0"
            style={{
              display: isOpen ? "block" : "none",
            }}
          >
            Add user
          </p>
        </NavLink>
        <NavLink
          to={"/dashboard/writer"}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
          <FontAwesomeIcon
            style={{
              padding: isOpen ? "10px 8px 10px 15px" : "10px 13px",
            }}
            icon={faPlus}
          />
          <p
            className="m-0"
            style={{
              display: isOpen ? "block" : "none",
            }}
          >
            Writer
          </p>
        </NavLink>
      </div>
    </>
  );
}
