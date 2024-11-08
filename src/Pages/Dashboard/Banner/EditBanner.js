import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../API/axios";
import { BANNER } from "../../../API/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBanner() {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // Id
  const { id } = useParams();

  // Get Data
  useEffect(() => {
    setLoading(true);
    Axios.get(`${BANNER}/show/${id}`)
      .then((data) => {
        setUrl(data.data?.url);
        setLoading(false);
        document.title = `Ahmed store | Edit banner`;
      })
      .then(() => setDisable(false))
      .catch(() => nav("../../page/404", { replace: true }));
  }, []);

  // Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("url", url);
    form.append("image", image);
    try {
      const res = await Axios.post(`${BANNER}/edit/${id}`, form);
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
        <h1>Edit Banner</h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Url</Form.Label>
          <Form.Control
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
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
