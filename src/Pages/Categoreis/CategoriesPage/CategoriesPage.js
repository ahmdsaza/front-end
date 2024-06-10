import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { CATEGORY, categorry } from "../../../API/Api";
import { Link, useParams } from "react-router-dom";
import "../../../Components/Website/Product/AllProducts/AllProducts.css";
import { Container } from "react-bootstrap";
import Footer from "../../../Components/Website/Footer/Footer";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState();
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(3);
  // const [total, setTotal] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    Axios.get(`${CATEGORY}/${id}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Get Title
  useEffect(() => {
    Axios.get(`${categorry}/${id}`)
      .then((data) => setTitle(data.data.title))
      .catch((err) => console.log(err));
  }, []);

  // console.log(title);

  // useEffect(() => {
  //   Axios.get(`${CATEGORY}/${id}?limit=${limit}&page=${page}`)
  //     .then((data) => {
  //       setCategories(data.data);
  //       setTotal(data.total);
  //     })
  //     .catch((err) => console.log(err));
  // }, [limit, page]);

  // console.log(categories);

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

  // const titleCat = categories[0].title;

  return (
    <div>
      <Container>
        <h1 className="page-title">{title}</h1>
        <div className="crd">{showData}</div>
        {/* <div className="test">
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
        </div>*/}
        <Footer />
      </Container>
    </div>
  );
}
