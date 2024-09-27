import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { GETLASTORDER } from "../../../API/Api";
import { NavLink } from "react-router-dom";
import "./thankyou.css";
import TransformDated from "../../../helpers/TransformDated";
import TransformTime from "../../../helpers/TransformTime";

export default function ThankYou() {
  const [orders, setOrders] = useState([]);
  const [getOrders, setGetOrders] = useState([]);
  const [orderPrice, setOrderPrice] = useState([]);
  const [loading, setLoading] = useState(true);

  let totalCartPrice = 0;
  let itemqty = 0;
  let totalPrice = 0;

  useEffect(() => {
    Axios.get(`${GETLASTORDER}`)
      .then((data) => {
        setOrders(data.data[0]);
        setGetOrders(data.data[0].order_items);
        setOrderPrice(data.data[0].payment[0]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const showOrderProducts = getOrders.map((item, key) => {
    itemqty = item.price * item.qty;
    totalCartPrice += item.price * item.qty;
    totalPrice = totalCartPrice * 1.15;

    return (
      <>
        <tbody>
          <tr>
            <td>
              <NavLink
                className="text-secondary"
                to={`../products/${item.product_slug}`}
              >
                {item.product_title}
              </NavLink>{" "}
              ({item.size}) * {item.qty}
            </td>
            <td>${item.price} </td>
            <td>${(item.price * item.qty).toFixed(2)}</td>
          </tr>
        </tbody>
      </>
    );
  });

  let vat = totalCartPrice * 0.15;

  let createAtDate = orders ? TransformDated(orders.created_at) : <></>;
  let createAtTime = orders ? TransformTime(orders.created_at) : <></>;

  return (
    <main className="pt-90">
      <div className="mb-4 pb-4"></div>
      <section className="shop-checkout container">
        <h2 className="page-title">Order Received</h2>
        <div className="order-complete">
          <div className="order-complete__message">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="40" cy="40" r="40" fill="#4379F2" />
              <path
                d="M52.9743 35.7612C52.9743 35.3426 52.8069 34.9241 52.5056 34.6228L50.2288 32.346C49.9275 32.0446 49.5089 31.8772 49.0904 31.8772C48.6719 31.8772 48.2533 32.0446 47.952 32.346L36.9699 43.3449L32.048 38.4062C31.7467 38.1049 31.3281 37.9375 30.9096 37.9375C30.4911 37.9375 30.0725 38.1049 29.7712 38.4062L27.4944 40.683C27.1931 40.9844 27.0257 41.4029 27.0257 41.8214C27.0257 42.24 27.1931 42.6585 27.4944 42.9598L33.5547 49.0201L35.8315 51.2969C36.1328 51.5982 36.5513 51.7656 36.9699 51.7656C37.3884 51.7656 37.8069 51.5982 38.1083 51.2969L40.385 49.0201L52.5056 36.8996C52.8069 36.5982 52.9743 36.1797 52.9743 35.7612Z"
                fill="white"
              />
            </svg>
            <h3>Your order is completed!</h3>
            <p>Thank you. Your order has been received.</p>
          </div>
          <div className="checkout__totals-wrapper">
            <div className="order-complete">
              <div className="order-info">
                <div className="order-info__item">
                  <label>Order Number</label>
                  <span>#{orders.id}</span>
                </div>
                <div className="order-info__item">
                  <label>Date</label>
                  <span>
                    {createAtTime} | {createAtDate}
                  </span>
                </div>
                <div className="order-info__item">
                  <label>Tracking Number</label>
                  <span>{orders.tracking_no}</span>
                </div>
                <div className="order-info__item">
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
                <div className="order-info__item">
                  <label>Status</label>
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
              <div className="order-info mt-3">
                <div className="order-info__item">
                  <label>Full name:</label>
                  <span>
                    {orders.firstname} {orders.lastname}
                  </span>
                </div>
                <div className="order-info__item">
                  <label>City:</label>
                  <span>{orders.city}</span>
                </div>
                <div className="order-info__item">
                  <label>Address:</label>
                  <span>{orders.address}</span>
                </div>
                <div className="order-info__item">
                  <label>Zipcode:</label>
                  <span>{orders.zipcode}</span>
                </div>
                <div className="order-info__item">
                  <label>Phone:</label>
                  <span>{orders.phone}</span>
                </div>
              </div>
            </div>
            <div className="checkout__totals">
              <h3>Order Details</h3>
              <table className="checkout-cart-items">
                <thead>
                  <tr>
                    {loading ? (
                      <th>PRODUCT</th>
                    ) : getOrders.length > 1 ? (
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
              <table className="checkout-totals">
                <tbody>
                  <tr>
                    <th>SUBTOTAL</th>
                    <td>${totalCartPrice.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>SHIPPING</th>
                    <td>Free shipping</td>
                  </tr>
                  <tr>
                    <th>VAT</th>
                    <td>${vat?.toFixed(2)}</td>
                  </tr>
                  {orderPrice?.fees !== "0.00" ? (
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
                    <td>
                      $
                      {orders.payment_mode === "0"
                        ? orders.totalprice * 1 + orderPrice?.fees * 1
                        : orders.totalprice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
