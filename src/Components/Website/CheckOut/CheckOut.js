import React, { useEffect, useRef, useState } from "react";
import { CARTS, ORDERS } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import "./checkout.css";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const [carts, setCarts] = useState([]);
  let descPrice = 0;
  let itemPrice = 0;
  let tot = 0;

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
    itemPrice = item.product.discount.slice(0, 5);
    descPrice = itemPrice * item.product_qty;
    tot = descPrice.toFixed(2);

    return (
      <div className="cart-card-checkout">
        <div className="cart-card-details">
          <div>
            <p>{item.product.title}</p>
            <p>Qty: {item.product_qty}</p>
          </div>
          <div>
            <p>Price: ${item.product.discount}</p>
            <p>Total: ${tot}</p>
          </div>
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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <Container>
      <div className="d-flex w-100">
        <div className="w-75">
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
            <button className="checkout-button">
              <sapn className="checkout-span">Check Out</sapn>
            </button>
          </Form>
        </div>
        <div>
          {showCheckOut}{" "}
          <div className="total-amount-checkout">
            <p>Before VAT: ${totalCartPrice.toFixed(2)}</p>
            <p>VAT: ${vat.toFixed(2)}</p>
            <p>Total Price: ${totalWithVat.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
