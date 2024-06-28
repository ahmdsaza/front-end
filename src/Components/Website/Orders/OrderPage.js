import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ORDERID } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Container } from "react-bootstrap";

export default function OrderPage() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Axios.get(`${ORDERID}/${id}`)
      .then((data) => setOrders(data.data))
      .catch((err) => console.log(err));
  }, []);

  const showOrderItems = orders.map((item) => (
    <div>
      <p>{item.id}</p>
      <p>{item.firstname}</p>
      <p>{item.order_items.product_id}</p>
      <p>{item.status}</p>
    </div>
  ));

  return (
    <Container>
      <div>{showOrderItems}</div>
    </Container>
  );
}
