import React, { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { PRODUCT, CART, USER, CARTS } from "../../../../API/Api";
import { useParams } from "react-router-dom";
import "./ProductsPage.css";
import { Container } from "react-bootstrap";
import Footer from "../../Footer/Footer";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [count, setCount] = useState(1);
  // const [carts, setCarts] = useState([]);
  const [addtocart, setAddtoCart] = useState("");
  // const [checkCart, setCheckCart] = useState(false);
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

  // Number of Items in Cart
  // useEffect(() => {
  //   Axios.get(`${CARTS}`)
  //     .then((data) => setCarts(data.data))
  //     .catch((err) => console.log(err));
  // }, [checkCart]);

  // async function addToCart() {
  //   try {
  //     if (user) {
  //       Axios.post(`${CART}`)
  //         .then((data) => {
  //           setCart(data.data);
  //           setAddtoCart("Product add to cart successfully");
  //         })
  //         .catch((err) => console.log(err));
  //     } else {
  //       alert("Login To add Products to Cart");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // Add to Cart
  // async function submitToCart(e) {
  //   e.preventDefault();

  //   const data = {
  //     user_id: user.id,
  //     product_id: products[0].id,
  //     product_qty: count,
  //   };
  //   try {
  //     if (user) {
  //       Axios.post(`${CART}`, data)
  //         .then((data) => {
  //           setCart(data.data);
  //           setAddtoCart("Product add to cart successfully");
  //         })
  //         .catch((err) => console.log(err));
  //     } else {
  //       alert("Login To add Products to Cart");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // console.log(products[0].images[0].image);

  async function submitToCart(e) {
    e.preventDefault();

    const data = {
      user_id: user.id,
      product_id: products[0].id,
      product_qty: count,
      product_image: products[0].images[0].image,
    };
    console.log(products[0].images[0].image);

    // "SQLSTATE[22001]: String data, right truncated: 1406 Data too long for column 'product_image' at row 1 (Connection: mysql, SQL: insert into `carts` (`user_id`, `product_id`, `product_qty`, `product_image`, `updated_at`, `created_at`) values (3, 518, 3, http://127.0.0.1:8000/images/20240604082801.jpg, 2024-06-23 18:02:39, 2024-06-23 18:02:39))"

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
