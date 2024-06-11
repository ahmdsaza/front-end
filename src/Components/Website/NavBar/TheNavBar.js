import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../../../API/axios";
import { CATEGORIES, LOGOUT, USER } from "../../../API/Api";
// import StringSlice from "../../../helpers/StringSlice";
import SkeletonShow from "../Skeleton/SkeletonShow";
import Cookie from "cookie-universal";
import "./TheNavBar.css";

export default function TheNavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const cookie = Cookie();
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((res) => setCategories(res.data.slice(-8)))
      .finally(() => setLoading(false));
  }, []);

  const [name, setName] = useState("");

  // Get User Name
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setName(data.data.name))
      .catch((err) => console.log(err));
  }, []);

  async function handleLogout() {
    try {
      const res = await Axios.get(`${LOGOUT}`);
      cookie.remove("e-commerce");
      window.location.pathname = "/";
    } catch (err) {
      console.log(err);
    }
  }

  const categoriesShow = categories.map((category) => (
    <Link
      to={`/categories/${category.id}`}
      className=" m-0 category-title px-3"
    >
      {/* {StringSlice(category.title, 15)} */}
      {category.title}
    </Link>
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
          <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
            <Form.Control
              type="search"
              className="form-control custom-search py-3 rounded-0"
            />
            <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center justify-content-center">
              Search
            </h3>
          </div>

          <div className="col-3 d-flex align-items-center justify-content-end gap-2 order-md-3 order-1">
            <div className="d-flex">
              <Link to="/cart">
                <img
                  width="30px"
                  src={require("../../../Assets/shopping-cart.png")}
                  alt="Cart"
                />
              </Link>
              <span>3</span>
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
                  {name}
                </Dropdown.Item>
                {name ? (
                  <Dropdown.Item>
                    <Link to="/dashboard" style={{ color: "black" }}>
                      Dashboard
                    </Link>
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item>
                    <Link to="login" style={{ color: "black" }}>
                      Login / Register
                    </Link>
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="mt-3">
          <div className="category d-flex align-items-center justify-content-start gap-5 flex-wrap">
            {/**/}{" "}
            {loading ? (
              <>
                <SkeletonShow length="7" height="30px" width="80px" />
              </>
            ) : (
              categoriesShow
            )}
            <Link className="text-black category-title" to="/categories">
              Show all Categories
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
}
