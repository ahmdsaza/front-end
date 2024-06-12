import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { Container } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { CARTS, USER } from "../../../API/Api";
import "./cart.css";

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUser(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`${CARTS}`)
      .then((data) => setCarts(data.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(carts);

  const showCart = carts.map((item) => (
    <div className="card w-100 d-flex flex-row justify-content-start p-3">
      <p>ID:{item.id}</p>
      <p>Product:{item.product_id}</p>
      <p>User Id: {item.user_id}</p>
    </div>
  ));

  return (
    <Container>
      <h1 className="d-flex justify-content-center">Shopping Cart</h1>
      <div className="cardStyle d-flex flex-column align-items-center justify-content-center h-100 mt-4">
        {showCart}
      </div>
      <Footer />
    </Container>
  );
}
