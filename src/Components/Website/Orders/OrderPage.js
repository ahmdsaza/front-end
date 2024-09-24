import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ORDERID } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Container } from "react-bootstrap";
import TransformDated from "../../../helpers/TransformDated";
import TransformTime from "../../../helpers/TransformTime";
import "../CheckOut/thankyou.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function OrderPage() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [getOrders, setGetOrders] = useState([]);
  const [orderPrice, setOrderPrice] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${ORDERID}/${id}`)
      .then((data) => {
        setOrders(data.data[0]);
        setGetOrders(data.data[0].order_items);
        setOrderPrice(data.data[0].payment[0]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const showOrderProducts = getOrders.map((item, key) => {
    return (
      <>
        <tbody>
          <tr>
            <td>
              <NavLink
                className="text-secondary"
                to={`../products/${item.product_id}`}
              >
                {item.product_title}
              </NavLink>
              ({item.size}) * {item.qty}
            </td>
            <td>${item.price}</td>
            <td>${(item.price * item.qty).toFixed(2)}</td>
            {orders.status === 3 ? (
              <td>
                <NavLink to={`../rate/${item.product_id}`} className="mx-2">
                  <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
                </NavLink>
              </td>
            ) : (
              <></>
            )}
          </tr>
        </tbody>
      </>
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
              <NavLink
                className="col btn mt-3"
                // style={{ width: "120px" }}
                to="../orders"
              >
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
                    <span>#{orders.id}</span>
                  </div>
                  <div class="order-info__item">
                    <label>Date</label>
                    <span>
                      {createAtDate} | {createAtTime}
                    </span>
                  </div>
                  <div class="order-info__item">
                    <label>Tracking Number</label>
                    <span>{orders.tracking_no}</span>
                  </div>
                  <div class="order-info__item">
                    <label>Paymetn Method</label>
                    <span>
                      {orders.payment_mode === "0" ? (
                        <span>Cash on Delivery</span>
                      ) : orders.payment_mode === "1" ? (
                        <span>Visa</span>
                      ) : orders.payment_mode === "2" ? (
                        <span>Mada</span>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                  <div class="order-info__item">
                    <label>status</label>
                    <p className="d-flex gap-1 my-0">
                      {orders.status === 0 ? (
                        <p className="bg-primary rounded-1 px-1 text-white">
                          Pending
                        </p>
                      ) : orders.status === 1 ? (
                        <p className="bg-warning rounded-1 px-1 text-black">
                          Awaiting Payment
                        </p>
                      ) : orders.status === 2 ? (
                        <p className="bg-secondary rounded-1 px-1 text-white">
                          Awaiting Shipment
                        </p>
                      ) : orders.status === 3 ? (
                        <p className="bg-success rounded-1 px-1 text-white">
                          Completed
                        </p>
                      ) : orders.status === 4 ? (
                        <p className="bg-success rounded-1 px-1 text-white">
                          Shipped
                        </p>
                      ) : orders.status === 5 ? (
                        <p className="bg-danger rounded-1 px-1 text-white">
                          Cancelled
                        </p>
                      ) : (
                        <p>Waiting</p>
                      )}
                    </p>
                  </div>
                </div>
                <div class="order-info mt-3">
                  <div class="order-info__item">
                    <label>Full name:</label>
                    <span>
                      {orders.firstname} {orders.lastname}
                    </span>
                  </div>
                  <div class="order-info__item">
                    <label>City:</label>
                    <span>{orders.city}</span>
                  </div>
                  <div class="order-info__item">
                    <label>Address:</label>
                    <span>{orders.address}</span>
                  </div>
                  <div class="order-info__item">
                    <label>Zipcode:</label>
                    <span>{orders.zipcode}</span>
                  </div>
                  <div class="order-info__item">
                    <label>Phone:</label>
                    <span>{orders.phone}</span>
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
                      ) : getOrders.length > 1 ? (
                        <th>PRODUCTS</th>
                      ) : (
                        <th>PRODUCT</th>
                      )}
                      {orders.status === 3 ? (
                        <>
                          <th className="px-1">SUBTOTAL</th>
                          <th>TOTAL</th>
                          <th>Rate</th>
                        </>
                      ) : (
                        <>
                          {" "}
                          <th>SUBTOTAL</th>
                          <th>TOTAL</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  {showOrderProducts}
                </table>
                <table class="checkout-totals">
                  <tbody>
                    <tr>
                      <th>SUBTOTAL</th>
                      <td>${orderPrice.productsprice}</td>
                    </tr>
                    <tr>
                      <th>SHIPPING</th>
                      <td>Free shipping</td>
                    </tr>
                    <tr>
                      <th>VAT</th>
                      <td>${orderPrice.vat}</td>
                    </tr>
                    {orders.fees !== "0" ? (
                      <>
                        <tr>
                          <th>COD Fees</th>
                          <td>${orderPrice.fees}</td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )}
                    <tr>
                      <th>TOTAL</th>
                      <td>${orderPrice.total_price}</td>
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
