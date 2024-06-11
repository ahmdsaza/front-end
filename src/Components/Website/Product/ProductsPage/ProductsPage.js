import React, { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { PRODUCT, Cart, USER } from "../../../../API/Api";
import { Link, useParams } from "react-router-dom";
import "./ProductsPage.css";
import { Container } from "react-bootstrap";
import Footer from "../../Footer/Footer";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [cart, setCart] = useState();
  const [addtocart, setAddtoCart] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Get User Name
  // useEffect(() => {
  //   Axios.get(`${USER}`)
  //     .then((data) => setName(data.data.name))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUser(data.data))
      .catch((err) => console.log(err));
  }, []);

  // console.log(user);

  async function addToCart() {
    try {
      if (user) {
        Axios.post(`${Cart}`)
          .then((data) => {
            setCart(data.data);
            setAddtoCart("Product add to cart successfully");
          })
          .catch((err) => console.log(err));
      } else {
        alert("Login To add Products to Cart");
      }
    } catch (err) {
      console.log(err);
    }
  }

  console.log(cart);

  const showData = products.map((item) => (
    <Container>
      <div className="product-div">
        <div class="product-img">
          <img src={item.images[0].image} alt="" />
        </div>
        <div class="product-side">
          <div class="product-description">
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
                }}
              />
              <span className="count">{count}</span>
              <input
                className="minus"
                type="button"
                value=" + "
                onClick={() => {
                  setCount((prev) => prev + 1);
                }}
              />
            </div>
            <button className="addToCart" onClick={addToCart}>
              Add to cart
            </button>
          </div>
          {addtocart !== "" && (
            <div className="d-flex justify-content-center">
              <span className="d-flex alert alert-success mt-2 justify-content-center ">
                {addtocart}
              </span>
            </div>
          )}
        </div>
      </div>
    </Container>
  ));

  return (
    <div>
      {showData}
      <Footer />
    </div>
  );
}
