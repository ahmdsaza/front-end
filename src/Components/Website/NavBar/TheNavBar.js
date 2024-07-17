import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../../API/axios";
import { CATEGORIES, LOGOUT, USER, CARTS } from "../../../API/Api";
import SkeletonShow from "../Skeleton/SkeletonShow";
import Cookie from "cookie-universal";
import "./TheNavBar.css";

export default function TheNavBar() {
  const [name, setName] = useState("");
  const [carts, setCarts] = useState([]);
  const [cartsLength, setCartsLength] = useState([]);

  const cookie = Cookie();

  // Get User Name
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setName(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Number of Items in Cart
  useEffect(() => {
    Axios.get(`${CARTS}`)
      .then((data) => setCarts(data.data))
      .catch((err) => console.log(err));
  }, [cartsLength]);

  useEffect(() => {
    //////////////////////
    Axios.get(`${CARTS}`)
      .then((data) => setCartsLength(data.data.length))
      .catch((err) => console.log(err));
  }, []);

  console.log(cartsLength);

  // Logout
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
    <nav className="py-3">
      <Container>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <Link className="col-3" to="/">
            <img
              width="200px"
              src={require("../../../Assets/Orange and Gray Tag Cart Virtual Shop Logo.png")}
              alt="logo"
            />
          </Link>
          <div className="col-3 d-flex align-items-center justify-content-end gap-2 order-md-3 order-1">
            <div className="d-flex">
              <div className="px-3">
                <img
                  width="25px"
                  height="25px"
                  src={require("../../../Assets/search-icon.png")}
                  alt="Cart"
                />
              </div>
              <Link to="/cart">
                <img
                  width="30px"
                  src={require("../../../Assets/shopping-cart.png")}
                  alt="Cart"
                />
              </Link>
              <span>{carts.length}</span>
            </div>
            <Dropdown>
              <Dropdown.Toggle
                variant="0"
                style={{ border: "1px solid white" }}
                id="dropdown-basic"
              >
                <img
                  width="30px"
                  src={require("../../../Assets/profile.png")}
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
                  }}
                >
                  {name.name}
                </Dropdown.Item>
                {name.role === "1995" && (
                  <Dropdown.Item>
                    <Link to="/dashboard" style={{ color: "black" }}>
                      Dashboard
                    </Link>
                  </Dropdown.Item>
                )}
                {name ? (
                  <>
                    <Dropdown.Item>
                      <Link to="/orders" style={{ color: "black" }}>
                        My Orders
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item>
                    <Link to="login" style={{ color: "black" }}>
                      Login / Register
                    </Link>
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Container>
    </nav>
  );
}
