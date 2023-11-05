import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";

import React, { useEffect, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { Menu } from "../../Context/MenuContext";
import { USER, LOGOUT } from "../../API/Api";
import { Axios } from "../../API/axios";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Cookie from "cookie-universal";

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const navigate = useNavigate();
  const cookie = Cookie();

  const [name, setName] = useState("");

  // Gett User Name
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setName(data.data.name))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  // Logout Function
  async function handleLogout() {
    try {
      const res = await Axios.get(`${LOGOUT}`);
      cookie.remove("e-commerce");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="top-bar">
      <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center gap-5">
          <h3>E-Commerce</h3>
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            cursor={"pointer"}
            icon={faBars}
          />
        </div>
        <div>
          <DropdownButton id="dropdown-basic-button" title={name}>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}
