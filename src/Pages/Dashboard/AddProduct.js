import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../API/axios";
import { CATEGORIES, PRODUCT } from "../../API/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  console.log(images);

  // Categories UseState
  const [categories, setCategories] = useState([]);

  // Ref
  const focus = useRef();

  // Handle Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  // Get All Categories
  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Handle Submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("category", form.category);
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("discount", form.discount);
    data.append("About", form.About);
    for (let i = 0; i < images.length; i++) {
      data.append("images[]", images[i]);
    }
    try {
      const res = await Axios.post(`${PRODUCT}/add`, data);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // Handle Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Mapping
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  const imagesShow = images.map((img, key) => (
    <div className="d-flex align-items-center justify-content-start gap-2 border p-2 w-100">
      <img width={"80px"} src={URL.createObjectURL(img)}></img>
      <div>
        <p className="mb-1">{img.name}</p>
        <p>
          {img.size / 1024 < 900
            ? (img.size / 1024).toFixed(2) + "KB"
            : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
        </p>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <LoadingSubmit />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
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
          />
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
          <Form.Label>Images</Form.Label>
          <Form.Control
            multiple
            onChange={(e) => setImages([...e.target.files])}
            type="file"
          />
        </Form.Group>
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
