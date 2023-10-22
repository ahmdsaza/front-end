import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { USER } from "../../API/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { Axios } from "../../API/axios";

export default function RequireAuth() {
  // User
  const [user, setUser] = useState();

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
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
