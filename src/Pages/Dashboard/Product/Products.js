import React, { useEffect, useState } from "react";
import { PRODUCTS, PRODUCT } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Link } from "react-router-dom";
import TableShow from "../Table";

export default function Products() {
  //States
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Axios.get(`${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

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
      key: "qty",
      name: "QTY",
    },
    {
      key: "rating",
      name: "Rating",
    },
    {
      key: "created_at",
      name: "created",
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
      <TableShow
        limit={limit}
        page={page}
        header={header}
        data={products}
        delete={handleDelete}
        setPage={setPage}
        setLimit={setLimit}
        loading={loading}
        total={total}
        typeName="title"
        searchLink={PRODUCT}
      />
    </div>
  );
}
