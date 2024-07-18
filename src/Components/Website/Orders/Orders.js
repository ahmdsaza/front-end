import React, { useEffect, useState } from "react";
import "./orders.css";
import { Axios } from "../../../API/axios";
import { ORDER } from "../../../API/Api";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Axios.get(`${ORDER}`)
      .then((data) => setOrders(data.data))
      .catch((err) => console.log(err));
  }, []);

  const showTheOrder = orders.map((items) => (
    <div className="mt-2">
      <div className="card d-flex flex-row align-items-center justify-content-between px-3">
        <div className="mt-3">
          <p>Order Number: #{items.id}</p>
          <p>Tracking Number: {items.tracking_no}</p>
          <p className="d-flex gap-1">
            Status:{" "}
            {items.status === 0 ? (
              <p>Pending</p>
            ) : items.status === 1 ? (
              <p>Awaiting Payment</p>
            ) : items.status === 2 ? (
              <p>Awaiting Shipment</p>
            ) : items.status === 3 ? (
              <p>Completed</p>
            ) : items.status === 4 ? (
              <p>Shipped</p>
            ) : items.status === 5 ? (
              <p>Cancelled</p>
            ) : (
              <p>Waiting</p>
            )}
          </p>
        </div>
        <div className="">
          <Link to={`./${items.id}`}>
            <button>Open</button>
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <Container>
      <h1 className="d-flex justify-content-center">My Orders</h1>
      <div>
        {orders.length > 0 ? (
          showTheOrder
        ) : (
          <div className="card w-100 d-flex flex-row justify-content-center p-3">
            <h3>No Orders yet</h3>
          </div>
        )}
      </div>
    </Container>
  );
}
