import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { CARTS, USER, UPDATEQTY } from "../../../API/Api";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CartExport } from "../../../Context/CartContext";
import "./cart.css";

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const [user, setUser] = useState("");
  let totalCartPrice = 0;
  let itemPrice = 0;
  let descPrice = 0;
  let tot = 0;

  const { setIsChange } = useContext(CartExport);

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

  function handleDecrement(qty_id) {
    setCarts((cart) =>
      carts.map((item) =>
        qty_id === item.id
          ? { ...item, product_qty: item.product_qty - 1 }
          : item
      )
    );
    updateCartQuantity(qty_id, "dec");
  }

  function handleIncrement(qty_id) {
    setCarts((cart) =>
      carts.map((item) =>
        qty_id === item.id
          ? { ...item, product_qty: item.product_qty + 1 }
          : item
      )
    );
    updateCartQuantity(qty_id, "inc");
  }

  function updateCartQuantity(qty_id, scope) {
    Axios.put(`${UPDATEQTY}/${qty_id}/${scope}`);
  }

  const showCart = carts.map((item, key) => {
    if (item.product?.discount > 0) {
      totalCartPrice += item.product?.discount * item?.product_qty;
      itemPrice = item.product?.discount.slice(0, 5);
      descPrice = itemPrice * item.product_qty;
      tot = descPrice.toFixed(2);
    } else {
      totalCartPrice += item.product?.price * item?.product_qty;
      itemPrice = item.product?.price.slice(0, 5);
      descPrice = itemPrice * item.product_qty;
      tot = descPrice.toFixed(2);
    }

    // Handle Delete
    async function handleDelete(id) {
      try {
        const res = await Axios.delete(`${CARTS}/${id}`);
        setCarts((prev) => prev.filter((item) => item.id !== id));
        setIsChange((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <div className="cardStyling py-3 w-100 table-responsive" key={key}>
        <div className="row col-md-8 px-3">
          <div className="col-6">
            <img
              className="cart-image"
              src={item.images[0]?.image}
              alt={item.product?.title}
            />
          </div>
          <div className="col-4">
            <Link
              to={`../products/${item.product?.slug}`}
              className="text-black fw-bold fs-4"
            >
              <p className="">
                {item.product?.title.length > 14
                  ? item.product?.title.slice(0, 10) + "..."
                  : item.product?.title}
              </p>
            </Link>
            <div className="d-flex gap-1">
              <p>Price: </p>
              <p>${itemPrice}</p>
            </div>
            <div className=" d-flex gap-1">
              <p>Total: </p>
              <p>${tot}</p>
            </div>
            <div className=" d-flex gap-1">
              <p>Size: </p>
              <p>{item.sizes[0]?.name}</p>
            </div>
            <div className="d-flex border w-50 rounded">
              <input
                className="minus"
                type="button"
                value=" - "
                disabled={item.product_qty < 2}
                onClick={() => handleDecrement(item?.id)}
              />
              <span className="count-qty">{item?.product_qty}</span>
              {/* product Quantity */}
              <input
                className="sum"
                type="button"
                value=" + "
                disabled={item?.product_qty === item.sizes[0]?.quantity}
                onClick={() => handleIncrement(item?.id)}
              />
            </div>
          </div>{" "}
          <div className="col-2 mt-3">
            <FontAwesomeIcon
              onClick={() => handleDelete(item?.id)}
              fontSize={"19px"}
              color="red"
              cursor={"pointer"}
              icon={faTrash}
            />
          </div>
        </div>
      </div>
    );
  });

  let vat = totalCartPrice * 0.15;
  let totalWithVat = totalCartPrice + vat;

  // console.log(carts);

  return (
    <Container>
      <div className="row px-md-4">
        <div className="col-lg-8">
          <h1 className="d-flex justify-content-center">Shopping Cart</h1>
          <div className="cardStyle d-flex flex-column align-items-center justify-content-center h-100 mt-4">
            {carts?.length > 0 ? (
              showCart
            ) : (
              <div className="card w-100 d-flex flex-row justify-content-center p-3">
                <h3>No Items in Cart</h3>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="col-lg-12 payment-summary">
            <p className="fw-bold pt-lg-0 pt-4 pb-2">Cart Summary</p>
            <div className="card px-md-3 px-2 pt-2">
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between py-3">
                  <small className="text-muted">Order price</small>
                  <p>${totalCartPrice?.toFixed(2)}</p>
                </div>

                <div className="d-flex justify-content-between pb-3 border-bottom">
                  <small className="text-muted">VAT</small>
                  <p>${vat.toFixed(2)}</p>
                </div>
                <div className="d-flex justify-content-between mt-3 mb-3">
                  <p className="fw-bold">Total Amount</p>
                  <p className="fw-bold">${totalWithVat?.toFixed(2)}</p>
                </div>
              </div>
            </div>
            {carts.length > 0 ? (
              <Link to="../checkout">
                <button className="checkout-button mt-3">
                  <div className="checkout-span">Check Out</div>
                </button>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
