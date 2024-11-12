import React, { useEffect, useState } from "react";
import "./orders.css";
import { Axios } from "../../../API/axios";
import { ALLORDERS } from "../../../API/Api";
import { Container, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import PaginatedItems from "../../Dashboard/Pagination/Pagination";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    Axios.get(`${ALLORDERS}?status=${status}&limit=${limit}&page=${page}`)
      .then((data) => {
        setOrders(data.data.data);
        setTotal(data.data.total);
        document.title = "Ahmed store | Orders";
      })
      .catch((err) => console.log(err));
  }, [limit, page, status]);

  const showTheOrder = orders.map((items, index) => (
    <div className="mt-2" key={index}>
      <div className="card d-flex flex-row align-items-center justify-content-between px-3">
        <div className="mt-3 py-2">
          <p>Order Number: #{items.id}</p>
          <p>Tracking Number: {items.tracking_no}</p>
          <p className="d-flex gap-1">
            Status:{" "}
            {items.status === 0 ? (
              <p className="bg-primary rounded-1 px-1 text-white">Pending</p>
            ) : items.status === 1 ? (
              <p className="bg-warning rounded-1 px-1 text-black">
                Awaiting Payment
              </p>
            ) : items.status === 2 ? (
              <p className="bg-secondary rounded-1 px-1 text-white">
                Awaiting Shipment
              </p>
            ) : items.status === 3 ? (
              <p className="bg-success rounded-1 px-1 text-white">Completed</p>
            ) : items.status === 4 ? (
              <p className="bg-success rounded-1 px-1 text-white">Shipped</p>
            ) : items.status === 5 ? (
              <p className="bg-danger rounded-1 px-1 text-white">Cancelled</p>
            ) : (
              <p className="bg-warning rounded-1 p-1 text-black">Waiting</p>
            )}
          </p>
        </div>
        <div>
          <NavLink to={`./${items.slug}`}>
            <button className="btn btn-outline-primary">Show</button>
          </NavLink>
        </div>
      </div>
    </div>
  ));

  function handlePagination(e) {
    setLimit(e.target.value);
    setPage(1);
  }

  return (
    <Container className="mt-3">
      <div className="d-flex align-items-center justify-content-between">
        <div></div>
        <h1>Orders Page</h1>
        <div className="col-6">
          <Form.Select
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            aria-label="Default select example"
            className={window.innerWidth > 768 ? "w-25" : ""}
          >
            <option value="0">All</option>
            <option value="00">Pending</option>
            <option value="1">Awaiting Payment</option>
            <option value="2">Awaiting Shipment</option>
            <option value="3">Completed</option>
            <option value="4">Shipped</option>
            <option value="5">Cancelled</option>
          </Form.Select>
        </div>
      </div>
      <div>
        {orders.length > 0 ? (
          showTheOrder
        ) : (
          <div className="card w-100 d-flex flex-row justify-content-center p-3">
            <h3>No Orders yet</h3>
          </div>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-end flex-wrap mt-3">
        <div>
          <Form.Select
            onChange={handlePagination}
            aria-label="Default select example"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <div>
          <PaginatedItems
            setPage={setPage}
            itemsPerPage={limit}
            total={total}
          />
        </div>
      </div>
    </Container>
  );
}
