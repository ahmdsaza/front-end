import React, { useContext, useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Axios } from "../../../API/axios";
import { PRODUCT, LOGOUT, USER, CARTLENGTH } from "../../../API/Api";
// import SkeletonShow from "../Skeleton/SkeletonShow";
import Cookie from "cookie-universal";
import { CartExport } from "../../../Context/CartContext";
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

  const dataShow = showWichData.map((item, key) => (
    <div key={key}>
      <NavLink to={`./products/${item.slug}`}>
        <div className="search-abs">
          <div className="search-bar-data">
            <img
              src={item.images[0].image}
              className="search-img"
              alt={item.title}
            />
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
      <div className="py-3">
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
      )}
    </Container>
  );
}
