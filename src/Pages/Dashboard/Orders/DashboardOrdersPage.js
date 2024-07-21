import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ORDERID, ORDER } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";

export default function DashboardOrdersPage() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [getOrders, setGetOrders] = useState([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  let totalCartPrice = 0;
  let createAt = 0;
  let itemqty = 0;
  let itemqtyfixed = 0;

  useEffect(() => {
    Axios.get(`${ORDERID}/${id}`)
      .then((data) => {
        setOrders(data.data);
        setStatus(data.data[0].status);
        setGetOrders(data.data[0].order_items);
      })
      .catch((err) => console.log(err));
  }, []);

  async function HandleSubmit(e) {
    // setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${ORDER}/edit/${id}`, {
        status: status,
      });
      alert("Status Changed successfully");
      // navigate("/dashboard/orders");
      console.log(status);
    } catch (err) {
      // setLoading(false);
      console.log(status);

      console.log(err);
    }
  }

  const showOrderItems = orders.map((item, key) => {
    createAt = item.created_at;
    return (
      <div className="" key={key}>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <p>Order number: #{item.id}</p>
            <p>Tracking No: {item.tracking_no}</p>
            <p className="d-flex gap-1 my-0">
              Payment method:{" "}
              {item.payment_mode === "0" ? (
                <p>Cash on Deleviry</p>
              ) : (
                item.payment_mode === "1" && <p>VISA</p>
              )}
            </p>
          </div>
          <div>
            {/* <Link to={`../order/${item.id}`}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link> */}
            <Form onSubmit={HandleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>Status:</Form.Label>{" "}
                <div className="d-flex gap-1">
                  <Form.Select
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option disabled value="">
                      Select Role
                    </option>
                    <option value="0">Pending</option>
                    <option value="1">Awaiting Payment</option>
                    <option value="2">Awaiting Shipment</option>
                    <option value="3">Completed</option>
                    <option value="4">Shipped</option>
                    <option value="5">Cancelled</option>
                    <option value="6">Waiting</option>
                  </Form.Select>{" "}
                  <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </div>
              </Form.Group>
            </Form>
            {/* <p className="d-flex gap-1 my-0">
              Status:{" "}
              {item.status === 0 ? (
                <p>Pending</p>
              ) : item.status === 1 ? (
                <p>Awaiting Payment</p>
              ) : item.status === 2 ? (
                <p>Awaiting Shipment</p>
              ) : item.status === 3 ? (
                <p>Completed</p>
              ) : item.status === 4 ? (
                <p>Shipped</p>
              ) : item.status === 5 ? (
                <p>Cancelled</p>
              ) : (
                <p>Waiting</p>
              )}
            </p> */}
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
          <div className="d-flex gap-1">
            <Link
              style={{ color: "black" }}
              to={`../../products/${item.product_id}`}
            >
              <p>Product: {item.product_title}</p>
            </Link>
          </div>
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
      <Link to="../orders">Back To orders</Link>
      <div>{showOrderItems}</div>
      <div>{showOrderProducts}</div>
      <p>Total price: ${totalCartPrice.toFixed(2)}</p>
    </Container>
  );
}
