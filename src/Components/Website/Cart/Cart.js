import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { Container } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { CARTS } from "../../../API/Api";
import "./cart.css";

export default function Cart() {
  const [carts, setCarts] = useState([]);

  // Call Cart
  useEffect(() => {
    Axios.get(`${CARTS}`)
      .then((data) => setCarts(data.data))
      .catch((err) => console.log(err));
  }, []);

  const showCart = carts.map((item) => (
    <div className="card w-100 d-flex flex-column justify-content-start p-3">
      {/* <div className=" w-100 flex-row justify-content-start p-3"> */}
      {carts.length}
      <div className="d-block">
        <img src={item.product.image} alt={item.product.title} />
        <p>Product: {item.product.title}</p>
        <p>Price: ${item.product.discount}</p>
        <p>Qty: {item.product_qty}</p>
        <p>Total: ${item.product.discount * item.product_qty}</p>
      </div>
    </div>
  ));

  return (
    <Container>
      <h1 className="d-flex justify-content-center">Shopping Cart</h1>
      <div className="cardStyle d-flex flex-column align-items-center justify-content-center h-100 mt-4">
        {carts.length > 0 ? (
          showCart
        ) : (
          <div className="card w-100 d-flex flex-row justify-content-center p-3">
            {" "}
            <h3>No Items in Cart</h3>
          </div>
        )}
      </div>
      <Footer />
    </Container>
  );
}
