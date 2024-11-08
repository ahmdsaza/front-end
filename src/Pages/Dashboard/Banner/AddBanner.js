import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../API/axios";
import { BANNER } from "../../../API/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function AddBanner() {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = `Ahmed store | Add banner`;
  });

  // Navigate
  const nav = useNavigate();

  // Ref
  const focus = useRef();

  // Handle Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  // Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("image", image);
    form.append("url", url);

    try {
      const res = await Axios.post(`${BANNER}/add`, form);
      nav("/dashboard/banner");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {loading && <LoadingSubmit />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={HandleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>URL</Form.Label>
          <Form.Control
            ref={focus}
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            placeholder="URL..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Image</Form.Label>
          <Form.Control
            onChange={(e) => setImage(e.target.files.item(0))}
            type="file"
          ></Form.Control>
        </Form.Group>
        <button
          disabled={url.length > 1 ? false : true}
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
}
