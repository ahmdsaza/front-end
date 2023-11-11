import React from "react";
import "./403.css";
import { Link } from "react-router-dom";

export default function Err403({ role }) {
  return (
    <div className="text-wrapper">
      <div className="title" data-content={404}>
        403 - ACCESS DENIED
      </div>
      <div className="subtitle">
        Oops, You don't have premission to access this page
        <Link
          to={role === "1996" ? "/dashboard/writer" : "/"}
          className="d-block text-center btn btn-primary"
        >
          {role === "1996" ? "Go to dashboard" : "Go to home page"}
        </Link>
      </div>
    </div>
  );
}
