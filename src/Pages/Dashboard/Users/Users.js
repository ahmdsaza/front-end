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

  // Current User
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);

  // Get All Users
  useEffect(() => {
    Axios.get(`${USERS}`)
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, []);

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
        header={header}
        data={users}
        currentUser={currentUser}
        delete={handleDelete}
      />
    </div>
  );
}
