import React, { useEffect, useState } from "react";
import { PRODUCTS, PRODUCT } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Link } from "react-router-dom";
import TableShow from "../Table";

export default function Products() {
  //States
  const [products, setProducts] = useState([]);

  // Get All Products
  useEffect(() => {
    Axios.get(`${PRODUCTS}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Import Table Header
  const header = [
    {
      key: "images",
      name: "Images",
    },
    {
      key: "title",
      name: "Title",
    },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },
  ];

  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${PRODUCT}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  // Code
  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Product Page</h1>
        <Link className="btn btn-primary" to="/dashboard/product/add">
          Add Product
        </Link>
      </div>
      <TableShow header={header} data={products} delete={handleDelete} />
    </div>
  );
}
