import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { baseURL, LOGIN } from "../../../API/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import TheNavBar from "./../../../Components/Website/NavBar/TheNavBar";

export default function Login() {
  // States
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Loading
  const [loading, setLoading] = useState(false);

  // Cookies
  const cookie = Cookie();

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
  }, []);

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, form);
      setLoading(false);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      console.log(token);
      window.location.pathname = `/`;
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("Wrong email or password");
      } else {
        setErr("Internal Server Error");
      }
    }
  }
  return (
    <>
      {loading && <LoadingSubmit />}
      <TheNavBar />
      <div className="container text-center">
        <div className="row" style={{ height: "75vh" }}>
          <div className="col-md-6 mx-auto">
            <Form
              className="card px-2 align-items-center"
              onSubmit={handleSubmit}
            >
              <div className="custom-form">
                <h1 className="mb-5">Login</h1>
                <Form.Group
                  className="form-custom"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    ref={focus}
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
                  controlId="exampleForm.ControlInput2"
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
                <button className="btn btn-primary">Login</button>
                <div>
                  <NavLink to="../register">You don't have an account?</NavLink>
                </div>
                {err !== "" && <span className="error">{err}</span>}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
