import React, { useEffect, useState } from "react";
import { CARTS } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Container } from "react-bootstrap";

export default function CheckOut() {
  const [carts, setCarts] = useState([]);

  // Import Cart
  useEffect(() => {
    Axios.get(`${CARTS}`)
      .then((data) => setCarts(data.data))
      .catch((err) => console.log(err));
  }, []);

  const showCheckOut = carts.map((item) => (
    <div>
      <table className="border-1">
        <th>{item.product.title}</th>
        <tr>
          <td>
            <img src={item.product_image} width="150px" />
          </td>
          <td>QTY: {item.product_qty}</td>
          <td>Price: ${item.product.price}</td>
        </tr>
      </table>
    </div>
  ));

  return <Container>{showCheckOut}</Container>;
}
