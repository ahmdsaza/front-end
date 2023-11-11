import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { USER } from "../../API/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { Axios } from "../../API/axios";
import Err403 from "./403";

export default function RequireAuth({ allowedRole }) {
  // User
  const [user, setUser] = useState("");

  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  // Token & Cookie
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  return token ? (
    user === "" ? (
      <LoadingSubmit />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
