import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { RATESSHOW, RATES } from "../../../API/Api";
import { NavLink } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import PaginatedItems from "../../../Components/Dashboard/Pagination/Pagination";

export default function Rate() {
  const [rate, setRate] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  const [status, setStatus] = useState("");

  useEffect(() => {
    Axios.get(`${RATESSHOW}?status=${status}&limit=${limit}&page=${page}`)
      .then((data) => {
        setRate(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err));
  }, [limit, page, status]);

  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${RATESSHOW}/${id}`);
      setRate((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  const showTheRate = rate.map((items, key) => {
    return (
      <tr key={key}>
        <td>#{items.id}</td>
        <td>{items.products[0].title}</td>
        <td>{items.users[0].name}</td>
        <td>
          {items.description != null
            ? items.description.length > 25
              ? items.description.slice(0, 25) + "..."
              : items.description
            : items.description}
        </td>
        <td className="d-flex gap-1">
          {items.status === "1" ? <>Visable</> : <>Hidden</>}
          {/* visable */}
        </td>
        <td>{items.product_rate}</td>
        <td key={key + 1}>
          <div className="d-flex align-items-center gap-2">
            <NavLink to={`${items.id}`}>
              <FontAwesomeIcon icon={faEye} />
            </NavLink>
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
        <h1>Rate Page</h1>
        <div className="col-6">
          <Form.Select
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            aria-label="Default select example"
            className="w-25"
          >
            <option value="">all</option>
            <option value="1">visable</option>
            <option value="2">hidden</option>
          </Form.Select>
        </div>
        {/* <Link className="btn btn-primary" to="/dashboard/product/add">
      Add Order
    </Link> */}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rate Id</th>
            <th>Product</th>
            <th>Username</th>
            <th>Description</th>
            <th>Status</th>
            <th>Rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rate.length > 0 ? (
            showTheRate
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <h3>No Reviews yet</h3>
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
