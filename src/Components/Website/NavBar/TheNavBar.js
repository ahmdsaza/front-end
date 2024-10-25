import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Axios } from "../../../API/axios";
import { PRODUCT, LOGOUT, USER, CARTLENGTH } from "../../../API/Api";
// import SkeletonShow from "../Skeleton/SkeletonShow";
import Cookie from "cookie-universal";
import { CartExport } from "../../../Context/CartContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import profileIcon from "../../../Assets/profile.png";
import "./TheNavBar.css";

export default function TheNavBar(props) {
  const [name, setName] = useState("");
  const [search, setSearch] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [cartLength, setCartLength] = useState();
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const showEmpty = [];

  const { isChange } = useContext(CartExport);

  const cookie = Cookie();

  // Get User Name
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setName(data.data))
      .catch((err) => console.log(err));
  }, []);

  const showWichData = search.length > 2 ? searchData : showEmpty;

  async function getSearchedData() {
    try {
      const res = await Axios.post(`${PRODUCT}/search?title=${search}`);
      setSearchData(res.data);
      setSearchLoading(false);
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

  useEffect(() => {
    Axios.get(`${CARTLENGTH}`)
      .then((data) => setCartLength(data.data))
      .catch((err) => console.log(err));
  }, [isChange]);

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

  function handleClickSearch() {
    setSearch("");
    setSearchTitle("");
    window.scrollTo(0, 0);
  }

  const dataShow = showWichData.map((item, key) => (
    <div key={key} onClick={handleClickSearch}>
      <NavLink to={`./products/${item.slug}`}>
        <div className="search-bar-data">
          <img
            src={item.images[0].image}
            className="search-img"
            alt={item.title}
          />
          <div>
            <p className="search-title">{item.title}</p>
            <p className="search-price">
              ${item.discount > 0 ? item.discount : item.price}
            </p>
          </div>
        </div>
      </NavLink>
    </div>
  ));

  return (
    <Container>
      <Navbar expand="xl" className="mb-3" collapseOnSelect>
        <Container fluid>
          <Navbar.Brand href="#">
            <NavLink
              to={"../"}
              className="d-flex align-items-end text-black text-decoration-none gap-2"
            >
              <img
                width="200px"
                src={require("../../../Assets/Orange and Gray Tag Cart Virtual Shop Logo.png")}
                alt="logo"
              />{" "}
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Offcanvas placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Ahmed Store</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#" collapseOnSelect>
                  <NavLink
                    to={"../"}
                    className="text-black text-decoration-none"
                  >
                    Home
                  </NavLink>
                </Nav.Link>
                <Nav.Link href="#" collapseOnSelect>
                  <NavLink
                    to={"../Categories"}
                    className="text-black text-decoration-none"
                  >
                    Categories
                  </NavLink>
                </Nav.Link>
              </Nav>
              <Form.Control
                type="search"
                className="search-bar"
                aria-label="Search here..."
                placeholder="Search..."
                value={searchTitle}
                onChange={(e) => {
                  setSearchTitle(e.target.value);
                  setSearch(e.target.value);
                  setSearchLoading(true);
                }}
              />
              <div className="d-flex">
                {name ? (
                  <Nav.Link className="m-2" href="#" collapseOnSelect>
                    <NavLink to="/cart">
                      <img
                        width="30px"
                        src={require("../../../Assets/shopping-cart.png")}
                        alt="Cart"
                      />
                    </NavLink>
                    <span>{cartLength}</span>
                  </Nav.Link>
                ) : (
                  <></>
                )}
              </div>
              {name ? (
                <div className="d-flex">
                  {" "}
                  {/* <img
                    className="mt-2"
                    style={{ marginLeft: "1rem" }}
                    src={profileIcon}
                    width="30px"
                    height="30px"
                  /> */}
                  <NavDropdown title={name.name} className="m-2 fs-5">
                    <NavDropdown.Item href="#" collapseOnSelect>
                      <NavLink to={"../profile"} className="text-black d-block">
                        {" "}
                        Profile
                      </NavLink>
                    </NavDropdown.Item>
                    {name.role === "1995" && (
                      <NavDropdown.Item>
                        <NavLink
                          to="/dashboard/activity"
                          className="text-black d-block"
                        >
                          Dashboard
                        </NavLink>
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item href="#" collapseOnSelect>
                      <NavLink to={"../orders"} className="text-black d-block">
                        {" "}
                        My orders
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href="#"
                      collapseOnSelect
                      onClick={handleLogout}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              ) : (
                <>
                  {/* <NavDropdown className="m-2">
                    <NavDropdown.Item> */}
                  <NavLink
                    className="my-2 text-black"
                    to="../login"
                    style={{
                      marginLeft: window.innerWidth > 1200 ? "10px" : "0px",
                    }}
                  >
                    Login / Register
                  </NavLink>
                  {/* </NavDropdown.Item>
                  </NavDropdown> */}
                </>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <div className="navbarsearch">{dataShow}</div>

      {/* <div className="py-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <NavLink className="col-3" to="/">
            <img
              width="200px"
              src={require("../../../Assets/Orange and Gray Tag Cart Virtual Shop Logo.png")}
              alt="logo"
            />
          </NavLink>
          <div className="col-6 d-flex align-items-center justify-content-end gap-2 col-md-3 order-1">
            <div className="d-flex gap-2">
              <div>
                <Form.Control
                  type="search"
                  className="search-bar"
                  aria-label="Search here..."
                  placeholder="Search..."
                  value={searchTitle}
                  onChange={(e) => {
                    setSearchTitle(e.target.value);
                    setSearch(e.target.value);
                    setSearchLoading(true);
                  }}
                />
              </div>
              <div className="d-flex">
                {name ? (
                  <>
                    <NavLink to="/cart">
                      <img
                        width="30px"
                        src={require("../../../Assets/shopping-cart.png")}
                        alt="Cart"
                      />
                    </NavLink>
                    <span>{cartLength}</span>
                  </>
                ) : (
                  <></>
                )}
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

                {name ? (
                  <>
                    <Dropdown.Item>
                      <NavLink to="/profile" style={{ color: "black" }}>
                        Profile
                      </NavLink>
                    </Dropdown.Item>
                    {name.role === "1995" && (
                      <div>
                        <Dropdown.Item>
                          <NavLink
                            to="/dashboard/activity"
                            className="text-black"
                          >
                            Dashboard
                          </NavLink>
                        </Dropdown.Item>
                      </div>
                    )}
                    <Dropdown.Item>
                      <NavLink to="/orders" style={{ color: "black" }}>
                        My Orders
                      </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item>
                    <NavLink to="../login" style={{ color: "black" }}>
                      Login / Register
                    </NavLink>
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      {searchLoading ? (
        <tr style={{ textAlign: "center" }}>
          <td colSpan={12}>Searching...</td>
        </tr>
      ) : (
        <div
          onClick={() => {
            setSearch("");
            setSearchTitle("");
          }}
          className="search-bar position-sticky overflow-y-scroll"
        >
          {dataShow}
        </div>
      )} */}
    </Container>
  );
}
