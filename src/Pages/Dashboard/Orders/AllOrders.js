import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { ALLORDERS } from "../../../API/Api";
import { Link } from "react-router-dom";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Axios.get(`${ALLORDERS}`)
      .then((data) => setOrders(data.data))
      .catch((err) => console.log(err));
  }, []);

  const header = [
    {
      key: "images",
      name: "Images",
    },
    {
      key: "title",
      name: "Title",
    },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },
    {
      key: "created_at",
      name: "created",
    },
    {
      key: "updated_at",
      name: "updated",
    },
  ];

  // console.log(orders);

  const showOrders = orders.map((item) => (
    <div className="d-flex gap-3">
      <p>Order id: #{item.id}</p>
      <p>Tracking No: {item.tracking_no}</p>
      <p>Item Status: {item.status}</p>
      <div className="">
        <Link to={`./${item.id}`}>
          <button>Open</button>
        </Link>
      </div>
    </div>
  ));
  return (
    <div>
      <div>AllOrders</div>
      <div>{showOrders}</div>
    </div>
  );
}
