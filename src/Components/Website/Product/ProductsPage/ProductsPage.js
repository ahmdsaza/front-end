import React, { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { PRODUCT } from "../../../../API/Api";
import { Link, useParams } from "react-router-dom";
import "./ProductsPage.css";
import { Container } from "react-bootstrap";
import Footer from "../../Footer/Footer";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [count, setCount] = useState(1);

  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(products);

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
            <Link to="/" className="addToCart">
              Add to cart
            </Link>
          </div>
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
