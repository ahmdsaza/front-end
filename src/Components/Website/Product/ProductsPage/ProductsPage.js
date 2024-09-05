import React, { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { PRODUCT, CART, USER, RATES } from "../../../../API/Api";
import { useParams } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
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
  const [showSize, setShowSize] = useState([]);
  const [showRateNumber, setShowRateNumber] = useState(0);
  const [sizeChoice, setSizeChoice] = useState(0);

  // Call Rate
  useEffect(() => {
    Axios.get(`${RATES}/${id}`)
      .then((data) => setShowRate(data.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Get Product by id
  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((data) => {
        setProducts(data.data);
        setShowRateNumber(data.data[0].rating);
        setShowSize(data.data[0].sizes);
      })
      .catch((err) => console.log(err));
  }, [id, sizeChoice]);

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
      product_image: products[0].id,
      product_size: sizeChoice,
    };

    try {
      if (user) {
        Axios.post(`${CART}`, data)
          .then(setAddtoCart("Product add to cart successfully"))
          // .then(
          //   setTimeout(() => {
          //     window.location.reload();
          //   }, 500)
          // )
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

  function handleSize(e) {
    setSizeChoice(e.target.value);
  }

  const roundStars = Math.round(showRateNumber);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solid} style={{ color: "FFC100" }} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));

  const showRateData = showRate.map((item) => {
    const roundStarsRate = Math.round(item.product_rate);
    const starsRate = Math.min(roundStarsRate, 5);
    const showGoldStarsRate = Array.from({ length: starsRate }).map(
      (_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={solid}
          style={{ color: "FFC100", fontSize: "12px" }}
        />
      )
    );
    const showEmptyStarsRate = Array.from({ length: 5 - starsRate }).map(
      (_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={regularStar}
          style={{ fontSize: "12px" }}
        />
      )
    );

    return (
      <div>
        <div className="card mt-3">
          <div className="rate-div">
            <div>
              <img
                width="50px"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt={item.users[0].name}
              />
            </div>
            <div>
              <p className="fw-bold">{item.users[0].name}</p>
              {showGoldStarsRate}
              {showEmptyStarsRate}
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const showData = products.map((item, key) => {
    {
      showSize.map((item) => (
        <option key={key} name="name" value={item.id} onChange={handleSize}>
          {item.id}
        </option>
      ));
    }

    return (
      <div className="product-div">
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
          </div>{" "}
          {showSize.length > 0 ? (
            <>
              <Form.Select onClick={handleSize}>
                {showSize.map((item, key) => (
                  <option className="size" key={key} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </>
          ) : (
            <></>
          )}
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
    );
  });

  console.log(showRate);
  return (
    <Container>
      {showData}
      {showRate.length > 0 ? (
        <div>
          <h1 className="text-center mt-3">Reviews</h1>
          <div> {showRateData}</div>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
}
