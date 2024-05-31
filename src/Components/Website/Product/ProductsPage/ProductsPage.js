import React, { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { PRODUCT } from "../../../../API/Api";
import { useParams } from "react-router-dom";
import "./ProductsPage.css";
import { Container } from "react-bootstrap";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(products);

  const showData = products.map((item) => (
    <Container>
      <div className="d-flex flex-wrap align-items-center justify-content-around">
        <div className="">
          <img className="img" src={item.images[0].image} alt="Just an img" />
        </div>
        <div className="info">
          <h1 className="m-0">{item.title}</h1>
          <p>{item.rating}</p>
          <p className="">{item.description}</p>
          <span className="" style={{ textDecoration: "line-through" }}>
            ${item.price}
          </span>
          <span>${item.discount}</span>
        </div>
      </div>
    </Container>
  ));

  console.log(showData);
  return <div>{showData}</div>;
}
