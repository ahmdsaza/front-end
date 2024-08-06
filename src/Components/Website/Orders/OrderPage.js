import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ORDERID } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Container } from "react-bootstrap";
import "./orderpage.css";

export default function OrderPage() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [getOrders, setGetOrders] = useState([]);
  let totalCartPrice = 0;
  let createAt = 0;
  let itemqty = 0;
  let itemqtyfixed = 0;
  let totalPrice = 0;

  useEffect(() => {
    Axios.get(`${ORDERID}/${id}`)
      .then((data) => {
        setOrders(data.data);
        setGetOrders(data.data[0].order_items);
      })
      .catch((err) => console.log(err));
  }, []);

  const showOrderItems = orders.map((item, key) => {
    createAt = item.created_at;
    return (
      <div className="change-font" key={key}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p>Order number: #{item.id}</p>
            <p>Tracking No: {item.tracking_no}</p>
          </div>
          <div>
            <p className="d-flex gap-1 my-0">
              Status:{" "}
              {item.status === 0 ? (
                <p>Pending</p>
              ) : item.status === 1 ? (
                <p>Awaiting Payment</p>
              ) : item.status === 2 ? (
                <p>Awaiting Shipment</p>
              ) : item.status === 3 ? (
                <p>Completed</p>
              ) : item.status === 4 ? (
                <p>Shipped</p>
              ) : item.status === 5 ? (
                <p>Cancelled</p>
              ) : (
                <p>Waiting</p>
              )}
            </p>
            <p className="d-flex gap-1 my-0">
              Payment method:{" "}
              {item.payment_mode === "0" ? (
                <p>Cash on Deleviry</p>
              ) : (
                item.payment_mode === "1" && <p>VISA</p>
              )}
            </p>
            <p>
              Order date: {createAt.slice(0, 10)} | {createAt.slice(11, 16)}
            </p>
          </div>
        </div>
      </div>
    );
  });

  const showOrderProducts = getOrders.map((item) => {
    itemqty = item.price * item.qty;
    itemqtyfixed = itemqty.toFixed(2);
    totalCartPrice += item.price * item.qty;
    totalPrice = totalCartPrice * 1.15;

    return (
      <div className="card flex-row gap-2 align-items-center justify-content-around">
        <img
          src={item.product_image}
          className="order-img"
          alt={item.product_title}
        />
        <div>
          <div className="d-flex gap-1">
            <Link
              style={{ color: "black" }}
              to={`../products/${item.product_id}`}
            >
              <p>Product: {item.product_title}</p>
              {/* <p>{item.product_title}</p> */}
            </Link>
          </div>
          <p>QTY: {item.qty}</p>
        </div>
        <div>
          <p>Price: ${item.price}</p>
          <p>Total: ${itemqtyfixed}</p>
        </div>
      </div>
    );
  });

  let vat = totalCartPrice * 0.15;

  return (
    <Container>
      <Link to="../orders">Back To orders</Link>
      <div>{showOrderItems}</div>
      <div>{showOrderProducts}</div>
      <p>Before VAT: ${totalCartPrice.toFixed(2)}</p>
      <p>VAT: ${vat.toFixed(2)}</p>
      <p>Total included VAT: ${totalPrice.toFixed(2)}</p>
    </Container>
  );
}
