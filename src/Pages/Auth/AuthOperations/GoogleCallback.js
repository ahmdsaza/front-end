import axios from "axios";
import React, { useEffect } from "react";
import { baseURL, GOOGLE_CALL_BACK } from "../../../API/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

export default function GoogleCallback() {
  const cookie = Cookie();
  const location = useLocation();
  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          `${baseURL}/${GOOGLE_CALL_BACK}${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("e-commerce", token);
        // window.location.pathname = "/";
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, []);

  return <div>GoogleCallback</div>;
}
