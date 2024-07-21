import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { ORDERID } from "../../../API/Api";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";

export default function EditOrder() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    Axios.get(`${ORDERID}/${id}`)
      .then((data) => setOrders(data.data))
      .catch((err) => console.log(err));
  }, []);

  async function HandleSubmit(e) {}

  const showEditOrder = orders.map((item) => (
    <Form onSubmit={HandleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Status</Form.Label>
        <Form.Select
          value={item.status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option disabled value="">
            Select Role
          </option>
          <option value="0">Admin</option>
          <option value="1">User</option>
          <option value="2">Writer</option>
          <option value="3">Product Manager</option>
          <option value="4">Product Manager</option>
          <option value="5">Product Manager</option>
        </Form.Select>
      </Form.Group>
      <button className="btn btn-primary">Save</button>
    </Form>
  ));
  return <div>{showEditOrder}</div>;
}
