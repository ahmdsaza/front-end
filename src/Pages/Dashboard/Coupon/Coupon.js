import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { COUPON } from "../../../API/Api";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Coupon() {
  const [coupons, setCoupons] = useState([]);
  const [count, setCount] = useState(false);
  const [holdId, setHoldId] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Axios.get(`${COUPON}`)
      .then((data) => setCoupons(data.data))
      .catch((err) => console.log(err));
  }, [count]);

  useEffect(() => {
    document.title = `Ahmed store | Coupon`;
  });

  async function handleDeleteCall(id) {
    try {
      const res = await Axios.delete(`${COUPON}/delete/${id}`);
      //   setProducts((prev) => prev.filter((item) => item.id !== id));
      setCount((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  // Handle delete
  function handleDelete(data) {
    setHoldId(data);
    handleShow();
  }

  // Handle Colse
  function handleCloseModal(data) {
    handleDeleteCall(data);
    handleClose();
  }

  //   function handlePagination(e) {
  //     props.setLimit(e.target.value);
  //     props.setPage(1);
  //   }

  const showCoupons = coupons.map((item, key) => {
    return (
      <tr key={key}>
        <td>#{item.id}</td>
        <td>{item.title}</td>
        <td>%{item.percent}</td>
        <td>${item.lowest_price}</td>
        <td>{item.start_date}</td>
        <td>{item.expire_date}</td>
        <td key={key + 1}>
          <div className="d-flex align-items-center gap-2">
            <NavLink to={`${item.id}`}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </NavLink>
            <FontAwesomeIcon
              onClick={() => handleDelete(item.id)}
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
    <>
      <div className="bg-white p-2">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Coupons Page</h1>
          <div className="col-4 col-md-6">
            <Form.Select
              //   onChange={(e) => {
              //     setStatus(e.target.value);
              //   }}
              aria-label="Default select example"
              className="w-25"
            >
              <option value="0">All</option>
              <option value="00">Active</option>
              <option value="1">Expired</option>
            </Form.Select>
          </div>
          <NavLink className="btn btn-primary" to="./add">
            Add Coupon
          </NavLink>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Percent</th>
              <th>Lowet Price</th>
              <th>Start Date</th>
              <th>Expire Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              showCoupons
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <h3>No Coupons found</h3>
              </div>
            )}
          </tbody>
        </Table>
      </div>
      <div>
        {" "}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This will delete the coupon and you can't recovery it
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={() => handleCloseModal(holdId)} variant="primary">
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
