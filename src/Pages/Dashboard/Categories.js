import React, { useEffect, useState } from "react";
import { CATEGORIES, CATEGORY } from "../../API/Api";
import { Axios } from "../../API/axios";
import { Link } from "react-router-dom";
import TableShow from "./Table";

export default function Categories() {
  //States
  const [categories, setCategories] = useState([]);

  // Get All Categories
  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Import Table Header
  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "image",
      name: "Image",
    },
  ];

  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${CATEGORY}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  // Code
  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Categories Page</h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">
          Add Category
        </Link>
      </div>
      <TableShow header={header} data={categories} delete={handleDelete} />
    </div>
  );
}
