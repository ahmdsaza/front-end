import React, { useEffect, useState } from "react";
import "./rating.css";
import { useParams } from "react-router-dom";
import { PRODUCT, USER, RATE } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Rating() {
  const { id } = useParams();
  const [rate, setRate] = useState(5);
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);
  const [description, setDescription] = useState("");
  const [sent, setSent] = useState(false);

  // Get Product by id
  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
    document.title = `Ahmed store | Rating`;
  }, [id]);

  // Get User
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUser(data.data))
      .catch((err) => console.log(err));
  }, []);

  async function submitRate(e) {
    e.preventDefault();
    const datarate = {
      user_id: user.id,
      product_id: products[0].id,
      product_slug: products[0].slug,
      product_rate: rate * 1,
      description: description,
      status: 1,
    };

    try {
      if (user) {
        Axios.post(`${RATE}`, datarate)
          .then(toast.success("Your rate add successfully"), {
            autoClose: 2000,
          })
          .then(setSent("true"))
          .catch((err) => console.log(err));
      } else {
        toast.error("Some thing wrong try later", {
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const showData = products.map((item, key) => (
    <Container key={item.id + key}>
      <div className="row">
        <div className="col">
          <div className="product-img-rate">
            <img src={item.images[0].image} alt="" />
          </div>
        </div>
        <div className="product-side">
          <div className="product-description">
            <span className="product-category">{item.category.title}</span>
            <h1 className="product-title">{item.title}</h1>
            <p className="product-description">{item.description}</p>
          </div>
          <div className="product-prices">
            {item.discount > 0 ? (
              <>
                <span className="product-discount">${item.discount}</span>
                <span className="product-price">${item.price}</span>
              </>
            ) : (
              <>
                <span className="product-discount">${item.price}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  ));

  return (
    <div className="d-flex flex-column">
      <ToastContainer />
      <div>{showData}</div>
      <form className="d-flex flex-column align-items-center">
        <div className="rate">
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
        <textarea
          className="w-50 align-self-center"
          type="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button
          onClick={submitRate}
          disabled={sent}
          className="align-self-center btn btn-primary"
        >
          Send rate
        </button>
      </form>
    </div>
  );
}
