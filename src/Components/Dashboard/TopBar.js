import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import React, { useEffect, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { MenuContextExport } from "../../Context/MenuContext";
import { USER, LOGOUT } from "../../API/Api";
import { Axios } from "../../API/axios";
import { useNavigate, NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Cookie from "cookie-universal";
import { Container } from "react-bootstrap";

export default function TopBar() {
  const menu = useContext(MenuContextExport);
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
      window.location.pathname = "/";
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
      <div className="top-bar z-3">
        <div className="d-flex align-items-center justify-content-between h-100">
          <div className="d-flex align-items-center gap-5">
            {/* <h3>E-Commerce</h3> */}
            {window.innerWidth < 768 ? (
              <FontAwesomeIcon
                onClick={() => setIsOpen((prev) => !prev)}
                cursor={"pointer"}
                icon={faBars}
              />
            ) : (
              <></>
            )}
          </div>
          <div>
            <Dropdown>
              <Dropdown.Toggle
                variant="0"
                style={{ border: "1px solid white" }}
                id="dropdown-basic"
              >
                <img
                  width="30px"
                  src={require("../../Assets/profile.png")}
                  alt="Cart"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  disabled
                  style={{
                    marginTop: "-0.5rem",
                    color: "black",
                    fontSize: "1rem",
                    backgroundColor: "#EADBC8",
                  }}
                >
                  {name}
                </Dropdown.Item>

                <Dropdown.Item>
                  <NavLink to="../" className="text-black">
                    Back to website
                  </NavLink>
                </Dropdown.Item>

                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </Container>
  );
}
