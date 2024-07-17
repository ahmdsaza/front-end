import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ORDERID, PRODUCTS } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Container } from "react-bootstrap";

export default function OrderPage() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [getOrders, setGetOrders] = useState([]);
  let totalCartPrice = 0;
  let createAt = 0;
  let itemqty = 0;
  let itemqtyfixed = 0;

  useEffect(() => {
    Axios.get(`${ORDERID}/${id}`)
      .then((data) => setOrders(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`${ORDERID}/${id}`)
      .then((data) => setGetOrders(data.data[0].order_items))
      .catch((err) => console.log(err));
  }, []);

  const showOrderItems = orders.map((item, key) => {
    createAt = item.created_at;
    return (
      <div className="" key={key}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p>Order number: {item.id}</p>
            <p>Tracking No: {item.tracking_no}</p>
          </div>
          <div>
            <p>Status: {item.status}</p>
            <p>Payment method: {item.payment_mode}</p>
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

    return (
      <div className="card flex-row gap-4 align-items-center justify-content-around">
        <img src={item.product_image} width="150px" alt={item.product_title} />
        <div>
          <p>Products: {item.product_title}</p>
          <p>QTY: {item.qty}</p>
        </div>
        <div>
          <p>Price: ${item.price}</p>
          <p>Total: ${itemqtyfixed}</p>
        </div>
      </div>
    );
  });

  return (
    <Container>
      <div>{showOrderItems}</div>
      <div>{showOrderProducts}</div>
      <p>Total price: ${totalCartPrice}</p>
    </Container>
  );
}
