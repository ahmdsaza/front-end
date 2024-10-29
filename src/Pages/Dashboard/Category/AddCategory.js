import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../API/axios";
import { CATEGORY } from "../../../API/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = `Ahmed store | Add category`;
  });

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
    form.append("title", title);
    form.append("image", image);

    try {
      const res = await Axios.post(`${CATEGORY}/add`, form);
      window.location.pathname = "/dashboard/categories";
      console.log(res);
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
          <Form.Label>Title</Form.Label>
          <Form.Control
            ref={focus}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
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
          disabled={title.length > 1 ? false : true}
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
}
