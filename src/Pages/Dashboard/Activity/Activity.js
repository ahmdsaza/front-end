import React from "react";
import { Axios } from "../../../API/axios";
import { USER, ORDERSCOUNT } from "../../../API/Api";
import { NavLink } from "react-router-dom";
import "./activity.css";
import { useQuery } from "react-query";

export default function Activity() {
  const { data: orders } = useQuery({
    queryFn: () => Axios.get(`${ORDERSCOUNT}`),
    queryKey: "ordercount",
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
                      <div class="body-text mb-2">Orders</div>
                      <h4 className="fw-bold">{orders?.data.orderscount}</h4>
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
                      <h4 className="fw-bold">${orders?.data.ordersamount}</h4>
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
                      <h4 className="fw-bold">{orders?.data.orderspending}</h4>
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
                      <h4 className="fw-bold">
                        ${orders?.data.orderspendingamount}
                      </h4>
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
                      <h4 className="fw-bold">{orders?.data.ordercompleted}</h4>
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
                        ${orders?.data.ordercompletedamount}
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
                      <div class="body-text mb-2">Cancelled Orders</div>
                      <h4 className="fw-bold">
                        {orders?.data.orderscancelled}
                      </h4>
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
                      <div class="body-text mb-2">Cancelled Orders Amount</div>
                      <h4 className="fw-bold">
                        ${orders?.data.orderscancelledamount}
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
