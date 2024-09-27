import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { NavLink, useParams } from "react-router-dom";
import { RATESSHOWN, RATESSHOW } from "../../../API/Api";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function RateEdit() {
  const { id } = useParams();
  const [rate, setRate] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    Axios.get(`${RATESSHOWN}/${id}`)
      .then((data) => {
        setRate(data.data);
        setStatus(data.data[0].status);
      })
      .catch((err) => console.log(err));
  }, []);

  async function HandleSubmit(e) {
    // setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${RATESSHOW}/edit/${id}`, {
        status: status,
      });
      alert("Status Changed successfully");
      console.log(status);
    } catch (err) {
      // setLoading(false);
      console.log(err);
    }
  }

  const showRate = rate.map((item, key) => {
    return (
      <div className="change-font px-3" key={key}>
        {/* <div className="d-flex justify-content-between align-items-center mt-3"> */}
        <div className="row">
          <div className="col-8">
            <div className="col col-md-3">
              <Form onSubmit={HandleSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Status:</Form.Label>{" "}
                  <div className="d-flex gap-1">
                    <Form.Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="1">Visible</option>
                      <option value="2">Hidden</option>
                    </Form.Select>
                    <button className="btn btn-primary">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </div>
          <div className="border rounded">
            <div className="col-8">
              <p className="text-black fs-5">Rate id: #{item?.id}</p>
              <p className="text-black fs-5">
                Username: {item?.users[0]?.name}
              </p>
              <NavLink
                className="text-black fs-5"
                to={`../../products/${item?.products?.slug}`}
              >
                Product: {item?.products?.title}
              </NavLink>
              <p className="text-black fs-5">Description:</p>
              <p className="text-black fs-4">{item?.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <Container className="bg-white h-100">
      <div className="py-3">
        <NavLink to="../rate">
          <button className="btn btn-outline-primary">Back to Rates</button>
        </NavLink>
      </div>
      <div>{showRate}</div>
    </Container>
  );
}
