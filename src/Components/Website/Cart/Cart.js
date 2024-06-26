import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { Container } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { CARTS, USER } from "../../../API/Api";
import "./cart.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const [user, setUser] = useState("");
  const [count, setCount] = useState(1);
  let totalCartPrice = 0;
  let itemPrice = 0;

  // Import Cart
  useEffect(() => {
    Axios.get(`${CARTS}`)
      .then((data) => setCarts(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUser(data.data))
      .catch((err) => console.log(err));
  }, []);

  const showCart = carts.map((item, key) => {
    totalCartPrice += item.product.discount * item.product_qty;
    itemPrice = item.product.discount.slice(0, 5);

    // Handle Delete
    async function handleDelete(id) {
      try {
        const res = await Axios.delete(`${CARTS}/${id}`);
        setCarts((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <div className="cardStyling w-100 d-flex flex-column justify-content-start p-3">
        {/* <div className=" w-100 flex-row justify-content-start p-3"> */}
        <div className="cart-card">
          <div className="cart-card-details">
            <div className="cart-image-div">
              <img
                className="cart-image"
                src={item.product_image}
                alt={item.product.title}
              />
            </div>
            <div className="price-details">
              <Link
                to={`../products/${item.product.id}`}
                className="cart-product-title"
              >
                {item.product.title}
              </Link>
              <p></p>
              <p className="cart-product-price">Price: ${itemPrice}</p>
              <div className="count-qty-div">
                <input
                  className="sum"
                  type="button"
                  value=" - "
                  disabled={count < 2}
                  onClick={() => {
                    setCount((prev) => prev - 1);
                  }}
                />
                <span className="count-qty">{item.product_qty}</span>
                {/* product Quantity */}
                <input
                  className="minus"
                  type="button"
                  value=" + "
                  onClick={() => {
                    setCount((prev) => prev + 1);
                  }}
                />
              </div>
              {/* <p className="cart-product-qty">Qty: {item.product_qty}</p> */}
            </div>
          </div>
          <div className="d-flex">
            <FontAwesomeIcon
              onClick={() => handleDelete(item.id)}
              fontSize={"19px"}
              color="red"
              cursor={"pointer"}
              icon={faTrash}
            />
            <p className="cart-product-total">
              Total: ${item.product.discount * item.product_qty}
            </p>
          </div>
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
      {user && carts.length > 0 ? (
        <div className="d-flex justify-content-around mt-3">
          <Link to="../checkout">
            <button>CheckOut</button>
          </Link>
          <div>
            <h3>Before VAT: ${totalCartPrice.toFixed(2)}</h3>
            <h3>VAT: ${vat.toFixed(2)}</h3>
            <h3>Total Price: ${totalWithVat.toFixed(2)}</h3>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </Container>
  );
}
