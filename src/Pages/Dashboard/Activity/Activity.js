import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { ORDERSCOUNT, USER } from "../../../API/Api";
import { NavLink } from "react-router-dom";

export default function Activity() {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState([]);

  useEffect(() => {
    Axios.get(`${ORDERSCOUNT}`)
      .then((data) => setOrders(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Gett User Name
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setName(data.data.name))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>Welcome: {name}</div>
      <div>
        <NavLink to={`../orders`} className="text-black">
          Orders number: {orders}
        </NavLink>
      </div>
    </div>
  );
}
