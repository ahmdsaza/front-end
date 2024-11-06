import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../API/axios";
import { CATEGORIES, PRODUCT, PRODUCTCATEGORY, SIZES } from "../../../API/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Collapse } from "react-bootstrap";

export default function UpdateProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    qty: "",
  });

  const [sizes, setSizes] = useState({
    name: "",
    quantity: "",
  });

  const [updateSize, setUpdateSize] = useState({
    id: "",
    title: "",
    quantity: "",
  });

  // Use States
  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idsFromServer, setIdsFromServer] = useState([]);
  const [categories, setCategories] = useState([]); // Categories UseState
  const [showSizes, setShowSizes] = useState([]);
  const [count, setCount] = useState(false);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const nav = useNavigate();

  // Use Refs
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

  // Get Data
  useEffect(() => {
    Axios.get(`${PRODUCTCATEGORY}/${id}`)
      .then((data) => {
        setForm(data.data[0]);
        setImagesFromServer(data.data[0].images);
        document.title = `Ahmed store | Edit product`;
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle Submit
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      for (let i = 0; i < idsFromServer.length; i++) {
        await Axios.delete(`product-img/${idsFromServer[i]}`);
      }
      await Axios.post(`${PRODUCT}/edit/${id}`, form);
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

  // Handle Delete Image From Server
  async function handleDeleteImageFromServer(id) {
    setImagesFromServer((prev) => prev.filter((img) => img.id !== id));
    setIdsFromServer((prev) => {
      return [...prev, id];
    });
  }

  // Mapping
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  // Mapping Images
  const imagesShow = images.map((img, key) => (
    <div key={key} className="border p-2 w-100">
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

  // Show Image From Server
  const imagesFromServerShow = imagesFromServer.map((img, key) => (
    <div key={key} className="border p-2 col-2 position-relative">
      <div className="d-flex align-items-center justify-content-start gap-2">
        <img width="80px" src={img.image} alt=""></img>
      </div>
      <div
        style={{ cursor: "pointer" }}
        className="position-absolute top-0 end-0 bg-danger rounded text-white"
      >
        <p
          className=" py-1 px-2 m-0 "
          onClick={() => handleDeleteImageFromServer(img.id)}
        >
          x
        </p>
      </div>
    </div>
  ));

  // Call Sizes
  useEffect(() => {
    Axios.get(`${SIZES}/${id}`)
      .then((data) => setShowSizes(data.data))
      .catch((err) => console.log(err));
  }, [count]);

  // Handle Delete Sizes
  async function handleDeleteSize(item) {
    try {
      const res = await Axios.delete(`size-delete/${item}`);
      setCount((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  // Handle Sizes Change
  async function handleSizesChange(e) {
    setSizes({ ...sizes, [e.target.name]: e.target.value });
  }

  // Create Sizes
  async function submitToSizes() {
    const data = {
      product_id: id,
      title: sizes.title,
      quantity: sizes.quantity * 1,
    };

    try {
      Axios.post(`${SIZES}/add`, data).catch((err) => console.log(err));
      setCount((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  function handleUpdateSizeChange(e) {
    setUpdateSize({ ...updateSize, [e.target.name]: e.target.value });
  }

  function openHandleUpdateSize(dataId, dataTitle, dataQuantity) {
    updateSize.id = dataId;
    updateSize.title = dataTitle;
    updateSize.quantity = dataQuantity;
    setOpen(!open);
  }

  async function handleUpdateSize() {
    // e.preventDefault();
    const dataInf = {
      title: updateSize.title,
      quantity: updateSize.quantity * 1,
    };
    try {
      Axios.put(`${SIZES}/edit/${updateSize.id}`, dataInf).catch((err) =>
        console.log(err)
      );
      setCount((prev) => !prev);
      setOpen(!open);
    } catch (err) {
      console.log(err);
    }
  }

  // Mapping Sizes
  const sizesShow = showSizes.map((item, key) => (
    <div className="border p-2 w-75" key={key}>
      <div className="row">
        <div className="col col-sm-8">
          <div className="d-flex align-items-center gap-2">
            <label>Name:</label>
            {/* <input type="text" className="mb-1" value={item.name} /> */}
            <p>{item.title}</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <label>Quantity:</label>
            {/* <input type="text" className="mb-1" value={item.quantity} /> */}
            <p>{item.quantity}</p>
          </div>
        </div>

        <div className="d-flex col col-md-2 gap-2">
          <div>
            <Button
              disabled={item.id === updateSize.id && open}
              onClick={() => handleDeleteSize(item.id)}
              variant="danger"
            >
              Delete
            </Button>
          </div>
          <div>
            <Button
              onClick={() =>
                openHandleUpdateSize(item.id, item.title, item.quantity)
              }
              variant="primary"
            >
              Edit
            </Button>
          </div>
        </div>
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
        </Form.Group>
        <Form.Group>
          <Form.Label>Sizes</Form.Label>
          <div className="col">
            <div className="d-flex col-4 gap-2">
              <Form.Control
                className="col-2"
                name="name"
                value={sizes.name}
                onChange={handleSizesChange}
                type="text"
                placeholder="Name..."
              />

              <Form.Control
                className="col-2"
                name="quantity"
                value={sizes.quantity}
                onChange={handleSizesChange}
                type="text"
                placeholder="Quantity..."
              />
              <div onClick={submitToSizes} className="btn btn-primary">
                Add
              </div>
            </div>
          </div>
        </Form.Group>
        {sizesShow}
        <Collapse in={open}>
          <div className="col-8">
            <div className="name">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput0"
              >
                <Form.Label>Size:</Form.Label>
                <Form.Control
                  name="title"
                  value={updateSize.title}
                  onChange={handleUpdateSizeChange}
                  placeholder="Title..."
                ></Form.Control>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  name="quantity"
                  value={updateSize.quantity}
                  onChange={handleUpdateSizeChange}
                  type="text"
                  placeholder="Quantity..."
                />
              </Form.Group>
            </div>
            <div className="d-flex gap-2">
              <div onClick={handleUpdateSize} className="btn btn-primary">
                Save
              </div>
              <div onClick={() => setOpen(!open)} className="btn btn-danger">
                close
              </div>
            </div>
          </div>
        </Collapse>
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
            ref={openImage}
            hidden
            multiple
            onChange={handleImagesChange}
            type="file"
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column"
          style={{
            border: "2px dashed #0086fe",
            cursor: "pointer",
          }}
        >
          <img
            src={require("../../../Assets/upload.png")}
            alt="Upload here"
            width={"100px"}
            style={{ filter: "grayscale(1" }}
          />
          <p className="fw-bold mb-0" style={{ color: "#0086fe" }}>
            Upload images
          </p>
        </div>
        <div className="d-flex align-items-start flex-warp gap-2">
          {imagesFromServerShow}
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {imagesShow}
        </div>
        <button className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}
