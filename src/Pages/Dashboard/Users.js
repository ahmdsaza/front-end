import React from "react";
import { useEffect } from "react";
import { baseURL, USERS } from "../../API/Api";
import axios from "axios";
import Cookie from "cookie-universal";
import Logout from "../Auth/Logout";

// Cookie
const cookie = Cookie();

export default function Users() {
  useEffect(() => {
    axios
      .get(`${baseURL}/${USERS}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("e-commerce"),
        },
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Logout />
    </div>
  );
}
