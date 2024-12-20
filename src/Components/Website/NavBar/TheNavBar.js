import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Axios } from "../../../API/axios";
import {
  PRODUCT,
  LOGOUT,
  USER,
  CARTLENGTH,
  CATEGORIES,
} from "../../../API/Api";
// import SkeletonShow from "../Skeleton/SkeletonShow";
import Cookie from "cookie-universal";
import { CartExport } from "../../../Context/CartContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./TheNavBar.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Prev } from "react-bootstrap/esm/PageItem";

export default function TheNavBar() {
  const [name, setName] = useState("");
  const [search, setSearch] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [cartLength, setCartLength] = useState();
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const showEmpty = [];
  const [categories, setCategories] = useState([]);
  const [isShowingData, setIsShowingData] = useState(true);

  const { isChange } = useContext(CartExport);

  const cookie = Cookie();

  // Get User Name
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setName(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((data) => setCategories(data.data))
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

  function clearSearchBar() {
    setSearch("");
    setSearchTitle("");
    setIsShowingData(false);
  }

  const dataShow = showWichData.map((item, key) => (
    <div key={key} onClick={handleClickSearch}>
      <NavLink to={`./products/${item.slug}`}>
        <div className="search-bar-data">
          <img
            src={
              item?.images[1]?.image
                ? item?.images[1]?.image
                : item?.images[0]?.image
            }
            className="search-img"
            alt={item.title}
            loading="lazy"
          />
          <div>
            <p className="search-title">
              {item.title.length > 30
                ? item.title.slice(0, 30) + "..."
                : item.title}
            </p>
            <p className="search-price">
              ${item.discount > 0 ? item.discount : item.price}
            </p>
          </div>
        </div>
      </NavLink>
    </div>
  ));

  return (
    <div className="navbar-body">
      <Container>
        <Navbar expand="xl" className=" bg-blue" collapseOnSelect>
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
                  loading="lazy"
                />{" "}
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Offcanvas placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Ahmed Store</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1">
                  <Nav.Link href="#" collapseOnSelect>
                    <NavLink
                      to={"../"}
                      className="text-black text-decoration-none category-title"
                    >
                      Home
                    </NavLink>
                  </Nav.Link>
                  <Nav.Link href="#" collapseOnSelect>
                    <NavLink
                      to={"../Categories"}
                      className="text-black text-decoration-none category-title"
                    >
                      Categories
                    </NavLink>
                  </Nav.Link>
                  {categories?.map((item) => (
                    <Nav.Link href="#" collapseOnSelect>
                      <NavLink
                        to={`../Categories/${item.id}`}
                        className="text-black text-decoration-none category-title"
                      >
                        {item.title}
                      </NavLink>
                    </Nav.Link>
                  ))}
                </Nav>
                {name ? (
                  <div
                    className={`${
                      window.innerWidth > 1200 ? "d-flex" : ""
                    } gap-2`}
                  >
                    <Nav.Link className="m-2" href="#" collapseOnSelect>
                      <NavLink to="/cart">
                        <img
                          width="30px"
                          src={require("../../../Assets/shopping-cart.png")}
                          alt="Cart"
                          loading="lazy"
                        />
                      </NavLink>
                      <span>{cartLength}</span>
                    </Nav.Link>{" "}
                    <NavDropdown
                      title={<FontAwesomeIcon icon={faUser} />}
                      className="m-2 fs-5"
                    >
                      <NavDropdown.Item href="#" collapseOnSelect>
                        <NavLink
                          to={"../profile"}
                          className="text-black d-block"
                        >
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
                        <NavLink
                          to={"../orders"}
                          className="text-black d-block"
                        >
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
                  <NavDropdown
                    title={<FontAwesomeIcon icon={faUser} />}
                    className="m-2 fs-5"
                  >
                    <NavDropdown.Item>
                      <NavLink to={"../login"} className="text-black d-block">
                        Login / Register{" "}
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        <div className="d-flex justify-content-center align-items-center px-3">
          {" "}
          <Form.Control
            type="text"
            className="search-bar"
            aria-label="Search here..."
            placeholder="Search..."
            value={searchTitle}
            onChange={(e) => {
              setSearchTitle(e.target.value);
              setSearch(e.target.value);
              setSearchLoading(true);
            }}
            onClick={() => setIsShowingData(true)}
          />{" "}
          {/* <button onClick={() => setIsShowingData(false)}>Close</button> */}
          {searchTitle.length > 3 ? (
            <i
              class="material-icons search-bar-close text-secondary"
              onClick={clearSearchBar}
            >
              close
            </i>
          ) : null}
        </div>
        <div
          className={`navbarsearch ${
            searchTitle.length > 3 ? "position-absolute" : "d-none"
          }`}
        >
          {searchTitle.length > 3 && isShowingData ? dataShow : <></>}
        </div>
      </Container>
    </div>
  );
}
