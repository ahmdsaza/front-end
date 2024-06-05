import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../../API/axios";
import { CATEGORIES } from "../../../API/Api";
import StringSlice from "../../../helpers/StringSlice";
import SkeletonShow from "../Skeleton/SkeletonShow";
import "./TheNavBar.css";

export default function TheNavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((res) => setCategories(res.data.slice(-8)))
      .finally(() => setLoading(false));
  }, []);

  const categoriesShow = categories.map((category) => (
    <Link to={`/category/${category.id}`} className=" m-0 category-title px-3">
      {StringSlice(category.title, 15)}
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

          <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
            <Link to="/cart">
              <img
                width="30px"
                src={require("../../../Assets/shopping-cart.png")}
                alt="Cart"
              />
            </Link>
            <Link to="/dashboard">
              <img
                width="30px"
                src={require("../../../Assets/profile.png")}
                alt="Cart"
              />
            </Link>
          </div>
        </div>
        <div className="mt-3">
          <div className="category d-flex align-items-center justify-content-start gap-5 flex-wrap">
            {loading ? (
              <>
                <SkeletonShow length="7" height="30px" width="80px" />
              </>
            ) : (
              categoriesShow
            )}
            <Link className="text-black category-title" to="/categories">
              Show All
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
}
