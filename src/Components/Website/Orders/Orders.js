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

  console.log(orders);

  const showTheOrder = orders.map((items) => (
    <div className="pt-2 ">
      <div className="card d-flex flex-row justify-content-between">
        <div>
          <p>Id: {items.id}</p>
          <p>User ID: {items.user_id}</p>
          <p>Tracking No. {items.tracking_no}</p>
        </div>
        <div className="">
          <Link to={`./${items.id}`}>
            <button>Open</button>
          </Link>
        </div>
      </div>
    </div>
  ));

  return <Container>{showTheOrder}</Container>;
}
