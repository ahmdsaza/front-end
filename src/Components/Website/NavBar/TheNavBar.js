import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { Axios } from "../../../API/axios";
import { PRODUCT, LOGOUT, USER, CARTS } from "../../../API/Api";
import SkeletonShow from "../Skeleton/SkeletonShow";
import Cookie from "cookie-universal";
import "./TheNavBar.css";

export default function TheNavBar(props) {
  const [name, setName] = useState("");
  const [carts, setCarts] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  const showEmpty = [];

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
      .then((data) => {
        setCarts(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showWichData = search.length > 2 ? searchData : showEmpty;

  async function getSearchedData() {
    try {
      const res = await Axios.post(`${PRODUCT}/search?title=${search}`);
      setSearchData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);

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

  const dataShow = showWichData.map((item, key) => (
    <div key={item.id + key}>
      <NavLink to={`./products/${item.id}`} reloadDocument>
        <div className="search-abs">
          <div className="search-bar-data">
            <img
              src={item.images[0].image}
              className="search-img"
              alt={item.title}
            />
            <p className="search-title">{item.title}</p>
            <p className="search-price">${item.discount}</p>
          </div>
        </div>
      </NavLink>
    </div>
  ));

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
            <div className="d-flex gap-2">
              {/* <img
                  width="25px"
                  height="25px"
                  src={require("../../../Assets/search-icon.png")}
                  alt="Cart"
                /> */}
              <div>
                <Form.Control
                  type="search"
                  className="search-bar"
                  aria-label="Search here..."
                  placeholder="Search..."
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSearchLoading(true);
                  }}
                />
              </div>
              <div className="d-flex">
                <Link to="/cart">
                  <img
                    width="30px"
                    src={require("../../../Assets/shopping-cart.png")}
                    alt="Cart"
                  />
                </Link>
                <span>{carts.length}</span>
              </div>
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
                  <div>
                    <Dropdown.Item>
                      <NavLink to="/dashboard" className="text-black">
                        Dashboard
                      </NavLink>
                    </Dropdown.Item>
                  </div>
                )}
                {name ? (
                  <>
                    <Dropdown.Item>
                      <NavLink to="/orders" style={{ color: "black" }}>
                        My Orders
                      </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item>
                    <NavLink to="login" style={{ color: "black" }}>
                      Login / Register
                    </NavLink>
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {searchLoading ? (
          <tr style={{ textAlign: "center" }}>
            <td colSpan={12}>Searching...</td>
          </tr>
        ) : (
          <div onClick={() => setSearch("")}>{dataShow}</div>
        )}
      </Container>
    </nav>
  );
}
