import React from "react";
import { LOGOUT } from "../../API/Api";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../API/axios";

export default function Logout() {
  // Navigate
  const navigate = useNavigate();

  // Logout Function
  async function handleLogout() {
    try {
      const res = await Axios.get(`${LOGOUT}`);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }
  return <button onClick={handleLogout}>Logout</button>;
}
