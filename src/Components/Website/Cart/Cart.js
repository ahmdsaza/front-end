import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { Container } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { CARTS, PRODUCTS, USER } from "../../../API/Api";
import "./cart.css";
import photo from "../../../Assets/4.jpg";

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const [user, setUser] = useState("");
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

  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUser(data.data))
      .catch((err) => console.log(err));
  }, []);

  // console.log(products);

  let photos = 0;
  let get = 0;
  let ida = 0;

  // const showProducts = products.map((item, key) => (
  //   <img src={item.images.image} alt={item.title} />
  // ));

  const showCart = carts.map((item, key) => {
    totalCartPrice += item.product.discount * item.product_qty;
    itemPrice = item.product.discount.slice(0, 5);
    ida = item.product.id;

    // console.log(ida);
    // console.log(photos);

    return (
      <div className="cardStyle w-100 d-flex flex-column justify-content-start p-3">
        {/* <div className=" w-100 flex-row justify-content-start p-3"> */}
        <div className="cart-card">
          <div className="cart-card-details">
            {/* <img src={photos} width="150px" alt={item.product.title} /> */}
            <div className="price-details">
              <p className="cart-product-title">{item.product.title}</p>
              <p className="cart-product-price">Price: ${itemPrice}</p>
              <p className="cart-product-qty">Qty: {item.product_qty}</p>
            </div>
          </div>
          <div className="d-flex">
            <p className="cart-product-total">
              Total: ${item.product.discount * item.product_qty}
            </p>
          </div>
        </div>
      </div>
    );
  });

  // useEffect(() => {
  //   Axios.get(`${PRODUCT}/${ida}`)
  //     .then((data) => setProducts(data.data))
  //     .catch((err) => console.log(err));
  // }, [ida]);

  // const showImage = products.map((item) => (
  //   <img src={item.images.image} alt={item.title} />
  // ));

  // console.log(photos);
  let vat = totalCartPrice / 15;
  let totalWithVat = totalCartPrice + vat;

  return (
    <Container>
      <h1 className="d-flex justify-content-center">Shopping Cart</h1>
      <h3 className="d-flex justify-content-center">
        Shopping Cart Items: {carts.length}
      </h3>
      {/* {showImage} */}
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
      {user ? (
        <div className="d-flex justify-content-around mt-3">
          <button>CheckOut</button>
          <div>
            <h3>Before VAT: ${totalCartPrice.toFixed(2)}</h3>
            <h3>VAT: ${vat.toFixed(2)}</h3>
            <h3>Total Price: ${totalWithVat.toFixed(2)}</h3>
          </div>
        </div>
      ) : (
        <p></p>
      )}
      <Footer />
    </Container>
  );
}
