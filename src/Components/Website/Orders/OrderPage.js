import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ORDERID, PRODUCTS } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Container } from "react-bootstrap";

export default function OrderPage() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  let totalCartPrice = 0;

  useEffect(() => {
    Axios.get(`${ORDERID}/${id}`)
      .then((data) => setOrders(data.data))
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   Axios.get(`${PRODUCTS}`)
  //     .then((data) => setProducts(data.data))
  //     .catch((err) => console.log(err));
  // }, []);

  console.log(orders);

  const showOrderItems = orders.map((item, key) => {
    // if (item.order_items[2].price) {
    //   totalCartPrice +=
    //     item.order_items[0].price +
    //     item.order_items[1].price +
    //     item.order_items[2].price;
    // } else {
    //   if (item.order_items[1].price) {
    //     totalCartPrice += item.order_items[0].price + item.order_items[1].price;
    //   } else {
    //     totalCartPrice += item.order_items[0].price;
    //   }
    // }

    // totalCartPrice += item.order_items[0].price * item.order_items[0].qty;

    totalCartPrice += item.order_items[key].price * item.order_items[key].qty;

    return (
      <li className="" key={item.id}>
        <p>Id: {item.id}</p>
        <p>Tracking No: {item.tracking_no}</p>
        <p>Payment method: {item.payment_mode}</p>

        <div className="card flex-row gap-4 align-items-center">
          <img
            src={item.order_items[key].product_image}
            width="150px"
            alt={item.order_items[key].product_title}
          />
          <p>Products: {item.order_items[key].product_title}</p>
          <p>QTY: {item.order_items[key].qty}</p>
          <p>Price: ${item.order_items[key].price}</p>
          <p>
            Total: ${item.order_items[key].price * item.order_items[key].qty}
          </p>
        </div>

        {item.order_items[1] ? (
          <div className="card flex-row gap-4 align-items-center">
            <img
              src={item.order_items[1].product_image}
              width="150px"
              alt={item.order_items[1].product_title}
            />
            <p>Products: {item.order_items[1].product_title}</p>
            <p>QTY: {item.order_items[1].qty}</p>
            <p>Price: ${item.order_items[1].price}</p>
            <p>Total: ${item.order_items[1].price * item.order_items[1].qty}</p>
          </div>
        ) : (
          <></>
        )}
        {item.order_items[2] ? (
          <div className="card flex-row gap-4 align-items-center">
            <img
              src={item.order_items[2].product_image}
              width="150px"
              alt={item.order_items[2].product_title}
            />
            <p>Products: {item.order_items[2].product_title}</p>
            <p>QTY: {item.order_items[2].qty}</p>
            <p>Price: ${item.order_items[2].price}</p>
            <p>Total: ${item.order_items[2].price * item.order_items[2].qty}</p>
          </div>
        ) : (
          <></>
        )}

        <p>{item.status}</p>
        {/* <p>${totalCartPrice}</p> */}
      </li>
    );
  });

  return (
    <Container>
      <div>{showOrderItems}</div>
      <p>${totalCartPrice}</p>
    </Container>
  );
}
