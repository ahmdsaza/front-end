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
import { useQuery } from "react-query";

export default function Activity() {
  const { data: orderCount } = useQuery({
    queryFn: () => Axios.get(`${ORDERSCOUNT}`),
    queryKey: "ordercount",
    staleTime: 60 * 1000,
  });

  const { data: ordersPending } = useQuery({
    queryFn: () => Axios.get(`${ORDERSPENDINGCOUNT}`),
    queryKey: "orderpending",
    staleTime: 60 * 1000,
  });

  const { data: ordersCompleted } = useQuery({
    queryFn: () => Axios.get(`${ORDERSCOMPLETEDCOUNT}`),
    queryKey: "ordercompleted",
    staleTime: 60 * 1000,
  });

  const { data: ordersCancelled } = useQuery({
    queryFn: () => Axios.get(`${ORDERSCANCELLEDCOUNT}`),
    queryKey: "ordercancelled",
    staleTime: 60 * 1000,
  });

  const { data: ordersAmount } = useQuery({
    queryFn: () => Axios.get(`${ORDERSAMOUNT}`),
    queryKey: "ordersamount",
    staleTime: 60 * 1000,
  });

  const { data: ordersPendingAmount } = useQuery({
    queryFn: () => Axios.get(`${ORDERSPENDINGAMOUNT}`),
    queryKey: "orderspendingamount",
    staleTime: 60 * 1000,
  });

  const { data: ordersCompletedAmount } = useQuery({
    queryFn: () => Axios.get(`${ORDERSCOMPLETEDAMOUNT}`),
    queryKey: "orderscompletedamount",
    staleTime: 60 * 1000,
  });

  const { data: ordersCancelledAmount } = useQuery({
    queryFn: () => Axios.get(`${ORDERSCANCELLEDAMOUNT}`),
    queryKey: "orderscancelledamount",
    staleTime: 60 * 1000,
  });

  // Gett User Name
  const { data: userName } = useQuery({
    queryFn: () => Axios.get(`${USER}`),
    queryKey: "user",
    staleTime: Infinity,
  });

  return (
    <div>
      <div class="username my-3 mx-3">
        <h1 class="body-text mb-2 text-center">
          Welcome: {userName?.data.name}
        </h1>
      </div>
      {/*<div>
        <NavLink to={`../orders`} className="text-black">
          Orders number: {orders}
        </NavLink>
      </div> */}
      <div className="my-3 mx-3">
        <div class="flex gap20 flex-wrap">
          <div class="">
            <NavLink className="text-black" to="../orders">
              <div class="wg-chart-default mb-20">
                <div class="flex align-items-center justify-content-between">
                  <div class="flex align-items-center gap14">
                    <i class="material-icons mt-3" style={{ color: "#4379F2" }}>
                      inventory_2
                    </i>
                    <div>
                      <div class="body-text mb-2">Total Orders</div>
                      <h4 className="fw-bold">{orderCount?.data}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink className="text-black" to="../orders">
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
                      <h4 className="fw-bold">${ordersAmount?.data}</h4>
                      <small style={{ position: "absolute" }}>
                        * With out Cancelled orders
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink className="text-black" to="../orders">
              <div class="wg-chart-default mb-20">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap14">
                    <i class="material-icons mt-3" style={{ color: "#4379F2" }}>
                      inventory_2
                    </i>
                    <div>
                      <div class="body-text mb-2">Pending Orders</div>
                      <h4 className="fw-bold">{ordersPending?.data}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink className="text-black" to="../orders">
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
                      <h4 className="fw-bold">${ordersPendingAmount?.data}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>

          <div class="">
            <NavLink className="text-black" to="../orders">
              <div class="wg-chart-default mb-20">
                <div class="flex align-items-center justify-content-between">
                  <div class="flex align-items-center gap14">
                    <i class="material-icons mt-3" style={{ color: "#4379F2" }}>
                      inventory_2
                    </i>
                    <div>
                      <div class="body-text mb-2">Delivered Orders</div>
                      <h4 className="fw-bold">{ordersCompleted?.data}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink className="text-black" to="../orders">
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
                      <h4 className="fw-bold">
                        ${ordersCompletedAmount?.data}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink className="text-black" to="../orders">
              <div class="wg-chart-default mb-20">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap14">
                    <i class="material-icons mt-3" style={{ color: "#4379F2" }}>
                      inventory_2
                    </i>{" "}
                    <div>
                      <div class="body-text mb-2">Canceled Orders</div>
                      <h4 className="fw-bold">{ordersCancelled?.data}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink className="text-black" to="../orders">
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
                      <h4 className="fw-bold">
                        ${ordersCancelledAmount?.data}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
