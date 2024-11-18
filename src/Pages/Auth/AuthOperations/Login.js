import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { baseURL, LOGIN } from "../../../API/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginExport } from "../../../Context/LoginContext";
import TheNavBar from "./../../../Components/Website/NavBar/TheNavBar";
import LoginIcon from "../../../Assets/Login-icon.png";
import Footer from "../../../Components/Website/Footer/Footer";
import "./Auth.css";

export default function Login() {
  // States
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Login Export
  const { setIsChangeLogin } = useContext(LoginExport);

  // Loading
  const [loading, setLoading] = useState(false);

  // Cookies
  const cookie = Cookie();

  // Err
  const [err, setErr] = useState("");

  // Ref
  const focus = useRef();

  // Nav
  const nav = useNavigate();

  // Handle Form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Focus
  useEffect(() => {
    // focus.current.focus();
    document.title = `Ahmed store | Login`;
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
      // setIsChangeLogin((prev) => !prev);
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
      <div className="container text-center">
        <div className="row card-design">
          <div className="col-md-6 col-xl-4">
            <Form
              className="form-design px-2 align-items-center py-4"
              onSubmit={handleSubmit}
            >
              <img className="cart-img" src={LoginIcon} alt="Login icon" />
              <div className="custom-form">
                <h1 className="mb-5">Login</h1>
                <Form.Group
                  className="form-custom"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    // ref={focus}
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
                <button className="button-4">Login</button>
                <div className="d-flex gap-2 justify-content-center mt-3">
                  <p>You don't have an account?</p>
                  <NavLink to="../register">Sign Up</NavLink>
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
