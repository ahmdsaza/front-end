import React, { useEffect, useState } from "react";
import { PRODUCTS } from "../../../../API/Api";
import { Axios } from "../../../../API/axios";
import "./AllProducts.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AllProducts() {
  //States
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Axios.get(`${PRODUCTS}?limit=${6}&page=${18}`)
      .then((data) => setProducts(data.data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const showProducts = products.map((item, key) => (
    <div key={key}>
      <div className="crd1">
        <div className="product-in-crd">
          <img
            className="product-image"
            src={item.images[0].image}
            alt="Just an img"
          />
          <div className="product-info">
            <p className="product-title">{item.title}</p>
            <div className="product-icon">
              <div className="prod-price">
                <div className="product-price">${item.price}</div>
                <div className="product-discount">${item.discount}</div>
              </div>
              <Link to={`products/${item.id}`}>
                <img
                  src={require("../../../../Assets/shopping-cart.png")}
                  alt="cart"
                  width="20px"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <Container>
      <h1 className="page-title">All Products</h1>
      <div className="crd">{showProducts}</div>
    </Container>
  );
}
