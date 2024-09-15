import React, { useEffect } from "react";
import "./reloadpage.css";
import { useNavigate } from "react-router-dom";

export default function ReloadPage() {
  const nav = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      nav("/thankyou");
    }, 5000);
  }, []);
  return (
    <div>
      <div class="container1">
        <span style={{ textAlign: "center", padding: "0 10px" }}>
          <h4>Please wait while we are processing your payment.</h4>
        </span>
        <div class="box">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
