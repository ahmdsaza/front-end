import React, { useEffect, useRef, useState } from "react";
import { CARTS, ORDERS } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import "./checkout.css";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const [carts, setCarts] = useState([]);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipcode: "",
    payment_mode: "0",
  });
  const nav = useNavigate();

  // Import Cart
  useEffect(() => {
    Axios.get(`${CARTS}`)
      .then((data) => setCarts(data.data))
      .catch((err) => console.log(err));
  }, []);

  let totalCartPrice = 0;

  const showCheckOut = carts.map((item) => {
    totalCartPrice += item.product.discount * item.product_qty;

    return (
      <div>
        <div className="checkout-order">
          <table className="border-1">
            <th>{item.product.title}</th>
            <tr>
              <td>
                <img src={item.product_image} width="150px" />
              </td>
              <td>QTY: {item.product_qty}</td>
              <td>Price: ${item.product.discount}</td>
              Price: ${totalCartPrice}
            </tr>
          </table>
        </div>
      </div>
    );
  });

  let vat = totalCartPrice * 0.15;
  let totalWithVat = totalCartPrice + vat;

  // Handle Submit
  async function handleSubmit(e) {
    // setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${ORDERS}`, form);
      nav("/thankyou");
    } catch (err) {
      // setLoading(false);
      console.log(err);
    }
  }

  // Handle Change
  // function handleChange(e) {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  //   setSent(1);
  //   if (sent !== 1) {
  //     HandleSubmit();
  //   }
  // }

  // function handleChange(e) {
  //   setForm({ ...form, [e.target.name]: e.target.value });

  //   HandleSubmit();
  // }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // setSent(1);
    // if (sent !== 1) {
    //   handleSubmit();
    // }
  }

  return (
    <Container>
      <div className="d-flex w-100">
        <div className="w-100">
          <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput0">
              <Form.Label>First name:</Form.Label>
              <Form.Control
                required
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                // disabled={!sent}
                placeholder="First name..."
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last name:</Form.Label>
              <Form.Control
                required
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                type="text"
                placeholder="Last name..."
                // disabled={!sent}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput0">
              <Form.Label>Phone number:</Form.Label>
              <Form.Control
                required
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+966..."
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                required
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email..."
                // disabled={!sent}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput0">
              <Form.Label>Country:</Form.Label>
              <Form.Control
                required
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Country..."
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City:</Form.Label>
              <Form.Control
                required
                name="city"
                value={form.city}
                onChange={handleChange}
                type="text"
                placeholder="City..."
                // disabled={!sent}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput0">
              <Form.Label>zipcode:</Form.Label>
              <Form.Control
                required
                name="zipcode"
                value={form.zipcode}
                onChange={handleChange}
                placeholder="zipcode..."
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput0">
              <Form.Label>Payment:</Form.Label>
              <Form.Select
                required
                name="payment_mode"
                value={form.payment_mode}
                onChange={handleChange}
              >
                <option disabled>Choose Payment method</option>
                <option value="0">Cash on Delivery</option>
                <option value="1">Visa</option>
              </Form.Select>
            </Form.Group>
            <button className="">Check Out</button>
          </Form>
          <div className="d-flex justify-content-end">
            Total Price: ${totalWithVat.toFixed(2)}
          </div>
        </div>
        <div>{showCheckOut}</div>
      </div>
    </Container>
  );
}
