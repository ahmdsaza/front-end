import React, { useEffect, useState } from "react";
import { CATEGORIES, CATEGORY } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Link } from "react-router-dom";
import TableShow from "../Table";
// import { Form } from "react-bootstrap";

export default function Categories() {
  //States
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get All Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`${CATEGORIES}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

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
    {
      key: "created_at",
      name: "created",
    },
    {
      key: "updated_at",
      name: "updated",
    },
  ];

  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${CATEGORY}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
      setCount((prev) => !prev);
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
      <TableShow
        limit={limit}
        page={page}
        header={header}
        data={categories}
        delete={handleDelete}
        setPage={setPage}
        setLimit={setLimit}
        loading={loading}
        total={total}
        typeName="title"
        title="Categories"
        searchLink={CATEGORY}
      />
    </div>
  );
}
