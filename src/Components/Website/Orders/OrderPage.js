import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ORDERID } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Container, Button, Form, Modal, Table } from "react-bootstrap";
import TransformDated from "../../../helpers/TransformDated";
import TransformTime from "../../../helpers/TransformTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

import "../CheckOut/thankyou.css";

export default function OrderPage() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [getOrders, setGetOrders] = useState([]);
  const [orderPrice, setOrderPrice] = useState([]);
  const [coupon, setCoupon] = useState([]);
  const [count, setCount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Axios.get(`${ORDERID}/${id}`)
      .then((data) => {
        setOrders(data.data[0]);
        setGetOrders(data.data[0].order_items);
        setOrderPrice(data.data[0].payment[0]);
        setCoupon(data.data[0].coupon[0]);
        document.title = `Ahmed store | Order #${data.data[0]?.id}`;
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [count]);

  const showOrderProducts = getOrders.map((item, key) => {
    return (
      <>
        <tbody key={key}>
          <tr>
            <td>
              <NavLink
                className="text-secondary"
                to={`../products/${item.product_slug}`}
              >
                {item.product_title}
              </NavLink>
              ({item.size}) * {item.qty}
            </td>
            <td>${item.price}</td>
            <td>${(item.price * item.qty).toFixed(2)}</td>
            {orders.status === 3 ? (
              <td>
                <NavLink to={`../rate/${item.product_slug}`} className="mx-2">
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

  function handleCancelCall() {
    handleShow();
  }

  function handleCloseModal() {
    handleCancel();
    handleClose();
  }

  async function handleCancel() {
    try {
      const res = await Axios.post(`${ORDERID}/cancel/${id}`);
      toast.success("Order cancelled successfully", {
        autoClose: 2000,
      });
      setCount((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  let createAtDate = orders ? TransformDated(orders?.created_at) : <></>;
  let createAtTime = orders ? TransformTime(orders?.created_at) : <></>;

  return (
    <Container>
      <main>
        <section>
          <div className="order-complete">
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
            <div className="checkout__totals-wrapper">
              <div className="order-complete">
                <div className="order-info bg-white">
                  <div className="order-info__item">
                    <label>Order Number</label>
                    <span>#{orders.id}</span>
                  </div>
                  <div className="order-info__item">
                    <label>Date</label>
                    <span>
                      {createAtDate} | {createAtTime}
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
                        <>
                          {" "}
                          {/* <p className="bg-warning rounded-1 p-1 text-white">
                          Waiting
                        </p> */}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="order-info mt-3 bg-white">
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
              <div className="checkout__totals bg-white">
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
                <table className="checkout-totals">
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
                      <td>${orderPrice?.vat}</td>
                    </tr>
                    {coupon?.id > 0 ? (
                      <tr>
                        <th>Discount</th>
                        <td className="d-flex gap-2 align-items-end">
                          $
                          {(
                            (parseFloat(orderPrice?.productsprice) +
                              parseFloat(orderPrice?.vat)) *
                            (coupon?.percent / 100)
                          ).toFixed(2)}
                          <small className="text-secondary">
                            %{coupon?.percent}
                          </small>
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )}
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
                      <td>${orders?.totalprice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {orders?.status < 3 ? (
              <Button onClick={handleCancelCall} className="btn btn-danger">
                Cancel Order
              </Button>
            ) : (
              <></>
            )}
          </div>
        </section>
      </main>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel the order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={() => handleCloseModal()} variant="primary">
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Container>
  );
}
