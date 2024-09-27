import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ORDERID, ORDER } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./dashboardorder.css";
import TransformDated from "../../../helpers/TransformDated";
import TransformTime from "../../../helpers/TransformTime";

export default function DashboardOrdersPage() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [getOrders, setGetOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [orderPrice, setOrderPrice] = useState([]);
  const [loading, setLoading] = useState(true);

  let totalCartPrice = 0;
  let createAt = 0;
  let itemqty = 0;
  let itemqtyfixed = 0;
  let totalPrice = 0;

  useEffect(() => {
    Axios.get(`${ORDERID}/${id}`)
      .then((data) => {
        setOrders(data.data[0]);
        setStatus(data.data[0].status);
        setGetOrders(data.data[0].order_items);
        setOrderPrice(data.data[0].payment[0]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  async function HandleSubmit(e) {
    // setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${ORDER}/edit/${id}`, {
        status: status,
      });
      alert("Status Changed successfully");
    } catch (err) {
      // setLoading(false);
      console.log(err);
    }
  }

  const showOrderProducts = getOrders.map((item, key) => {
    return (
      <tbody>
        <tr>
          <td>
            <NavLink
              className="text-secondary"
              to={`../../products/${item.product_slug}`}
            >
              {item.product_title}
            </NavLink>
            ({item.size}) * {item.qty}
          </td>
          <td>${item.price}</td>
          <td>${(item.price * item.qty).toFixed(2)}</td>
        </tr>
      </tbody>
    );
  });

  let createAtDate = orders ? TransformDated(orders.created_at) : <></>;
  let createAtTime = orders ? TransformTime(orders.created_at) : <></>;

  return (
    <Container>
      <main>
        <section>
          <div class="order-complete">
            <div>
              <NavLink className="col btn mt-3" to="../orders">
                <FontAwesomeIcon
                  style={{ transform: "scaleX(-1)" }}
                  icon={faArrowRight}
                  className="px-2"
                />
                Back
              </NavLink>
            </div>
            <h1 className="text-center mt-3">Order Details</h1>
            <div class="checkout__totals-wrapper">
              <div class="order-complete">
                <div class="order-info">
                  <div class="order-info__item">
                    <label>Order Number</label>
                    <span>#{orders?.id}</span>
                  </div>
                  <div class="order-info__item">
                    <label>Date</label>
                    <span>
                      {createAtDate} | {createAtTime}
                    </span>
                  </div>
                  <div class="order-info__item">
                    <label>Tracking Number</label>
                    <span>{orders?.tracking_no}</span>
                  </div>
                  <div class="order-info__item">
                    <label>Paymetn Method</label>
                    <span>
                      {orders?.payment_mode === "0" ? (
                        <span>Cash on Delivery</span>
                      ) : orders?.payment_mode === "1" ? (
                        <span>Visa</span>
                      ) : orders?.payment_mode === "2" ? (
                        <span>Mada</span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <p className="text-secondary mt-4">Status:</p>
                  <div class="order-info__item">
                    <Form onSubmit={HandleSubmit}>
                      <Form.Group controlId="exampleForm.ControlInput3">
                        <div className="d-flex gap-1">
                          <Form.Select
                            required
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option disabled value="">
                              Select Status
                            </option>
                            <option value="0">Pending</option>
                            <option value="1">Awaiting Payment</option>
                            <option value="2">Awaiting Shipment</option>
                            <option value="3">Completed</option>
                            <option value="4">Shipped</option>
                            <option value="5">Cancelled</option>
                            <option value="6">Waiting</option>
                          </Form.Select>{" "}
                          <button className="btn btn-primary">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </div>
                      </Form.Group>
                    </Form>
                  </div>
                </div>
                <div class="order-info mt-3">
                  <div class="order-info__item">
                    <label>Full name:</label>
                    <span>
                      {orders?.firstname} {orders.lastname}
                    </span>
                  </div>
                  <div class="order-info__item">
                    <label>City:</label>
                    <span>{orders?.city}</span>
                  </div>
                  <div class="order-info__item">
                    <label>Address:</label>
                    <span>{orders?.address}</span>
                  </div>
                  <div class="order-info__item">
                    <label>Zipcode:</label>
                    <span>{orders?.zipcode}</span>
                  </div>
                  <div class="order-info__item">
                    <label>Phone:</label>
                    <span>{orders?.phone}</span>
                  </div>
                </div>
              </div>
              <div class="checkout__totals">
                <h3>Order Details</h3>
                <table class="checkout-cart-items">
                  <thead>
                    <tr>
                      {loading ? (
                        <th>PRODUCT</th>
                      ) : getOrders?.length > 1 ? (
                        <th>PRODUCTS</th>
                      ) : (
                        <th>PRODUCT</th>
                      )}
                      <th>SUBTOTAL</th>
                      <th>TOTAL</th>
                    </tr>
                  </thead>
                  {showOrderProducts}
                </table>
                <table class="checkout-totals">
                  <tbody>
                    <tr>
                      <th>SUBTOTAL</th>
                      <td>${orderPrice?.productsprice}</td>
                    </tr>
                    <tr>
                      <th>SHIPPING</th>
                      <td>Free shipping</td>
                    </tr>
                    <tr>
                      <th>VAT</th>
                      <td>${orderPrice?.vat}</td>
                    </tr>
                    {orders?.fees !== "0" ? (
                      <>
                        <tr>
                          <th>COD Fees</th>
                          <td>${orderPrice?.fees}</td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )}
                    <tr>
                      <th>TOTAL</th>
                      <td>${orders?.totalprice * 1 + orderPrice?.fees * 1}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Container>
  );
}
