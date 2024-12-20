import React, { useEffect, useState } from "react";
import { COUPON } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import Form from "react-bootstrap/Form";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";

export default function AddCoupon() {
  const [title, setTitle] = useState("");
  const [percent, setPercent] = useState("");
  const [lowestPrice, setLowestPrice] = useState("");
  const [startDate, setStartSate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Navigate

  const nav = useNavigate();

  useEffect(() => {
    document.title = `Ahmed store | Add Coupon`;
  });

  // Handle Submit
  async function HandleSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("percent", percent);
    form.append("lowest_price", lowestPrice);
    form.append("start_date", startDate);
    form.append("expire_date", expireDate);
    try {
      const res = await Axios.post(`${COUPON}/add`, form);
      nav("/dashboard/coupon");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {loading && <LoadingSubmit />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={HandleSubmit}>
        <div className="d-flex align-items-center justify-content-between">
          <h1>Add coupon</h1>
          <Link to="../coupon">
            <div className="btn btn-primary">Back to coupon</div>
          </Link>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Percent</Form.Label>
          <Form.Control
            required
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            type="text"
            placeholder="Percent..."
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Lowest Price</Form.Label>
          <Form.Control
            required
            value={lowestPrice}
            onChange={(e) => setLowestPrice(e.target.value)}
            type="text"
            placeholder="Lowest Price..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            required
            value={startDate}
            onChange={(e) => setStartSate(e.target.value)}
            type="datetime-local"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
          <Form.Label>Expire Date</Form.Label>
          <Form.Control
            required
            value={expireDate}
            onChange={(e) => setExpireDate(e.target.value)}
            type="datetime-local"
          ></Form.Control>
        </Form.Group>
        <button
          disabled={title.length > 1 ? false : true}
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
}
