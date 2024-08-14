import React, { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { PRODUCT, CART, USER, RATES } from "../../../../API/Api";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProductsPage.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [addtocart, setAddtoCart] = useState("");
  const [user, setUser] = useState("");
  const [err, setErr] = useState("");
  const [showRate, setShowRate] = useState([]);

  // Rate
  let ratingStar = 0;
  let ratingCount = 0;
  let theLength = 0;
  // Call Rate
  useEffect(() => {
    Axios.get(`${RATES}/${id}`)
      .then((data) => setShowRate(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Get Product by id
  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Get User
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUser(data.data))
      .catch((err) => console.log(err));
  }, []);

  async function submitToCart(e) {
    e.preventDefault();
    const data = {
      user_id: user.id,
      product_id: products[0].id,
      product_qty: count,
      product_image: products[0].images[0].image,
    };

    try {
      if (user) {
        Axios.post(`${CART}`, data)
          .then(setAddtoCart("Product add to cart successfully"))
          .then(
            setTimeout(() => {
              window.location.reload();
            }, 500)
          )
          .catch((err) => {
            if (err.response.status === 420) {
              setErr("No qunatity enough");
            } else {
              setErr("Something went worng");
            }
          });
      } else {
        alert("Login To add Products to Cart");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const showRateData = showRate.map((item) => {
    theLength = showRate.length;
    ratingCount += item.product_rate;
    ratingStar = ratingCount / theLength;

    return (
      <div className="d-flex flex-column align-items-center">
        <p>Description: {item.description}</p>
        <p>Rate: {item.product_rate}</p>
      </div>
    );
  });

  const roundStars = Math.round(ratingStar);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));

  const showData = products.map((item, key) => (
    <div className="product-div" key={item.id + key}>
      <div class="product-img">
        <img src={item.images[0].image} alt="" />
      </div>
      <div class="product-side">
        <div class="product-description">
          {showGoldStars}
          {showEmptyStars}
          <span className="product-category">{item.category.title}</span>
          <h1 className="product-title">{item.title}</h1>
          <p className="product-description">{item.description}</p>
        </div>
        <div class="product-prices">
          <span className="product-discount">${item.discount}</span>
          <span className="product-price">${item.price}</span>
        </div>
        <div class="cart-btn">
          <div className="count-div">
            <input
              className="sum"
              type="button"
              value=" - "
              disabled={count < 2}
              onClick={() => {
                setCount((prev) => prev - 1);

                /* decrease 1 to quantity*/
              }}
            />
            <span className="count">{count}</span> {/* product Quantity */}
            <input
              className="minus"
              type="button"
              value=" + "
              disabled={count === item.qty}
              onClick={() => {
                setCount((prev) => prev + 1);

                /* increase 1 to quantity*/
              }}
            />
          </div>
          <button className="addToCart" onClick={submitToCart}>
            Add to cart
          </button>
        </div>
        {err ? (
          <div className="d-flex justify-content-center">
            <span className="d-flex alert alert-danger mt-2 justify-content-center ">
              {err}
            </span>
          </div>
        ) : addtocart !== "" ? (
          <div className="d-flex justify-content-center">
            <span className="d-flex alert alert-success mt-2 justify-content-center ">
              {addtocart}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  ));

  return (
    <Container>
      <div>
        {showData}
        {showRateData}
      </div>
    </Container>
  );
}
