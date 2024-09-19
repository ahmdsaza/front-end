import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import {
  USER,
  ORDERSCOUNT,
  ORDERSPENDINGCOUNT,
  ORDERSCOMPLETEDCOUNT,
  ORDERSCANCELLEDCOUNT,
  ORDERSAMOUNT,
  ORDERSPENDINGAMOUNT,
  ORDERSCOMPLETEDAMOUNT,
  ORDERSCANCELLEDAMOUNT,
} from "../../../API/Api";
import { NavLink } from "react-router-dom";
import "./activity.css";

export default function Activity() {
  const [orders, setOrders] = useState([]);
  const [ordersPending, setOrdersPending] = useState([]);
  const [ordersCompleted, setOrdersCompleted] = useState([]);
  const [ordersCancelled, setOrdersCancelled] = useState([]);
  const [ordersAmount, setOrdersAmount] = useState([]);
  const [ordersPendingAmount, setOrdersPendingAmount] = useState([]);
  const [ordersCompletedAmount, setOrdersCompletedAmount] = useState([]);
  const [ordersCancelledAmount, setOrdersCancelledAmount] = useState([]);
  const [name, setName] = useState([]);

  useEffect(() => {
    Axios.get(`${ORDERSCOUNT}`)
      .then((data) => setOrders(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`${ORDERSPENDINGCOUNT}`)
      .then((data) => setOrdersPending(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`${ORDERSCOMPLETEDCOUNT}`)
      .then((data) => setOrdersCompleted(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`${ORDERSCANCELLEDCOUNT}`)
      .then((data) => setOrdersCancelled(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`${ORDERSAMOUNT}`)
      .then((data) => setOrdersAmount(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`${ORDERSPENDINGAMOUNT}`)
      .then((data) => setOrdersPendingAmount(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`${ORDERSCOMPLETEDAMOUNT}`)
      .then((data) => setOrdersCompletedAmount(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`${ORDERSCANCELLEDAMOUNT}`)
      .then((data) => setOrdersCancelledAmount(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Gett User Name
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setName(data.data.name))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div class="username my-3 mx-3">
        <h1 class="body-text mb-2 text-center">Welcome: {name}</h1>
      </div>
      {/*<div>
        <NavLink to={`../orders`} className="text-black">
          Orders number: {orders}
        </NavLink>
      </div> */}
      <div className="my-3 mx-3">
        <div class="flex gap20 flex-wrap">
          <div class="">
            <div class="wg-chart-default mb-20">
              <div class="flex align-items-center justify-content-between">
                <div class="flex align-items-center gap14">
                  <i class="material-icons mt-3" style={{ color: "#4379F2" }}>
                    inventory_2
                  </i>
                  <div>
                    <div class="body-text mb-2">Total Orders</div>
                    <h4 className="fw-bold">{orders}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="wg-chart-default mb-20">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap14">
                  <span
                    class="material-icons my-3"
                    style={{ color: "#6EC207" }}
                  >
                    payments
                  </span>
                  <div>
                    <div class="body-text mb-2">Total Amount</div>
                    <h4 className="fw-bold">${ordersAmount}</h4>
                    <small style={{ position: "absolute" }}>
                      * With out Cancelled orders
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div class="wg-chart-default mb-20">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap14">
                  <i class="material-icons mt-3" style={{ color: "#4379F2" }}>
                    inventory_2
                  </i>
                  <div>
                    <div class="body-text mb-2">Pending Orders</div>
                    <h4 className="fw-bold">{ordersPending}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="wg-chart-default">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap14">
                  <span
                    class="material-icons my-3"
                    style={{ color: "#6EC207" }}
                  >
                    payments
                  </span>
                  <div>
                    <div class="body-text mb-2">Pending Orders Amount</div>
                    <h4 className="fw-bold">${ordersPendingAmount}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="">
            <div class="wg-chart-default mb-20">
              <div class="flex align-items-center justify-content-between">
                <div class="flex align-items-center gap14">
                  <i class="material-icons mt-3" style={{ color: "#4379F2" }}>
                    inventory_2
                  </i>
                  <div>
                    <div class="body-text mb-2">Delivered Orders</div>
                    <h4 className="fw-bold">{ordersCompleted}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="wg-chart-default mb-20">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap14">
                  <span
                    class="material-icons my-3"
                    style={{ color: "#6EC207" }}
                  >
                    payments
                  </span>
                  <div>
                    <div class="body-text mb-2">Delivered Orders Amount</div>
                    <h4 className="fw-bold">${ordersCompletedAmount}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="wg-chart-default mb-20">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap14">
                  <i class="material-icons mt-3" style={{ color: "#4379F2" }}>
                    inventory_2
                  </i>{" "}
                  <div>
                    <div class="body-text mb-2">Canceled Orders</div>
                    <h4 className="fw-bold">{ordersCancelled}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="wg-chart-default">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap14">
                  <span
                    class="material-icons my-3"
                    style={{ color: "#6EC207" }}
                  >
                    payments
                  </span>
                  <div>
                    <div class="body-text mb-2">Canceled Orders Amount</div>
                    <h4 className="fw-bold">${ordersCancelledAmount}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
