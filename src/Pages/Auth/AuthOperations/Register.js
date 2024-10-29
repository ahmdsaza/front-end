import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { baseURL, REGISTER } from "../../../API/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import TheNavBar from "./../../../Components/Website/NavBar/TheNavBar";

export default function Register() {
  // States
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Loading
  const [loading, setLoading] = useState(false);

  // Cookies
  const cookie = Cookie();

  // Navigate
  const navigate = useNavigate();

  // Err
  const [err, setErr] = useState("");

  // Ref
  const focus = useRef();

  // Handle Form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Focus
  useEffect(() => {
    focus.current.focus();
    document.title = `Ahmed store | Register`;
  }, []);

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      setLoading(false);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      window.location.pathname = `/`;
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 422) {
        setErr("Email is already been token");
      } else {
        setErr("Internal Server Error");
      }
    }
  }
  return (
    <>
      <TheNavBar />
      {loading && <LoadingSubmit />}
      <div className="container text-center">
        <div className="row" style={{ height: "100vh" }}>
          <div className="col-md-6 mx-auto">
            <Form
              className="card px-2 align-items-center"
              onSubmit={handleSubmit}
            >
              <div className="custom-form">
                <h1 className="mb-3">Register</h1>
                <Form.Group
                  className="form-custom"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    ref={focus}
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    placeholder="Enter your name.."
                    required
                  />
                  <Form.Label>Name:</Form.Label>
                </Form.Group>
                <Form.Group
                  className="form-custom"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Control
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Enter your email.."
                    required
                  />
                  <Form.Label>Email:</Form.Label>
                </Form.Group>
                <Form.Group
                  className="form-custom"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Control
                    value={form.password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Enter your password.."
                    minLength="6"
                    required
                  />
                  <Form.Label>Password:</Form.Label>
                </Form.Group>
                <div>
                  <button className="btn btn-primary">Register</button>
                </div>
                <div className="my-2">
                  <NavLink to="/login" className="fs-6">
                    You already have an account ? Back to Login
                  </NavLink>
                </div>
                {err !== "" && <span className="error my-2">{err}</span>}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
