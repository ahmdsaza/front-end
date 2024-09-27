import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../API/axios";
import { USER, USERPROFILE } from "../../../API/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { NavLink, useNavigate, useParams } from "react-router-dom";

export default function ProfileEdit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const nav = useNavigate();

  // Id
  const { id } = useParams();
  // Get Data
  useEffect(() => {
    Axios.get(`${USER}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle Submit
  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      const res = await Axios.post(`${USERPROFILE}/${id}`, {
        name: name,
        email: email,
      });
      window.location.pathname = "../profile";
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="row">
      <div className="col col-md-4">
        <h1 className="text-center">Edit Profile</h1>
        <Form className="bg-white px-3" onSubmit={HandleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>User Name:</Form.Label>
            <Form.Control
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="name..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email..."
            />
          </Form.Group>
          <div className="text-center">
            <button className="btn btn-success">Save</button>
            <NavLink className="btn btn-primary mx-2" to={"../profile"}>
              Back
            </NavLink>
          </div>
        </Form>
      </div>
    </div>
  );
}
