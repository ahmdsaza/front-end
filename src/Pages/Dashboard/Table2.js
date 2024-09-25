import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "../../Components/Dashboard/Pagination/Pagination";
import "./table.css";
import TransformDated from "../../helpers/TransformDated";

export default function TableShow2(props) {
  const currentUser = props.currentUser || {
    email: "",
  };
  const [searchLoading, setSearchLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [holdId, setHoldId] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Header Show
  const headerShow = props.header.map((item) => <th>{item.name}</th>);

  //   console.log(props.data);

  // Body Show
  const dataShow = props.data.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      <td>{item?.products?.id}</td>
      <td>{item?.products?.title}</td>
      <td>{item.description}</td>
      <td>{item.product_rate}</td>
      <td>{item.status}</td>
      <td>{TransformDated(item.created_at)}</td>
      <td key={key + 1}>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>
          <div>
            <FontAwesomeIcon
              onClick={() => handleDelete(item.id)}
              // onClick={() => props.delete(item.id)}
              fontSize={"19px"}
              color="red"
              cursor={"pointer"}
              icon={faTrash}
            />
          </div>
        </div>
      </td>
    </tr>
  ));

  // Handle delete
  function handleDelete(data) {
    setHoldId(data);
    handleShow();
  }

  // Handle Colse
  function handleCloseModal(data) {
    props.delete(data);
    handleClose();
  }

  // Handel Pagination
  function handlePagination(e) {
    props.setLimit(e.target.value);
    props.setPage(1);
  }

  // Return Data
  return (
    <>
      <div class=".table-responsive px-md-4 px-2 pt-3">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>id</th>
              {headerShow}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.loading ? (
              <tr style={{ textAlign: "center" }}>
                <td colSpan={12}>Loading...</td>
              </tr>
            ) : searchLoading ? (
              <tr style={{ textAlign: "center" }}>
                <td colSpan={12}>Searching...</td>
              </tr>
            ) : (
              dataShow
            )}
          </tbody>
        </Table>
      </div>
      <div className="d-flex align-items-center justify-content-end flex-wrap">
        <div className="col-1">
          <Form.Select
            onChange={handlePagination}
            aria-label="Default select example"
          >
            <option value="5">5</option>
            <option value="15">15</option>
            <option value="25">25</option>
          </Form.Select>
        </div>
        <PaginatedItems
          setPage={props.setPage}
          itemsPerPage={props.limit}
          data={props.data}
          total={props.total}
          typeName={props.typeName}
        />{" "}
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            That will delete item and you can't recovery it
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
