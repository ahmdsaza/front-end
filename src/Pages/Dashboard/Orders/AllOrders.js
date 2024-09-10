import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { ALLORDERS, ORDERID } from "../../../API/Api";
import { Link } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import PaginatedItems from "../../../Components/Dashboard/Pagination/Pagination";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState(0);
  let createAt = 0;

  useEffect(() => {
    Axios.get(`${ALLORDERS}?status=${status}&limit=${limit}&page=${page}`)
      .then((data) => {
        setOrders(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err));
  }, [limit, page, status]);

  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${ORDERID}/${id}`);
      setOrders((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  const showTheOrder = orders.map((items, key) => {
    createAt = items.created_at;

    return (
      <tr key={key}>
        <td>#{items.id}</td>
        <td>{items.tracking_no}</td>
        <td>
          {createAt.slice(0, 10)} | {createAt.slice(11, 16)}
        </td>
        {items.status === 0 ? (
          <td>
            <span className="bg-primary rounded-1 p-1 text-white">Pending</span>
          </td>
        ) : items.status === 1 ? (
          <td>
            <span className="bg-warning rounded-1 p-1 text-black p-1">
              Awaiting Payment
            </span>
          </td>
        ) : items.status === 2 ? (
          <td>
            <span className="bg-secondary rounded-1 p-1 text-white">
              Awaiting Shipment
            </span>
          </td>
        ) : items.status === 3 ? (
          <td>
            <span className="bg-success rounded-1 p-1 text-white">
              Completed
            </span>
          </td>
        ) : items.status === 4 ? (
          <td>
            <span className="bg-success rounded-1 p-1 text-white">Shipped</span>
          </td>
        ) : items.status === 5 ? (
          <td>
            <span className="bg-danger rounded-1 p-1 text-white">
              Cancelled
            </span>
          </td>
        ) : (
          <span>Waiting</span>
        )}
        <td key={key + 1}>
          <div className="d-flex align-items-center gap-2">
            <Link to={`${items.id}`}>
              <FontAwesomeIcon icon={faEye} />
            </Link>
            <FontAwesomeIcon
              onClick={() => handleDelete(items.id)}
              fontSize={"19px"}
              color="red"
              cursor={"pointer"}
              icon={faTrash}
            />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Orders Page</h1>
        <div className="col-6">
          <Form.Select
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            aria-label="Default select example"
            className="w-25"
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
        {/* <Link className="btn btn-primary" to="/dashboard/product/add">
          Add Order
        </Link> */}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Tracking Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            showTheOrder
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <h3>No Orders found</h3>
            </div>
          )}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-end flex-wrap">
        <div className="col-1">
          <Form.Select
            onChange={(e) => setLimit(e.target.value)}
            aria-label="Default select example"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems
          setPage={setPage}
          itemsPerPage={limit}
          // data={data}
          total={total}
          // typeName={typeName}
        />{" "}
      </div>
    </div>
  );
}
