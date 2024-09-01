import React, { useEffect, useState } from "react";
import { Axios } from "../../../API/axios";
import { USER } from "../../../API/Api";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUser(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="text-center">
      <div className="fw-bold display-4">Profile</div>
      <div className="card d-flex align-items-center  mx-auto my-3">
        <div className="my-3">
          <img
            width="50px"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt={user.name}
          />
          <div className="mt-2">
            <p>Username: {user.name}</p>
            <p>E-mail: {user.email}</p>
          </div>
          <button className="mt-3">
            <NavLink to={`./edit/${user.id}`} className="text-black">
              Edit
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
}
