import axios from "axios";
import React, { useState } from "react";
import { baseURL, REGISTER } from "../../API/Api";
import LoadingSubmit from "../../Components/Laoding/Loading";

export default function Register() {
  // States
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Loading
  const [loading, setLoading] = useState(false);

  // Err
  const [err, setErr] = useState("");

  // Handle Form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${baseURL}/${REGISTER}`, form);
      setLoading(false);
      window.location.pathname = "/";
    } catch (err) {
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
      {loading && <LoadingSubmit />}
      <div className="container">
        <div className="row h-100">
          <form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Register Now</h1>
              <div className="form-control">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name.."
                  required
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-control">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email.."
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-control">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password.."
                  minLength="6"
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <button className="btn btn-primary">Register</button>
              {err !== "" && <span className="error">{err}</span>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
