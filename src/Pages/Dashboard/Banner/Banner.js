import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { BANNER, baseURL } from "../../../API/Api";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Modal, Table } from "react-bootstrap";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(false);
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const [holdId, setHoldId] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Axios.get(`${BANNER}`).then((data) => setBanners(data.data));
  }, [limit, page, status, count]);

  useEffect(() => {
    document.title = `Ahmed store | Banners`;
  });

  function handleCallDelete(data) {
    setHoldId(data);
    handleShow();
  }

  function handleCloseModal(data) {
    handleDelete(data);
    handleClose();
  }

  const showBanners = banners.map((items, key) => {
    return (
      <tr key={key}>
        <td>#{items?.id}</td>
        <td>
          <img src={items?.image} width="150px" />
        </td>
        <td>
          <NavLink className="text-black" to={"../../" + items?.url}>
            {baseURL + "/"}
            {items?.url}
          </NavLink>
        </td>
        <td key={key + 1}>
          <div className="d-flex align-items-center gap-2">
            <NavLink to={`${items.id}`}>
              <FontAwesomeIcon icon={faEye} />
            </NavLink>
            <FontAwesomeIcon
              onClick={() => handleCallDelete(items.id)}
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

  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${BANNER}/delete/${id}`);
      setCount((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="bg-white p-3">
        <div className="d-flex align-items-center justify-content-between col">
          <h1>Banner Page</h1>
          <div>
            <NavLink className="btn btn-primary" to="/dashboard/banner/add">
              Add Banner
            </NavLink>
          </div>{" "}
        </div>{" "}
        {/* <div className={`col${window.innerWidth < 768 ? "-10" : "-6"} mb-2`}>
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
        </div> */}
        <Table striped bordered hover responsive className="z-n1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>URL</th>
              {/* <th>Username</th> */}

              <th>Action</th>
            </tr>
          </thead>

          {banners.length > 0 ? (
            <tbody>{showBanners}</tbody>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <h3>No Banners added</h3>
            </div>
          )}
        </Table>
        <div className="d-flex align-items-center justify-content-end flex-wrap">
          <div className="col-1">
            {/* <Form.Select
            onChange={handlePagination}
            aria-label="Default select example"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select> */}
          </div>
          {/* <PaginatedItems setPage={setPage} itemsPerPage={limit} total={total} />{" "} */}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will delete the banner and you can't recovery it
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
  );
}
