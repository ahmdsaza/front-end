import React, { useEffect, useState } from "react";
import "./rating.css";
import { useParams } from "react-router-dom";
import { PRODUCT, USER, RATE } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Container } from "react-bootstrap";

export default function Rating() {
  const { id } = useParams();
  const [rate, setRate] = useState(5);
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState("");
  const [addRate, setAddRate] = useState("");
  const [description, setDescription] = useState("");

  // Get Product by id
  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Get User
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUser(data.data))
      .catch((err) => console.log(err));
  }, []);
  // console.log(products[0].id);

  async function submitRate(e) {
    e.preventDefault();
    const datarate = {
      user_id: user.id,
      product_id: products[0].id,
      product_rate: rate * 1,
      description: description,
      status: 1,
    };

    try {
      if (user) {
        Axios.post(`${RATE}`, datarate)
          .then(setAddRate("Rate add successfully"))
          .catch((err) => console.log(err));
      } else {
        alert("Some thing wrong try later");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const showData = products.map((item, key) => (
    <Container key={item.id + key}>
      <div className="product-div">
        <div class="product-img">
          <img src={item.images[0].image} alt="" />
        </div>
        <div class="product-side">
          <div class="product-description">
            <span className="product-category">{item.category.title}</span>
            <h1 className="product-title">{item.title}</h1>
            {/* <p className="product-description">{item.description}</p> */}
          </div>
          <div class="product-prices">
            <span className="product-discount">${item.discount}</span>
            <span className="product-price">${item.price}</span>
          </div>
        </div>
      </div>
    </Container>
  ));

  return (
    <div>
      <div>{showData}</div>
      <form className="d-flex flex-column align-items-lg-start">
        <div class="rate">
          <input
            type="radio"
            id="star5"
            name="rate"
            value={5}
            onClick={(e) => setRate(e.target.value)}
          />
          <label for="star5" title="text">
            5 stars
          </label>
          <input
            type="radio"
            id="star4"
            name="rate"
            value="4"
            onClick={(e) => setRate(e.target.value)}
          />
          <label for="star4" title="text">
            4 stars
          </label>
          <input
            type="radio"
            id="star3"
            name="rate"
            value="3"
            onClick={(e) => setRate(e.target.value)}
          />
          <label for="star3" title="text">
            3 stars
          </label>
          <input
            type="radio"
            id="star2"
            name="rate"
            value="2"
            onClick={(e) => setRate(e.target.value)}
          />
          <label for="star2" title="text">
            2 stars
          </label>
          <input
            type="radio"
            id="star1"
            name="rate"
            value="1"
            onClick={(e) => setRate(e.target.value)}
          />
          <label for="star1" title="text">
            1 star
          </label>
        </div>
        <div className="d-flex">
          <textarea
            type="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <button onClick={submitRate}>Submit</button>
        </div>
      </form>
      {err ? (
        <div className="d-flex justify-content-center">
          <span className="d-flex alert alert-danger mt-2 justify-content-center ">
            {err}
          </span>
        </div>
      ) : addRate !== "" ? (
        <div className="d-flex justify-content-center">
          <span className="d-flex alert alert-success mt-2 justify-content-center ">
            {addRate}
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
