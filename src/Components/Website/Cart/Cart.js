import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Axios } from "../../../API/axios";
import { CARTS, UPDATEQTY, COUPON } from "../../../API/Api";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CartExport } from "../../../Context/CartContext";
import resetIcon from "../../../Assets/resetIcon.png";
import "./cart.css";

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [couponCheckCall, setCouponCheckCall] = useState(1);
  const [count, setCount] = useState(false);
  let totalCartPrice = 0;
  let itemPrice = 0;
  let descPrice = 0;
  let tot = 0;

  const { setIsChange } = useContext(CartExport);

  // Import Cart
  useEffect(() => {
    Axios.get(`${CARTS}`)
      .then((data) => setCarts(data.data))
      .then((document.title = "Ahmed store | Cart"))
      .catch((err) => console.log(err));
  }, []);

  function handleDecrement(qty_id) {
    setCarts((cart) =>
      carts.map((item) =>
        qty_id === item.id
          ? { ...item, product_qty: item.product_qty - 1 }
          : item
      )
    );
    updateCartQuantity(qty_id, "dec");
  }

  function handleIncrement(qty_id) {
    setCarts((cart) =>
      carts.map((item) =>
        qty_id === item.id
          ? { ...item, product_qty: item.product_qty + 1 }
          : item
      )
    );
    updateCartQuantity(qty_id, "inc");
  }

  function updateCartQuantity(qty_id, scope) {
    Axios.put(`${UPDATEQTY}/${qty_id}/${scope}`);
  }

  const showCart = carts.map((item, key) => {
    if (item.product?.discount > 0) {
      totalCartPrice += item.product?.discount * item?.product_qty;
      itemPrice = item.product?.discount * 1;
      descPrice = itemPrice * item.product_qty;
      tot = descPrice.toFixed(2);
    } else {
      totalCartPrice += item.product?.price * item?.product_qty;
      itemPrice = item.product?.price * 1;
      descPrice = itemPrice * item.product_qty;
      tot = descPrice.toFixed(2);
    }

    // Handle Delete
    async function handleDelete(id) {
      try {
        const res = await Axios.delete(`${CARTS}/${id}`);
        setCarts((prev) => prev.filter((item) => item.id !== id));
        setIsChange((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <table className="cardStyling py-3 w-100 table-responsive" key={key}>
        <tr className="row col-md">
          <div className="col">
            <NavLink
              to={`../products/${item.product?.slug}`}
              className="text-black fw-bold fs-4"
            >
              <img
                className="cart-image"
                src={
                  item?.images[1]?.image
                    ? item?.images[1]?.image
                    : item?.images[0]?.image
                }
                alt={item.product?.title}
              />
            </NavLink>
          </div>
          <div className="col">
            <NavLink
              to={`../products/${item.product?.slug}`}
              className=" text-black fw-bold fs-4"
            >
              <p>{item.product?.title}</p>
            </NavLink>
            <div className="d-flex gap-1">
              <p>Price: </p>
              <p>${itemPrice.toFixed(2)}</p>
            </div>
            <div className=" d-flex gap-1">
              <p>Total: </p>
              <p>${tot}</p>
            </div>
            <div className=" d-flex gap-1">
              <p>Size: </p>
              <p>{item.sizes[0]?.title}</p>
            </div>
            <div className="d-flex border w-50 rounded">
              <input
                className="minus"
                type="button"
                value=" - "
                disabled={item.product_qty < 2}
                onClick={() => handleDecrement(item?.id)}
              />
              <span className="count-qty">{item?.product_qty}</span>
              {/* product Quantity */}
              <input
                className="sum"
                type="button"
                value=" + "
                disabled={item?.product_qty === item.sizes[0]?.quantity}
                onClick={() => handleIncrement(item?.id)}
              />
            </div>
          </div>{" "}
          <div className="col-2 mt-3">
            <FontAwesomeIcon
              onClick={() => handleDelete(item?.id)}
              fontSize={"19px"}
              color="red"
              cursor={"pointer"}
              icon={faTrash}
            />
          </div>
        </tr>
      </table>
    );
  });

  let vat = totalCartPrice * 0.15;
  let totalWithVat = totalCartPrice + vat;

  function handleCheckCoupon(couponCheck) {
    Axios.get(`${COUPON}/check/${couponCheck}`)
      .then((data) => {
        setCouponCheckCall(data?.data.percent);
      })
      .catch((err) => {
        console.log(err);
      });
    setCount((prev) => !prev);
  }

  function handleResetCoupon() {
    setCoupon("");
    setCouponCheckCall(1);
    setCount((prev) => !prev);
  }

  return (
    <Container>
      <div className="row px-md-4">
        <div className="col-lg-8">
          <h1 className="d-flex justify-content-center">
            Shopping Cart
            {carts?.length > 0 ? <p> ({carts?.length})</p> : <></>}
          </h1>
          <div>
            <div
              className="card"
              style={{ height: carts?.length > 0 ?? "400px" }}
            >
              <div className="cart-body table-responsive px-md-4 px-2 pt-3">
                <table className="table table-borderless">
                  {carts?.length > 0 ? (
                    <tbody>{showCart}</tbody>
                  ) : (
                    <div className="text-center">
                      <h3>No Items in Cart</h3>
                    </div>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="col-lg-12 payment-summary">
            <p className="fw-bold pt-lg-0 pt-4 pb-2">Cart Summary</p>
            <div className="card px-md-3 px-2 pt-2">
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between py-3">
                  <small className="text-muted">Order price</small>
                  <p>${totalCartPrice?.toFixed(2)}</p>
                </div>

                <div
                  className={`d-flex justify-content-between pb-3 ${
                    couponCheckCall > 1 ? "" : "border-bottom"
                  } `}
                >
                  <small className="text-muted">VAT</small>
                  <p>${vat.toFixed(2)}</p>
                </div>
                {couponCheckCall > 1 ? (
                  <div className="d-flex justify-content-between pb-3 border-bottom">
                    <small className="text-muted">Discount</small>
                    <p>
                      ${(totalWithVat * (couponCheckCall / 100)).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                <div className="d-flex justify-content-between mt-3 mb-3">
                  <p className="fw-bold">Total Amount</p>
                  <p className="fw-bold">
                    $
                    {couponCheckCall > 1
                      ? totalWithVat?.toFixed(2) -
                        ((totalWithVat * couponCheckCall) / 100).toFixed(2)
                      : totalWithVat?.toFixed(2)}
                  </p>
                </div>
                {/* <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex gap-3">
                    <p className="fw-bold">Coupon:</p>
                    <input
                      disabled={count}
                      className="fw-bold rounded border"
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                  </div>
                  <div className="d-flex gap-1 col">
                    <Button
                      disabled={coupon.length < 1 || count}
                      onClick={() => handleCheckCoupon(coupon)}
                    >
                      Active
                    </Button>
                    <Button
                      disabled={coupon.length < 1}
                      className="btn btn-secondary"
                      onClick={() => handleResetCoupon()}
                    >
                      <img src={resetIcon} width="25" />
                    </Button>
                  </div>
                </div>
                {couponCheckCall != 1 && !couponCheckCall ? (
                  <div className="alert alert-danger">
                    The coupon may not existed or expired
                  </div>
                ) : (
                  <></>
                )} */}
              </div>
            </div>
            {carts.length > 0 ? (
              <NavLink to="../checkout">
                <button className="checkout-button mt-3">
                  <div className="checkout-span">Check Out</div>
                </button>
              </NavLink>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
