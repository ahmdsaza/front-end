import React, { useState } from "react";
import { useEffect } from "react";
import { USERS, USER } from "../../API/Api";
import { Table } from "react-bootstrap";
import { Axios } from "../../API/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Users() {
  // Users Use States
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);

  // Get Data
  useEffect(() => {
    Axios.get(`${USERS}`)
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, [deleteUser]);

  // Show Users
  const usersShow = users.map((user, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${user.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>
          <FontAwesomeIcon
            onClick={() => handleDelete(user.id)}
            fontSize={"19px"}
            color="red"
            cursor={"pointer"}
            icon={faTrash}
          />
        </div>
      </td>
    </tr>
  ));

  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setDeleteUser((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  // Code
  return (
    <div className="bg-white w-100 p-2">
      <h1>Users Page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{usersShow}</tbody>
      </Table>
    </div>
  );
}
