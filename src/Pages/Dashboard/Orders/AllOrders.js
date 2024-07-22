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
  let createAt = 0;

  useEffect(() => {
    Axios.get(`${ALLORDERS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setOrders(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err));
  }, [limit, page]);

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
        <td className="d-flex gap-1">
          Status:{" "}
          {items.status === 0 ? (
            <td>Pending</td>
          ) : items.status === 1 ? (
            <td>Awaiting Payment</td>
          ) : items.status === 2 ? (
            <td>Awaiting Shipment</td>
          ) : items.status === 3 ? (
            <td>Completed</td>
          ) : items.status === 4 ? (
            <td>Shipped</td>
          ) : items.status === 5 ? (
            <td>Cancelled</td>
          ) : (
            <td>Waiting</td>
          )}
        </td>
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
        <Link className="btn btn-primary" to="/dashboard/product/add">
          Add Order
        </Link>
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
            <div className="card w-100 d-flex flex-row justify-content-center p-3">
              <h3>No Orders yet</h3>
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
