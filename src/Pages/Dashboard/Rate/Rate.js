import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { RATESSHOW } from "../../../API/Api";
import { NavLink } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import PaginatedItems from "../../../Components/Dashboard/Pagination/Pagination";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import TableShow2 from "../Table2";

export default function Rate() {
  const [rate, setRate] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    Axios.get(`${RATESSHOW}?status=${status}&limit=${limit}&page=${page}`)
      .then((data) => {
        setRate(data.data.data);
        setTotal(data.data.total);
        document.title = `Ahmed store | Rates`;
      })
      .catch((err) => console.log(err));
  }, [limit, page, status, count]);

  // const header = [
  //   {
  //     key: "product_id",
  //     name: "Product id",
  //   },
  //   {
  //     key: "title",
  //     name: "Title",
  //   },
  //   {
  //     key: "description",
  //     name: "Description",
  //   },
  //   {
  //     key: "product_rate",
  //     name: "Rate",
  //   },
  //   {
  //     key: "status",
  //     name: "Status",
  //   },
  //   {
  //     key: "created_at",
  //     name: "create at",
  //   },
  // ];

  // console.log(rate);

  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${RATESSHOW}/${id}`);
      setRate((prev) => prev.filter((item) => item.id !== id));
      setCount((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  const showTheRate = rate.map((items, key) => {
    return (
      <tr key={key}>
        <td>#{items?.id}</td>
        <td>{items.products[0]?.id}</td>
        <td>{items.products[0]?.title}</td>
        <td>{items.users[0]?.name}</td>
        <td>
          {items.description != null
            ? items.description.length > 25
              ? items.description.slice(0, 25) + "..."
              : items.description
            : items.description}
        </td>
        {items.status === "1" ? <td>Visable</td> : <td>Hidden</td>}
        <td>
          {items.product_rate}
          <FontAwesomeIcon
            className="mx-1"
            icon={solid}
            style={{ color: "FFC100" }}
          />
        </td>
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

  function handlePagination(e) {
    setLimit(e.target.value);
    setPage(1);
  }

  return (
    <div className="bg-white w-100 p-3">
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
      <Table striped bordered hover responsive className="z-n1">
        <thead>
          <tr>
            <th>Rate Id</th>
            <th>Product Id</th>
            <th>Product</th>
            <th>Username</th>
            <th>Description</th>
            <th>Status</th>
            <th>Rate</th>
            <th>Action</th>
          </tr>
        </thead>

        {rate.length > 0 ? (
          <tbody>{showTheRate}</tbody>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <h3>No Reviews yet</h3>
          </div>
        )}
      </Table>
      <div className="d-flex align-items-center justify-content-end flex-wrap">
        <div className="col-1">
          <Form.Select
            onChange={handlePagination}
            aria-label="Default select example"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems setPage={setPage} itemsPerPage={limit} total={total} />{" "}
      </div>
    </div>
  );
}
