import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { CATEGORY, categorry } from "../../../API/Api";
import { Link, useParams } from "react-router-dom";
import "../../../Components/Website/Product/AllProducts/AllProducts.css";
import { Container } from "react-bootstrap";
import PaginatedItems from "../../../Components/Dashboard/Pagination/Pagination";
import Form from "react-bootstrap/Form";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [total, setTotal] = useState(0);

  const { id } = useParams();

  // Get Title
  useEffect(() => {
    Axios.get(`${categorry}/${id}`)
      .then((data) => setTitle(data.data.title))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`${CATEGORY}/${id}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err));
  }, [limit, page]);

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
              <Link to={`../products/${item.id}`}>
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
        <h1 className="page-title">{title}</h1>
        <div className="crd">{showData}</div>
        <div className="test">
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
    </div>
  );
}
