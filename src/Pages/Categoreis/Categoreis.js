import React, { useEffect, useState } from "react";
import { Axios } from "../../API/axios";
import { CATEGORIES } from "../../API/Api";
import { Container } from "react-bootstrap";
import SkeletonShow from "../../Components/Website/Skeleton/SkeletonShow";
import { Link } from "react-router-dom";
import "./categories.css";

export default function WebsiteCategoreis() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((res) => setCategories(res.data))
      .then((document.title = "Ahmed store | Categories"))
      .finally(() => setLoading(false));
  }, []);

  const showCategories = categories.map((item) => (
    <div className="mt-3">
      <div className="category-card m-1 p-1 bg-white border d-flex align-items-center justify-content-center rounded">
        <Link to={`${item.id}`}>
          <div className="category-image-div">
            <img
              className="category-products-image"
              src={item.image}
              alt={item.title}
              loading="lazy"
            />
          </div>
          <p className="catTitle text-center text-black">{item.title}</p>
        </Link>
      </div>
    </div>
  ));
  return (
    <Container>
      <div className="py-5">
        <h1 className="text-center">Categories</h1>
        <div className="d-flex align-items-center justify-content-center flex-wrap row-gap-5">
          {loading ? (
            <SkeletonShow
              length="5"
              height="150px"
              baseColor="white"
              classes="col-lg-2 col-md-6 col-12"
            />
          ) : (
            showCategories
          )}
        </div>
      </div>
    </Container>
  );
}
