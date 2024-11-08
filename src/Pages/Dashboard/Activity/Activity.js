import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { USER, ORDERSCOUNT, LASTORDERS } from "../../../API/Api";
import { NavLink } from "react-router-dom";
import "./activity.css";
import { useQuery } from "react-query";
import { Container } from "react-bootstrap";

export default function Activity() {
  const [lastOrders, setLastOrders] = useState([]);

  useEffect(() => {
    Axios.get(`${LASTORDERS}`)
      .then((data) => {
        setLastOrders(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

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

  useEffect(() => {
    document.title = `Ahmed store | Dashboard`;
  }, []);

  const showOrders = lastOrders.map((item, key) => (
    <table className="card-styling table-responsive" key={key}>
      <tr className="d-flex gap20 col-md">
        <NavLink
          className="col text-black d-flex gap20"
          to={`../orders/${item?.slug}`}
        >
          <td className="col-2">#{item.id}</td>
          <td className="col">Username: {item?.users[0].name}</td>
          <td className="col-2">Price: ${item?.totalprice}</td>
          <td className="col">
            Date:{" "}
            {(item?.updated_at).slice(0, 10) +
              " | " +
              (item?.updated_at).slice(11, 16)}
          </td>
        </NavLink>
      </tr>
    </table>
  ));

  return (
    <Container>
      <div className="wg-chart-default m-3">
        <h1>Welcome: {userName?.data.name}</h1>
      </div>

      <div className="m-3">
        <div className="flex gap20 flex-wrap">
          <div>
            <NavLink className="text-black" to="../orders">
              <div className="wg-chart-default mb-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap14">
                    <i
                      className="material-icons mt-3"
                      style={{ color: "#4379F2" }}
                    >
                      inventory_2
                    </i>
                    <div>
                      <div className="body-text mb-2">Orders</div>
                      <h4 className="fw-bold">{orders?.data.orderscount}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink className="text-black" to="../orders">
              <div className="wg-chart-default mb-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap14">
                    <span
                      className="material-icons my-3"
                      style={{ color: "#6EC207" }}
                    >
                      payments
                    </span>
                    <div>
                      <div className="body-text mb-2">Total Amount</div>
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
              <div className="wg-chart-default mb-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap14">
                    <i
                      className="material-icons mt-3"
                      style={{ color: "#4379F2" }}
                    >
                      inventory_2
                    </i>
                    <div>
                      <div className="body-text mb-2">Pending Orders</div>
                      <h4 className="fw-bold">{orders?.data.orderspending}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink className="text-black" to="../orders">
              <div className="wg-chart-default">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap14">
                    <span
                      className="material-icons my-3"
                      style={{ color: "#6EC207" }}
                    >
                      payments
                    </span>
                    <div>
                      <div className="body-text mb-2">
                        Pending Orders Amount
                      </div>
                      <h4 className="fw-bold">
                        ${orders?.data.orderspendingamount}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>

          <div>
            <NavLink className="text-black" to="../orders">
              <div className="wg-chart-default mb-20">
                <div className="flex align-items-center justify-content-between">
                  <div className="flex align-items-center gap14">
                    <i
                      className="material-icons mt-3"
                      style={{ color: "#4379F2" }}
                    >
                      inventory_2
                    </i>
                    <div>
                      <div className="body-text mb-2">Delivered Orders</div>
                      <h4 className="fw-bold">{orders?.data.ordercompleted}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink className="text-black" to="../orders">
              <div className="wg-chart-default mb-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap14">
                    <span
                      className="material-icons my-3"
                      style={{ color: "#6EC207" }}
                    >
                      payments
                    </span>
                    <div>
                      <div className="body-text mb-2">
                        Delivered Orders Amount
                      </div>
                      <h4 className="fw-bold">
                        ${orders?.data.ordercompletedamount}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink className="text-black" to="../orders">
              <div className="wg-chart-default mb-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap14">
                    <i
                      className="material-icons mt-3"
                      style={{ color: "#4379F2" }}
                    >
                      inventory_2
                    </i>{" "}
                    <div>
                      <div className="body-text mb-2">Cancelled Orders</div>
                      <h4 className="fw-bold">
                        {orders?.data.orderscancelled}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink className="text-black" to="../orders">
              <div className="wg-chart-default">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap14">
                    <span
                      className="material-icons my-3"
                      style={{ color: "#6EC207" }}
                    >
                      payments
                    </span>
                    <div>
                      <div className="body-text mb-2">
                        Cancelled Orders Amount
                      </div>
                      <h4 className="fw-bold">
                        ${orders?.data.orderscancelledamount}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>

          <div className="col-12 col-md">
            <div className="d-flex">
              <div className="col d-flex gap20">
                <div className="col-5 col-md">
                  <NavLink className="text-black" to="../users">
                    <div className="wg-chart-default mb-20">
                      <div className="flex items-center justify-content-between">
                        <div className="flex items-center gap14">
                          <i
                            className="material-icons mt-3"
                            style={{ color: "#4379F2" }}
                          >
                            group
                          </i>
                          <div>
                            <div className="body-text mb-2">Users</div>
                            <h4 className="fw-bold">
                              {orders?.data.UsersCount}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
                <div className="col-5 col-md">
                  <NavLink className="text-black" to="../products">
                    <div className="wg-chart-default-products mb-20">
                      <div className="flex align-items-center justify-content-between">
                        <div className="flex align-items-center">
                          <i
                            className="material-icons mx-2"
                            style={{ color: "#4379F2" }}
                          >
                            inventory_2
                          </i>
                          <div>
                            <div className="body-text mb-2">Products</div>
                            <h4 className="fw-bold">
                              {orders?.data.ProductsCount}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
            <div>
              <div className="wg-chart-default-orders mb-20">
                <div>
                  <div className="d-flex justify-content-center align-items-center gap-3">
                    <i className="material-icons" style={{ color: "#4379F2" }}>
                      list_alt
                    </i>
                    <h3>Last Orders</h3>
                  </div>
                  <div
                    className="card"
                    style={{
                      height: "300px",
                      maxWidth: window.innerWidth > 768 ? "500px" : "300px",
                    }}
                  >
                    <div className="table-responsive rounded">
                      <table className="table table-borderless">
                        <tbody>{showOrders}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
