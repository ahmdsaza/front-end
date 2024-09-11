import React, { useEffect, useState } from "react";
import { CARTS, ORDERS } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import "./checkout.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function CheckOut() {
  const [carts, setCarts] = useState([]);
  const [sent, setSent] = useState(false);
  const [totalPriceState, setTotalPriceState] = useState("");

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
      <tr class="border-bottom">
        <td>
          <div class="d-flex align-items-center">
            <img
              className="pic"
              src={item.images[0].image}
              alt={item.product.title}
            />
            <div class="ps-3 d-flex flex-column justify-content">
              <p class="pic fw-bold">
                <NavLink to={`../products/${item.product.id}`}>
                  <span class="ps-1 text-black">{item.product.title}</span>
                </NavLink>
              </p>
              {/* <small class="d-flex">
                <span class="text-muted">Color:</span>
                <span class="fw-bold">Red/White</span>
              </small> */}
              <small class="">
                <span class="text-muted">Size:</span>
                <span class="fw-bold">{item.sizes[0].name}</span>
              </small>
            </div>
          </div>
        </td>
        <td>
          <div class="d-flex">
            <p class="pe-3">
              <span class="text-muted">${item.product.discount}</span>
            </p>
            <p class="fw-bold">Total: ${tot}</p>
          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
            <span class="pe-3 text-muted">Quantity:</span>
            <span class="pe-3">{item.product_qty}</span>
          </div>
        </td>
      </tr>
    );
  });

  let vat = totalCartPrice * 0.15;
  // let totalWithVat = totalCartPrice + vat;

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

  // let totalWithVatNew = 0;

  function handlePayment(e) {
    if (e.target.value == 0) {
      form.payment_mode = e.target.value;
      setSent(true);
      setTotalPriceState((totalCartPrice + vat + 5).toFixed(2));
    } else {
      form.payment_mode = e.target.value;
      setTotalPriceState((totalCartPrice + vat).toFixed(2));
      setSent(true);
    }
  }

  return (
    <Container>
      <div class="containers mt-4 p-0">
        <div class="row px-md-4 px-2 pt-4">
          <div class="col-lg-8">
            {carts.length > 1 ? (
              <p class="pb-2 fw-bold">Orders list</p>
            ) : (
              <p class="pb-2 fw-bold">Order list</p>
            )}
            <div class="card">
              <div class="table-responsive px-md-4 px-2 pt-3">
                <table class="table table-borderless">
                  <tbody>{showCheckOut}</tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-4 payment-summary">
            <p class="fw-bold pt-lg-0 pt-4 pb-2">Payment Summary</p>
            <div class="card px-md-3 px-2 pt-2">
              <div class="d-flex flex-column">
                <div class="d-flex justify-content-between py-3">
                  <small class="text-muted">Order price</small>
                  <p>${totalCartPrice.toFixed(2)}</p>
                </div>
                <div class="d-flex justify-content-between pb-3 border-bottom">
                  <small class="text-muted">VAT</small>
                  <p>${vat.toFixed(2)}</p>
                </div>
                <div class="d-flex justify-content-between mt-3 mb-3">
                  <p class="fw-bold">Total Amount</p>
                  {/* <p className="fw-bold">${totalWithVat.toFixed(2)}</p> */}
                  <p className="fw-bold">${totalPriceState}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 delivery px-md-3 px-1">
            <p class="pt-2 fw-bold pb-3 ps-2">Address</p>
            <div class="container">
              <Form>
                <div>
                  <div className="name">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput0"
                    >
                      <Form.Label for="f-name">First name:</Form.Label>
                      <Form.Control
                        required
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        // disabled={!sent}
                        placeholder="First name..."
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
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
                  </div>
                  <div className="name">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput0"
                    >
                      <Form.Label>Phone number:</Form.Label>
                      <Form.Control
                        required
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+966..."
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
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
                  </div>
                  <div class="address-info">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput0"
                    >
                      <Form.Label>Country:</Form.Label>
                      <Form.Control
                        required
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Country..."
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
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
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput0"
                    >
                      <Form.Label>zipcode:</Form.Label>
                      <Form.Control
                        required
                        name="zipcode"
                        value={form.zipcode}
                        onChange={handleChange}
                        placeholder="zipcode..."
                      ></Form.Control>
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <div class="col-lg-4">
            <p class="pt-4 fw-bold pb-3">Payment Method</p>
            <div class="card p-3 mb-2">
              <div class="d-flex align-items-center justify-content-between">
                <div class="fw-bold">
                  <div class="d-flex gap-2">
                    <img
                      class=""
                      src="https://www.mada.com.sa/sites/mada/themes/custom/mada_theme/images/logo.svg"
                      width="45px"
                      alt=""
                    />
                    Mada
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      name="payment"
                      type="radio"
                      id="SwitchCheck"
                      value={2}
                      onClick={handlePayment}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="card p-3 mb-2">
              <div class="d-flex align-items-center justify-content-between">
                <div class="fw-bold">
                  <div class="d-flex gap-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/2560px-Old_Visa_Logo.svg.png"
                      alt=""
                      width="45px"
                    />
                    VISA
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      name="payment"
                      type="radio"
                      id="SwitchCheck"
                      value={1}
                      onClick={handlePayment}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="card p-3 mb-2">
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/10351/10351751.png"
                      alt=""
                      width="45px"
                    />
                    <p class="fw-bold">Cash on Delivery</p>
                  </div>
                  <small class="text-muted">
                    Add fees because cash on delivery
                  </small>
                </div>
                <div class="d-flex align-items-center">
                  <p class="pe-3">+$5.00</p>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      name="payment"
                      type="radio"
                      id="SwitchCheck"
                      value={0}
                      onClick={handlePayment}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              disabled={!sent}
              class="checkout-button"
              onClick={handleSubmit}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
