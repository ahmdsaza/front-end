import React, { useContext, useEffect, useState } from "react";
import { CARTS, ORDERS, ADDRESS, COUPON } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import Form from "react-bootstrap/Form";
import { Container, Collapse, Button } from "react-bootstrap";
// import resetIcon from "../../../Assets/resetIcon.png";
import madaIcon from "../../../Assets/MADA_icon.png";
import visaIcon from "../../../Assets/VISA_icon.png";
import codIcon from "../../../Assets/COD_icon.png";
import "./checkout.css";
import {
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { CartExport } from "../../../Context/CartContext";
import { ToastContainer, toast } from "react-toastify";

export default function CheckOut() {
  const [carts, setCarts] = useState([]);
  const [saveAddress, setSaveAddress] = useState();
  const [count, setCount] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponCheckCall, setCouponCheckCall] = useState([]);
  const [couponCheck, setCouponCheck] = useState(0);
  const [count2, setCount2] = useState(false);
  const [checkLowestPrice, setCheckLowestPrice] = useState("");
  const [addressCall, setAddressCall] = useState([]);
  const [totalPriceState, setTotalPriceState] = useState("");
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const { setIsChange } = useContext(CartExport);

  // Navigat
  const nav = useNavigate();

  let descPrice = 0;
  let itemPrice = 0;
  let tot = 0;

  const [form, setForm] = useState({
    address_id: "",
    payment_mode: "",
    productsprice: "",
    vat: "",
    totalprice: "",
    coupon_id: "",
    fees: "",
  });

  if (saveAddress == null) {
    form.address_id = addressCall[addressCall.length - 1]?.id;
  }

  const [addressForm, setAddressForm] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    city: "",
    zipcode: "",
  });

  const [updateAddressForm, setUpdateAddressForm] = useState({
    id: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    city: "",
    zipcode: "",
  });

  // Import Cart
  useEffect(() => {
    Axios.get(`${CARTS}`)
      .then((data) => setCarts(data.data))
      .then((document.title = "Ahmed store | Check Out"))
      .catch((err) => console.log(err));
  }, []);

  // Import Address
  useEffect(() => {
    Axios.get(`${ADDRESS}`)
      .then((data) => setAddressCall(data.data))
      .catch((err) => console.log(err));
  }, [count]);

  let totalCartPrice = 0;

  const showCheckOut = carts.map((item, index) => {
    if (item.product?.discount > 0) {
      totalCartPrice += item.product?.discount * item?.product_qty;
      itemPrice = item.product?.discount.slice(0, 5);
      descPrice = itemPrice * item.product_qty;
      tot = descPrice.toFixed(2);
    } else {
      totalCartPrice += item.product?.price * item?.product_qty;
      itemPrice = item.product?.price.slice(0, 5);
      descPrice = itemPrice * item.product_qty;
      tot = descPrice.toFixed(2);
    }

    return (
      <tr className="order-list" key={index}>
        <td>
          <div className="d-flex align-items-center">
            <img
              className="pic"
              src={
                item?.images[1]?.image
                  ? item?.images[1]?.image
                  : item?.images[0]?.image
              }
              alt={item.product.title}
            />
            <div className="ps-3 d-flex flex-column justify-content">
              <p className="pic fw-bold">
                <NavLink to={`../products/${item.product.slug}`}>
                  <span className="text-black">{item.product.title}</span>
                </NavLink>
              </p>
              {/* <small className="d-flex">
                <span className="text-muted">Color:</span>
                <span className="fw-bold">Red/White</span>
              </small> */}
              <small className="">
                <span className="text-muted">Size:</span>
                <span className="fw-bold">{item.sizes[0].title}</span>
              </small>
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex">
            <p className="pe-3">
              <span className="text-muted">
                $
                {item.product.discount > 0
                  ? item.product.discount
                  : item.product.price}
              </span>
            </p>
            <p className="fw-bold">Total: ${tot}</p>
          </div>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <span className="pe-3 text-muted">Quantity:</span>
            <span className="pe-3">{item.product_qty}</span>
          </div>
        </td>
      </tr>
    );
  });

  let vat = totalCartPrice * 0.15;
  let totalWithVat = totalCartPrice + vat;

  // Handle Submit
  async function handleSubmit(e) {
    // setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${ORDERS}`, form);
      setIsChange((prev) => !prev);
      window.scrollTo(0, 0);
      nav("/reload");
    } catch (err) {
      // setLoading(false);
      if (
        err.response.data.message.includes(`address`) ||
        err.response.data.message.includes(`firstname`)
      ) {
        toast.error("Please choose address", {
          autoClose: 2000,
        });
      } else if (err.response.data.message.includes(`payment`)) {
        toast.error("Please choose payment method", {
          autoClose: 2000,
        });
      } else {
        console.log(err);
      }
    }
  }

  // Handle Address Submit
  async function handleAddressSubmit(e) {
    // setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${ADDRESS}/add`, addressForm);
      setSaveAddress(res.data.id);
      setCount((prev) => !prev);
      form.address_id = res.data.id;
    } catch (err) {
      // setLoading(false);
      console.log(err);
    }
  }

  function handleAddressForm(e) {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  }

  async function handleCheckCoupon(e) {
    try {
      const res = await Axios.get(`${COUPON}/check/${e}`).then((data) => {
        setCount2((prev) => !prev);
        let calcuStart =
          new Date(data.data.start_date).getTime() - new Date().getTime();
        let calcuExpire =
          new Date(data.data.expire_date) - new Date().getTime();
        let lowestPrice = data.data.lowest_price < totalWithVat;
        if (calcuStart < 0 && calcuExpire > 0) {
          if (lowestPrice) {
            setCouponCheckCall(data.data);
            handleUpdatePrice(data.data.percent);
          } else {
            setCheckLowestPrice(data.data.lowest_price);
            setCouponCheck(3);
          }
        } else {
          setCouponCheck(2);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  let calc = totalWithVat * (couponCheckCall?.percent / 100);

  function handlePayment(e) {
    form.payment_mode = e.target.value;
    form.productsprice = totalCartPrice.toFixed(2);
    form.vat = vat.toFixed(2);
    form.coupon_id = couponCheckCall?.id ? couponCheckCall?.id : 0;
    form.fees = e.target.value === "0" ? "5.00" : "0.00";
    setTotalPriceState(
      (
        (couponCheckCall?.percent > 0 && couponCheckCall !== undefined
          ? totalWithVat - calc
          : totalWithVat) + parseFloat(form.fees)
      ).toFixed(2)
    );
  }
  form.totalprice = parseFloat(totalPriceState);

  function handleAddress(e) {
    form.address_id = e;
    setSaveAddress(e);
  }

  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${ADDRESS}/delete/${id}`);
      setAddressCall((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  function handleAddressUpdate(
    id,
    firstname,
    lastname,
    phone,
    address,
    city,
    zipcode
  ) {
    updateAddressForm.id = id;
    updateAddressForm.firstname = firstname;
    updateAddressForm.lastname = lastname;
    updateAddressForm.phone = phone;
    updateAddressForm.address = address;
    updateAddressForm.city = city;
    updateAddressForm.zipcode = zipcode;
    setOpenUpdate((prev) => !prev);
  }

  function handleUpdateAddressForm(e) {
    setUpdateAddressForm({
      ...updateAddressForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleUpdateAddressSubmit(e) {
    // setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.put(
        `${ADDRESS}/edit/${updateAddressForm?.id}`,
        updateAddressForm
      );
      setCount(!count);
    } catch (err) {
      // setLoading(false);
      console.log(err);
    }
  }

  const showAddress = addressCall.map((item, index) => (
    <div key={index}>
      <div
        className="d-flex rounded justify-content-around bg-white"
        style={{
          border:
            (saveAddress || addressCall[addressCall.length - 1]?.id) === item.id
              ? "2px solid #4379F2"
              : "1px solid #F5F5F5",
        }}
        onClick={() => handleAddress(item.id)}
      >
        <div className="col-lg-10 delivery py-1">
          <div className="name">
            <span>
              First name:{" "}
              {item.firstname.length > 8
                ? item.firstname.slice(0, 12) + "..."
                : item.firstname}
            </span>
            <span>
              Last name:{" "}
              {item.lastname.length > 8
                ? item.lastname.slice(0, 12) + "..."
                : item.lastname}
            </span>
            <span>Phone: +966{item.phone}</span>
          </div>
          <div className="address-info">
            <span>Address: {item.address}</span>
            <span>City: {item.city}</span>
            <span>Zipcode: {item.zipcode}</span>
          </div>
        </div>
        <div className="d-flex py-3 gap-3">
          <FontAwesomeIcon
            onClick={() =>
              handleAddressUpdate(
                item.id,
                item.firstname,
                item.lastname,
                item.phone,
                item.address,
                item.city,
                item.zipcode
              )
            }
            fontSize={"19px"}
            color={"#4379F2"}
            cursor={"pointer"}
            icon={faPenToSquare}
          />
          <FontAwesomeIcon
            onClick={() => handleDelete(item.id)}
            fontSize={"19px"}
            color="red"
            cursor={"pointer"}
            icon={faTrash}
          />
        </div>
      </div>
    </div>
  ));

  async function handleUpdatePrice(e) {
    setTotalPriceState(
      (
        (e > 0 ? totalWithVat - totalWithVat * (e / 100) : totalWithVat) +
        (form.payment_mode === "0" ? 5 : 0)
      ).toFixed(2)
    );
  }

  function handleResetCoupon() {
    setCount2((prev) => !prev);
    setTotalPriceState(
      (totalWithVat + (form.payment_mode === "0" ? 5 : 0)).toFixed(2)
    );
    setCoupon("");
    setCouponCheckCall(0);
    setCouponCheck(0);
  }

  return (
    <Container>
      <div className="containers mt-4 p-0">
        <div className="row px-md-4 px-2 pt-4">
          {/*Show orders*/}
          <div className="col-lg-8">
            {carts.length > 1 ? (
              <p className="pb-2 fw-bold">Orders list</p>
            ) : (
              <p className="pb-2 fw-bold">Order list</p>
            )}
            <div
              className="card"
              style={{ height: carts.length > 1 ? "350px" : "200px" }}
            >
              <div className="table-responsive px-md-4 px-2 pt-3">
                <table className="table table-borderless">
                  <tbody>{showCheckOut}</tbody>
                </table>
              </div>
            </div>
          </div>
          {/*Payment summary*/}
          <div className="col-lg-4 payment-summary">
            <p className="fw-bold pt-lg-0 pt-4 pb-2">Payment Summary</p>
            <div className="card px-md-3 px-2 pt-2">
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between py-3">
                  <small className="text-muted">Order price</small>
                  <p>${totalCartPrice.toFixed(2)}</p>
                </div>
                <div className="d-flex justify-content-between pb-3 ">
                  <small className="text-muted">VAT</small>
                  <p>${vat.toFixed(2)}</p>
                </div>{" "}
                {couponCheckCall?.percent > 0 ? (
                  <div className="d-flex justify-content-between pb-3">
                    <small className="text-muted">Discount</small>
                    <p className="d-flex gap-2 align-items-end">
                      <small className="text-secondary">
                        %{couponCheckCall?.percent}
                      </small>
                      $
                      {(
                        totalWithVat *
                        (couponCheckCall?.percent / 100)
                      ).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                <div className="d-flex justify-content-between pb-3 ">
                  <small className="text-muted">Shipping (SMSA)</small>
                  <p>FREE</p>
                </div>
                {form.payment_mode === "0" ? (
                  <div className="d-flex justify-content-between pb-3 ">
                    <small className="text-muted">COD Fees</small>
                    <p>$5.00</p>
                  </div>
                ) : (
                  <></>
                )}
                <div className="d-flex justify-content-between mb-3 border-top">
                  <p className="fw-bold">Total Amount</p>
                  <p className="fw-bold">
                    $
                    {totalPriceState == ""
                      ? totalWithVat.toFixed(2)
                      : totalPriceState}
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex gap-3">
                    <p className="fw-bold">Coupon:</p>
                    <input
                      disabled={count2}
                      className="fw-bold rounded border"
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                  </div>
                  <div className="d-flex gap-1 col">
                    <Button
                      disabled={coupon.length < 1 || count2}
                      onClick={() => handleCheckCoupon(coupon)}
                    >
                      Active
                    </Button>
                    <Button
                      // disabled={coupon.length < 1 && count}
                      className="btn btn-secondary"
                      onClick={() => handleResetCoupon()}
                    >
                      <i className="material-icons">restart_alt</i>
                    </Button>
                  </div>
                </div>
                {couponCheck == 2 ? (
                  <div className="alert alert-danger">
                    The coupon may not existed or expired
                  </div>
                ) : (
                  <></>
                )}
                {couponCheck == 3 ? (
                  <div className="alert alert-danger">
                    Lowest price for coupon is {checkLowestPrice}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          {/*Address*/}
          <div className="col-lg-8 delivery">
            <p className="pt-2 fw-bold pb-3 ps-2">Address</p>
            <small className="text-secondary">
              * Make sure you choose an address
            </small>
            <div>{showAddress}</div>
            <div
              className="border rounded bg-white"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
            >
              <div
                className="d-flex justify-content-center align-items-center gap-2"
                style={{ cursor: "pointer" }}
              >
                <h4 className="mt-2">Add a new address</h4>
                <FontAwesomeIcon
                  fontSize={"19px"}
                  color={"#4379F2"}
                  icon={faPlus}
                />
              </div>
            </div>
            {/*Add Address*/}
            <Collapse in={open}>
              <Form onSubmit={handleAddressSubmit}>
                <div className="name">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput0"
                  >
                    <Form.Label>First name:</Form.Label>
                    <Form.Control
                      required
                      name="firstname"
                      value={addressForm.firstname}
                      onChange={handleAddressForm}
                      // disabled={!sent}
                      placeholder="First name..."
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Last name:</Form.Label>
                    <Form.Control
                      required
                      name="lastname"
                      value={addressForm.lastname}
                      onChange={handleAddressForm}
                      type="text"
                      placeholder="Last name..."
                      // disabled={!sent}
                    />
                  </Form.Group>
                </div>
                <div className="name">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput0"
                  >
                    <Form.Label>Phone number:</Form.Label>
                    <p className="input-group">
                      <span className="input-group-text number-style">
                        +966
                      </span>
                      <Form.Control
                        required
                        name="phone"
                        className="phone-number"
                        value={addressForm.phone}
                        onChange={handleAddressForm}
                        maxLength={9}
                        placeholder="Phone..."
                      />
                    </p>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>City:</Form.Label>
                    <Form.Control
                      required
                      name="city"
                      value={addressForm.city}
                      onChange={handleAddressForm}
                      type="text"
                      placeholder="City..."
                      // disabled={!sent}
                    />
                  </Form.Group>
                </div>
                <div className="address-info">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                      required
                      name="address"
                      value={addressForm.address}
                      onChange={handleAddressForm}
                      type="text"
                      placeholder="Address..."
                      // disabled={!sent}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput0"
                  >
                    <Form.Label>zipcode:</Form.Label>
                    <Form.Control
                      required
                      name="zipcode"
                      value={addressForm.zipcode}
                      onChange={handleAddressForm}
                      placeholder="zipcode..."
                    ></Form.Control>
                  </Form.Group>
                </div>
                <div>
                  <small className="text-secondary">
                    * Make sure you click save
                  </small>
                </div>
                <button
                  onClick={() => setOpen(!open)}
                  className="btn btn-primary"
                >
                  Save
                </button>
              </Form>
            </Collapse>
            {/*Edit Collapse*/}
            <Collapse in={openUpdate}>
              <Form onSubmit={handleUpdateAddressSubmit}>
                <div className="name">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput0"
                  >
                    <Form.Label>First name:</Form.Label>
                    <Form.Control
                      required
                      name="firstname"
                      value={updateAddressForm.firstname}
                      onChange={handleUpdateAddressForm}
                      // disabled={!sent}
                      placeholder="First name..."
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Last name:</Form.Label>
                    <Form.Control
                      required
                      name="lastname"
                      value={updateAddressForm.lastname}
                      onChange={handleUpdateAddressForm}
                      type="text"
                      placeholder="Last name..."
                      // disabled={!sent}
                    />
                  </Form.Group>
                </div>
                <div className="name">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput0"
                  >
                    <Form.Label>Phone number:</Form.Label>
                    <p className="input-group">
                      <span className="input-group-text number-style">
                        +966
                      </span>
                      <Form.Control
                        required
                        name="phone"
                        value={updateAddressForm.phone}
                        onChange={handleUpdateAddressForm}
                        maxLength={9}
                        placeholder="Phone..."
                      />
                    </p>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>City:</Form.Label>
                    <Form.Control
                      required
                      name="city"
                      value={updateAddressForm.city}
                      onChange={handleUpdateAddressForm}
                      type="text"
                      placeholder="City..."
                      // disabled={!sent}
                    />
                  </Form.Group>
                </div>
                <div className="address-info">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                      required
                      name="address"
                      value={updateAddressForm.address}
                      onChange={handleUpdateAddressForm}
                      type="text"
                      placeholder="Address..."
                      // disabled={!sent}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput0"
                  >
                    <Form.Label>zipcode:</Form.Label>
                    <Form.Control
                      required
                      name="zipcode"
                      value={updateAddressForm.zipcode}
                      onChange={handleUpdateAddressForm}
                      placeholder="zipcode..."
                    ></Form.Control>
                  </Form.Group>
                </div>
                <div>
                  <small className="text-secondary">
                    * Make sure you click save
                  </small>
                </div>
                <button
                  onClick={() => setOpenUpdate(!openUpdate)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              </Form>
            </Collapse>
          </div>
          {/*Payment method*/}
          <div className="col-lg-4">
            <p className="pt-4 fw-bold pb-3">Payment Method</p>
            <div className="card p-3 mb-2">
              <div className="d-flex align-items-center justify-content-between">
                <div className="fw-bold">
                  <div className="d-flex gap-2">
                    <img className="" src={madaIcon} width="45px" alt="" />
                    Mada
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      name="payment"
                      type="radio"
                      id="SwitchCheck"
                      value={2}
                      onClick={handlePayment}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card p-3 mb-2">
              <div className="d-flex align-items-center justify-content-between">
                <div className="fw-bold">
                  <div className="d-flex gap-2">
                    <img src={visaIcon} alt="" width="45px" />
                    VISA
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      name="payment"
                      type="radio"
                      id="SwitchCheck"
                      value={1}
                      onClick={handlePayment}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card p-3 mb-2">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="d-flex align-items-center">
                    <img src={codIcon} alt="" width="45px" />
                    <p className="fw-bold">Cash on Delivery</p>
                  </div>
                  <small className="text-muted">
                    Fees added for cash on delivery
                  </small>
                </div>
                <div className="d-flex align-items-center">
                  <p className="pe-3">+$5.00</p>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      name="payment"
                      type="radio"
                      id="SwitchCheck"
                      value={0}
                      onClick={handlePayment}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              // disabled={!sent}
              className="checkout-button"
              onClick={handleSubmit}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
}
