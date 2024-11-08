import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../API/axios";
import { CATEGORY, CATEGORYSHOW } from "../../../API/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { Container } from "react-bootstrap";

export default function Category() {
  const [idNumber, setIdNumber] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // Id
  const { id } = useParams();

  // Get Data
  useEffect(() => {
    setLoading(true);
    Axios.get(`${CATEGORYSHOW}/${id}`)
      .then((data) => {
        setIdNumber(data.data.id);
        setTitle(data.data.title);
        setLoading(false);
        document.title = `Ahmed store | Edit category`;
      })
      .then(() => setDisable(false))
      .catch(() => nav("../../page/404", { replace: true }));
  }, []);

  // Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CATEGORY}/edit/${id}`, form);
      window.location.pathname = "/dashboard/categories";
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
          <h1>Edit category #{idNumber}</h1>
          <Link to="../categories">
            <div className="btn btn-primary">Back to category</div>
          </Link>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Titile..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Image</Form.Label>
          <Form.Control
            onChange={(e) => setImage(e.target.files.item(0))}
            type="file"
          ></Form.Control>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
