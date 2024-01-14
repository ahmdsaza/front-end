import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../API/axios";
import { CATEGORIES, PRODUCT } from "../../../API/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function AddProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });

  const dummyForm = {
    category: null,
    title: "title",
    description: "description",
    price: 0,
    discount: 0,
    About: "About",
  };
  // Use State
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [categories, setCategories] = useState([]); // Categories UseState
  const [id, setId] = useState();
  const nav = useNavigate();

  // Ref
  const focus = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);
  const counter = useRef(-1);

  // Handle Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  function handleOpenImage() {
    openImage.current.click();
  }
  // Get All Categories
  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Handle Submit Form
  async function handleSubmitForm() {
    try {
      const res = await Axios.post(`${PRODUCT}/add`, dummyForm);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  // Handle Submit
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${PRODUCT}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // Handle Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(1);
    if (sent !== 1) {
      handleSubmitForm();
    }
  }

  // Handle Images Change
  async function handleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFiles = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imagesAsFiles.length; i++) {
      counter.current++;
      data.append("image", imagesAsFiles[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[counter.current].style.width = `${percent}%`;
              progress.current[counter.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        ids.current[counter.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Handle Delete Image
  async function handleDeleteImage(id, img) {
    const findId = ids.current[id];
    try {
      const res = await Axios.delete(`product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((i) => i !== findId);
      --counter.current;
    } catch (err) {
      console.log(err);
    }
  }

  // Mapping
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  // Mapping Images
  const imagesShow = images.map((img, key) => (
    <div className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-2">
          <img width="80px" src={URL.createObjectURL(img)} alt=""></img>
          <div>
            <p className="mb-1">{img.name}</p>
            <p>
              {img.size / 1024 < 900
                ? (img.size / 1024).toFixed(2) + "KB"
                : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <Button onClick={() => handleDeleteImage(key, img)} variant="danger">
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-2">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <LoadingSubmit />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleEdit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput0">
          <Form.Label>Category</Form.Label>
          <Form.Select
            ref={focus}
            required
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Title..."
          >
            <option disabled>Select Category</option>
            {categoriesShow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
            placeholder="Title..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            name="description"
            value={form.description}
            onChange={handleChange}
            type="text"
            placeholder="Description..."
            disabled={!sent}
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            name="price"
            value={form.price}
            onChange={handleChange}
            type="text"
            placeholder="Price..."
            disabled={!sent}
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            required
            name="discount"
            value={form.discount}
            onChange={handleChange}
            type="text"
            placeholder="Discount..."
            disabled={!sent}
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
          <Form.Label>About</Form.Label>
          <Form.Control
            required
            name="About"
            value={form.About}
            onChange={handleChange}
            type="text"
            placeholder="About..."
            disabled={!sent}
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
          <Form.Label>Images</Form.Label>
          <Form.Control
            ref={openImage}
            hidden
            multiple
            onChange={handleImagesChange}
            type="file"
            disabled={!sent}
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column"
          style={{
            border: !sent ? "2px dashed gray" : "2px dashed #0086fe",
            cursor: !sent ? "" : "pointer",
          }}
        >
          <img
            src={require("../../../Assets/upload.png")}
            alt="Upload here"
            width={"100px"}
            style={{ filter: !sent && "grayscale(1" }}
          />
          <p
            className="fw-bold mb-0"
            style={{ color: !sent ? "gray" : "#0086fe" }}
          >
            Upload images
          </p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {imagesShow}
        </div>
        <button
          disabled={form.title.length > 1 ? false : true}
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
}
