import React, { useEffect, useState } from "react";
import { PRODUCTS } from "../../../../API/Api";
import { Axios } from "../../../../API/axios";
import "./AllProducts.css";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";
import PaginatedItems from "../../../Dashboard/Pagination/Pagination";

export default function AllProducts() {
  //States
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Axios.get(`${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  console.log(total);

  const showProducts = products.map((item, key) => (
    <div key={key}>
      <div className="crd1">
        <div className="products-in-crd">
          <img
            className="products-image"
            src={item.images[0].image}
            alt="Just an img"
          />
          <div className="products-info">
            <p className="products-title">{item.title}</p>
            <div className="products-icon">
              <div className="prod-price">
                <div className="products-price">${item.price}</div>
                <div className="products-discount">${item.discount}</div>
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
      <div className="test">
        <div className="">
          <Form.Select
            onChange={(e) => setLimit(e.target.value)}
            aria-label="Default select example"
          >
            <option value="12">12</option>
            <option value="25">25</option>
            <option value="50">50</option>
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
      <Footer />
    </Container>
  );
}
