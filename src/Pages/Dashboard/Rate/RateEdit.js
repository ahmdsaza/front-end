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

  console.log(rate);

  const showRate = rate.map((item, key) => {
    return (
      <div className="change-font" key={key}>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <p>Rate id: #{item.id}</p>
            <td>Username: {item.users[0].name}</td>
            <p>Product: {item.products[0].title}</p>
            <p>Description: {item.description}</p>
          </div>
          <div>
            {/* <Link to={`../order/${item.id}`}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link> */}
            <Form onSubmit={HandleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>Status:</Form.Label>{" "}
                <div className="d-flex gap-1">
                  <Form.Select
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option disabled value="">
                      Select Status
                    </option>
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
      </div>
    );
  });

  return (
    <Container>
      <NavLink to="../rate">Back to Rates</NavLink>
      <div>{showRate}</div>
    </Container>
  );
}
