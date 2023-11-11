import React, { useEffect, useState } from "react";
import { CATEGORIES } from "../../API/Api";
import { Axios } from "../../API/axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";

export default function Categories() {
  //States
  const [users, setUsers] = useState([]);
  const [noUsers, setNoUsers] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  // Get All Users
  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((data) => setUsers(data.data))
      .then(() => setNoUsers(true))
      .catch((err) => console.log(err));
  }, [deleteUser]);

  // Mapping On Users
  const usersShow = users.map((user, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td>{user.name}</td>
      <td></td>
      <td>
        {user.role === "1995"
          ? "admin"
          : user.role === "2001"
          ? "user"
          : "writer"}
      </td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${user.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>
        </div>
      </td>
    </tr>
  ));

  // Handle Delete
  // async function handleDelete(id) {
  //     try {
  //       const res = await Axios.delete(`${CATEGORIES}/${id}`);
  //       setDeleteUser((prev) => !prev);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }

  // Code
  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Categories Page</h1>
        <Link className="btn btn-primary" to="/dashboard/user/add">
          Add user
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={12} className="text-center">
                Loading...
              </td>
            </tr>
          ) : users.length === 0 && noUsers ? (
            <tr>
              <td colSpan={12} className="text-center">
                No Users Found
              </td>
            </tr>
          ) : (
            usersShow
          )}
        </tbody>
      </Table>
    </div>
  );
}
