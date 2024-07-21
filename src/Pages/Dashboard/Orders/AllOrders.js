import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { ALLORDERS, ORDERID } from "../../../API/Api";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  let createAt = 0;

  useEffect(() => {
    Axios.get(`${ALLORDERS}`)
      .then((data) => setOrders(data.data))
      .catch((err) => console.log(err));
  }, []);

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
        <td>#{items.tracking_no}</td>
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

      // <div className="mt-2">
      //   <div className="card d-flex flex-row align-items-center justify-content-between px-3">
      //     <div className="mt-3">
      //       <p>Order Number: #{items.id}</p>
      //       <p>Tracking Number: {items.tracking_no}</p>
      //       <p className="d-flex gap-1">
      //         Status:{" "}
      //         {items.status === 0 ? (
      //           <p>Pending</p>
      //         ) : items.status === 1 ? (
      //           <p>Awaiting Payment</p>
      //         ) : items.status === 2 ? (
      //           <p>Awaiting Shipment</p>
      //         ) : items.status === 3 ? (
      //           <p>Completed</p>
      //         ) : items.status === 4 ? (
      //           <p>Shipped</p>
      //         ) : items.status === 5 ? (
      //           <p>Cancelled</p>
      //         ) : (
      //           <p>Waiting</p>
      //         )}
      //       </p>
      //     </div>
      //     <div className="">
      //       <Link to={`./${items.id}`}>
      //         <button>Open</button>
      //       </Link>
      //     </div>
      //   </div>
      // </div>
    );
  });

  return (
    // <div>
    //   <h1 className="d-flex justify-content-center">My Orders</h1>
    //   <div>
    //     {orders.length > 0 ? (
    //       showTheOrder
    //     ) : (
    //       <div className="card w-100 d-flex flex-row justify-content-center p-3">
    //         <h3>No Orders yet</h3>
    //       </div>
    //     )}
    //   </div>
    // </div>
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
            {/* <th>id</th> */}
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
          {/* {props.loading ? (
            <tr style={{ textAlign: "center" }}>
              <td colSpan={12}>Loading...</td>
            </tr>
          ) : searchLoading ? (
            <tr style={{ textAlign: "center" }}>
              <td colSpan={12}>Searching...</td>
            </tr>
          ) : (
            dataShow
          )} */}
        </tbody>
      </Table>
    </div>
  );
}
