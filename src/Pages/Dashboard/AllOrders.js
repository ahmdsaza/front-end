import React, { useEffect, useState } from "react";
import { Axios } from "../../API/axios";
import { ALLORDERS } from "../../API/Api";

export default function AllOrders() {
  const [orders, setOrders] = useState("");

  useEffect(() => {
    Axios.get(`${ALLORDERS}`)
      .then((data) => setOrders(data.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(orders);

  const showOrders = orders.map((item) => <p>{item.id}</p>);
  return (
    <div>
      <div>AllOrders</div>
      <div>{showOrders}</div>
    </div>
  );
}
