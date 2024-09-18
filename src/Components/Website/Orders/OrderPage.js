import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ORDERID } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Container } from "react-bootstrap";
import TransformDated from "../../../helpers/TransformDated";
import TransformTime from "../../../helpers/TransformTime";
import "../CheckOut/thankyou.css";

export default function OrderPage() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [getOrders, setGetOrders] = useState([]);
  const [orderPrice, setOrderPrice] = useState([]);
  const [loading, setLoading] = useState(true);
  let totalCartPrice = 0;
  let totalPrice = 0;

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

  // const showOrderItems = orders.map((item, key) => {
  //   createAt = item.created_at;
  //   return (
  //     <div class="order-complete">
  //       <div class="order-info">
  //         <div class="order-info__item">
  //           <label>Order Number</label>
  //           <span>#{item.id}</span>
  //         </div>
  //         <div class="order-info__item">
  //           <label>Date</label>
  //           <span>
  //             {createAt.slice(0, 10)} | {createAt.slice(11, 16)}
  //           </span>
  //         </div>
  //         <div class="order-info__item">
  //           <label>Tracking Number</label>
  //           <span>{item.tracking_no}</span>
  //         </div>
  //         <div class="order-info__item">
  //           <label>Paymetn Method</label>
  //           <span>
  //             {item.payment_mode == 0 ? (
  //               <span>Cash on Delivery</span>
  //             ) : item.payment_mode == 1 ? (
  //               <span>Visa</span>
  //             ) : item.payment_mode == 2 ? (
  //               <span>Mada</span>
  //             ) : (
  //               <></>
  //             )}
  //           </span>
  //         </div>
  //         <div class="order-info__item">
  //           <label>status</label>
  //           <p className="d-flex gap-1 my-0">
  //             {item.status === 0 ? (
  //               <p className="bg-primary rounded-1 px-1 text-white">Pending</p>
  //             ) : item.status === 1 ? (
  //               <p className="bg-warning rounded-1 px-1 text-black">
  //                 Awaiting Payment
  //               </p>
  //             ) : item.status === 2 ? (
  //               <p className="bg-secondary rounded-1 px-1 text-white">
  //                 Awaiting Shipment
  //               </p>
  //             ) : item.status === 3 ? (
  //               <p className="bg-success rounded-1 px-1 text-white">
  //                 Completed
  //               </p>
  //             ) : item.status === 4 ? (
  //               <p className="bg-success rounded-1 px-1 text-white">Shipped</p>
  //             ) : item.status === 5 ? (
  //               <p className="bg-danger rounded-1 px-1 text-white">Cancelled</p>
  //             ) : (
  //               <p>Waiting</p>
  //             )}
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });

  const showOrderProducts = getOrders.map((item, key) => {
    totalCartPrice += item.price * item.qty;
    totalPrice = totalCartPrice * 1.15;

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
              </NavLink>{" "}
              ({item.size}) * {item.qty}
            </td>
            <td>${item.price}</td>
            <td>${(item.price * item.qty).toFixed(2)}</td>
          </tr>
        </tbody>
      </>
    );
  });
  let vat = totalCartPrice * 0.15;

  let createAtDate = orders ? TransformDated(orders.created_at) : <></>;
  let createAtTime = orders ? TransformTime(orders.created_at) : <></>;

  // console.log(orders);

  return (
    <Container>
      <main class="pt-90">
        <NavLink className="btn btn-primary" to="../orders">
          {" "}
          &lt;- Back to Orders
        </NavLink>
        <div class="mb-4 "></div>
        <section class="shop-checkout container">
          <div class="order-complete">
            <h1>Order Details</h1>
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
                    {orders.payment_mode === "0" ? (
                      <>
                        <tr>
                          <th>COD Fees</th>
                          <td>$5.00</td>
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
