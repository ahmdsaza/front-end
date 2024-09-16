import React, { useState } from "react";
import { useEffect } from "react";
import { USERS, USER } from "../../../API/Api";
import { Axios } from "../../../API/axios";
import { Link } from "react-router-dom";
import TableShow from "../Table";

export default function Users() {
  //States
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Current User
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);

  // Get All Users
  useEffect(() => {
    Axios.get(`${USERS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setUsers(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
    {
      key: "created_at",
      name: "created",
    },
    // {
    //   key: "updated_at",
    //   name: "Last login",
    // },
  ];

  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  // Code
  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Users Page</h1>
        <Link className="btn btn-primary" to="/dashboard/user/add">
          Add user
        </Link>
      </div>
      <TableShow
        limit={limit}
        page={page}
        header={header}
        data={users}
        currentUser={currentUser}
        delete={handleDelete}
        setPage={setPage}
        setLimit={setLimit}
        loading={loading}
        total={total}
        typeName="name"
        searchLink={USER}
      />
    </div>
  );
}
