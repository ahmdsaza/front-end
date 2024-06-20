import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { Container } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { CARTS, PRODUCTS } from "../../../API/Api";
import "./cart.css";

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);
  let totalCartPrice = 0;
  let itemPrice = 0;

  // Call Cart
  useEffect(() => {
    Axios.get(`${CARTS}`)
      .then((data) => setCarts(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`${PRODUCTS}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(products);

  // const showProducts = products.map((item, key) => (
  //   <img src={item.images.image} alt={item.title} />
  // ));

  const showCart = carts.map((item) => {
    totalCartPrice += item.product.discount * item.product_qty;
    itemPrice = item.product.discount.slice(0, 5);

    return (
      <div className="cardStyle w-100 d-flex flex-column justify-content-start p-3">
        {/* <div className=" w-100 flex-row justify-content-start p-3"> */}
        <div className="d-block">
          <img src={item.product.image} alt={item.product.title} />
          <p>Product: {item.product.title}</p>
          <p>Price: ${itemPrice}</p>
          <p>Qty: {item.product_qty}</p>
          <p>Total: ${item.product.discount * item.product_qty}</p>
        </div>
      </div>
    );
  });

  let vat = totalCartPrice / 15;
  let totalWithVat = totalCartPrice + vat;

  return (
    <Container>
      <h1 className="d-flex justify-content-center">Shopping Cart</h1>
      <h3 className="d-flex justify-content-center">
        Shopping Cart Items: {carts.length}
      </h3>
      <div className="cardStyle d-flex flex-column align-items-center justify-content-center h-100 mt-4">
        {carts.length > 0 ? (
          showCart
        ) : (
          <div className="card w-100 d-flex flex-row justify-content-center p-3">
            <h3>No Items in Cart</h3>
          </div>
        )}
      </div>
      {/* {showProducts} */}
      <div className="d-flex justify-content-around mt-3">
        <button>CheckOut</button>
        <div>
          <h3>Before VAT: ${totalCartPrice}</h3>
          <h3>VAT: ${vat.toFixed(2)}</h3>
          <h3>Total Price: ${totalWithVat.toFixed(2)}</h3>
        </div>
      </div>
      <Footer />
    </Container>
  );
}
