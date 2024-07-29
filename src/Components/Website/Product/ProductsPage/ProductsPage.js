import React, { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { PRODUCT, CART, USER } from "../../../../API/Api";
import { useParams } from "react-router-dom";
import "./ProductsPage.css";
import { Container } from "react-bootstrap";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [addtocart, setAddtoCart] = useState("");
  const [user, setUser] = useState("");

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
          .catch((err) => console.log(err));
      } else {
        alert("Login To add Products to Cart");
      }
    } catch (err) {
      console.log(err);
    }
  }

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
              <span className="count">{count}</span> {/* product Quantity */}
              <input
                className="minus"
                type="button"
                value=" + "
                disabled={count === item.qty}
                onClick={() => {
                  setCount((prev) => prev + 1);
                }}
              />
            </div>
            <button className="addToCart" onClick={submitToCart}>
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

  return <div>{showData}</div>;
}
