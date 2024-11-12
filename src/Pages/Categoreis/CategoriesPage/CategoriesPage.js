import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { CATEGORY, categorry } from "../../../API/Api";
import { NavLink, useParams } from "react-router-dom";
import "../../../Components/Website/Product/AllProducts/AllProducts.css";
import { Container } from "react-bootstrap";
import PaginatedItems from "../../../Components/Dashboard/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkeletonShow from "../../../Components/Website/Skeleton/SkeletonShow";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("created_at");
  const [type, setType] = useState("asc");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  // Get Title
  useEffect(() => {
    Axios.get(`${categorry}/${id}`)
      .then((data) => setTitle(data.data.title))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    Axios.get(
      `${CATEGORY}/${id}?sort=${sort}&type=${type}&limit=${limit}&page=${page}`
    )
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err));
  }, [limit, page, sort, type, id]);

  const showData = categories.map((item, key) => {
    const roundStars = Math.round(item.rating);
    const stars = Math.min(roundStars, 5);
    const showGoldStars = Array.from({ length: stars }).map((_, index) => (
      <FontAwesomeIcon key={index} icon={solid} style={{ color: "FFC100" }} />
    ));
    const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
      <FontAwesomeIcon key={index} icon={regularStar} />
    ));

    return (
      <NavLink
        to={`../products/${item.slug}`}
        className={`col-12 ${
          window.innerWidth > 1400 ? "col-xl-3" : "col-xl-4"
        } col-lg-5 col-md-6  my-2`}
        key={item.index}
      >
        <div className="cards bg-white">
          <div>
            <div className="p-2 position-relative">
              {item.discount > 0 && (
                <p
                  className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block
                  text-center"
                  style={{ width: "50px", height: "50px", lineHeight: "50px" }}
                >
                  Sale
                </p>
              )}
              <div>
                <img
                  src={
                    item?.images[1]?.image
                      ? item?.images[1]?.image
                      : item?.images[0]?.image
                  }
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    height: "300px",
                    width: "270px",
                    borderRadius: "5px",
                  }}
                  alt={item.title}
                  loading="lazy"
                />
              </div>
            </div>
            <h4
              className="mx-2 text-black d-flex justify-content-center"
              style={{ color: "gray", maxWidth: "300px" }}
            >
              {item.title}
            </h4>
          </div>
          <div className="d-flex align-items-center justify-content-between pt-4 border-top">
            <div className="text-black">
              {showGoldStars}
              {showEmptyStars}
              <small className="mx-1 fw-bold">({item.ratings_number})</small>
              <div className="d-flex align-items-center gap-3">
                {/* <h5 className="m-0 text-primary">{item.discount}$</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {item.price}$
              </h6> */}
                {item.discount > 0 ? (
                  <>
                    {" "}
                    <h5 className="m-0 text-black">{item.discount}$</h5>
                    <h6
                      className="m-0"
                      style={{ color: "gray", textDecoration: "line-through" }}
                    >
                      {item.price}$
                    </h6>
                  </>
                ) : (
                  <>
                    {" "}
                    <h5 className="m-0 text-black">{item.price}$</h5>
                  </>
                )}
              </div>
            </div>
            <div className="border p-2 rounded">
              {/* <Link to={`products/${item.id}`}> */}
              <img
                src={require("../../../Assets/shopping-cart.png")}
                alt="cart"
                width="20px"
              />
              {/* </Link> */}
            </div>
          </div>
        </div>
      </NavLink>
    );
  });

  function handleInputChange(e) {
    const { value } = e.target;
    setSort(value.slice(4, 20));
    setType(value.slice(0, 4));
  }

  return (
    <Container>
      <h1 className="page-title">{title}</h1>
      <div>
        <Form.Select
          onChange={(e) => {
            handleInputChange(e);
          }}
          aria-label="Default select example"
          className="w-25"
        >
          <option value="asc created_at">Default</option>
          <option value="asc discount">Price low-high</option>
          <option value="descdiscount">Price high-low</option>
          <option value="asc title" name="asc">
            Name A-Z
          </option>
          <option value="desctitle" name="desc">
            Name Z-A
          </option>
        </Form.Select>
      </div>
      <div className="d-flex justify-content-center flex-wrap mt-3">
        {loading ? (
          <SkeletonShow
            length="8"
            height="400px"
            baseColor="white"
            classes="col-12 col-md-5 col-lg-3 p-3"
          />
        ) : (
          showData
        )}
      </div>
      <div className="pagination-display">
        <div className="">
          <Form.Select
            onChange={(e) => setLimit(e.target.value)}
            aria-label="Default select example"
          >
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="24">24</option>
          </Form.Select>
        </div>
        <div className="page">
          <PaginatedItems
            setPage={setPage}
            itemsPerPage={limit}
            total={total}
            typeName={"title"}
          />{" "}
        </div>
      </div>
    </Container>
  );
}
