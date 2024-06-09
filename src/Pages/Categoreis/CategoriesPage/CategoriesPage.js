import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { PRODUCTS, CATEGORY } from "../../../API/Api";
import { Link, useParams } from "react-router-dom";
import "../../../Components/Website/Product/AllProducts/AllProducts.css";
import { Container, Form } from "react-bootstrap";
import PaginatedItems from "../../../Components/Dashboard/Pagination/Pagination";
import Footer from "../../../Components/Website/Footer/Footer";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(12);
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  //   useEffect(() => {
  //     Axios.get(`${PRODUCTS}?where_category_id=${id}`)
  //       .then((data) => setProducts(data.data))
  //       .catch((err) => console.log(err));
  //   }, [limit]);

  useEffect(() => {
    Axios.get(`${CATEGORY}/${id}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  //   console.log(categories[0].images[0].image);

  const showData = categories.map((item, key) => (
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
                  src={require("../../../Assets/shopping-cart.png")}
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
    <div>
      <Container>
        <h1 className="page-title">All Products</h1>
        <div className="crd">{showData}</div>
        <div className="test">
          {/* <div className="">
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
          </div>*/}
        </div>
        <Footer />
      </Container>
    </div>
  );
}
