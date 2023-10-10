import axios from "axios";
import React, { useState } from "react";
import { baseURL, LOGIN } from "../../API/Api";
import LoadingSubmit from "../../Components/Laoding/Loading";
import Cookie from "cookie-universal";

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

  // Handle Form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, {
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      window.location.pathname = "/users";
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
      <div className="container">
        <div className="row h-100">
          <form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Login</h1>
              <div className="mb-3 form-control">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email.."
                  required
                />
                <label htmlFor="email">Email: </label>
              </div>
              <div className="mb-3 form-control">
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
                <label htmlFor="password">Password: </label>
              </div>
              <button className="btn btn-primary">Login</button>
              {err !== "" && <span className="error">{err}</span>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
