import React, { useEffect, useState } from "react";
import "./orders.css";
import { Axios } from "../../../API/axios";
import { ORDER } from "../../../API/Api";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "../../Dashboard/Pagination/Pagination";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    Axios.get(`${ORDER}?limit=${limit}&page=${page}`)
      .then((data) => {
        setOrders(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err));
  }, [limit, page]);

  const showTheOrder = orders.map((items) => (
    <div className="mt-2">
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
              <p>Waiting</p>
            )}
          </p>
        </div>
        <div className="">
          <Link to={`./${items.id}`}>
            <button>Open</button>
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <Container className="mt-3">
      <h1 className="d-flex justify-content-center">My Orders</h1>
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
            onChange={(e) => setLimit(e.target.value)}
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
            // data={data}
            total={total}
            // typeName={typeName}
          />
        </div>
      </div>
    </Container>
  );
}
