import React from "react";
import { Link } from "react-router-dom";
import "./404.css";

export default function Err404() {
  return (
    <div className="d-flex flex-column align-items-center">
      <div class="error-page">
        <div>
          <h1 data-h1="404">404</h1>
          <p data-p="NOT FOUND">Look like you're lost!</p>
        </div>
      </div>
      <div className="mt-4">
        <Link className="btn btn-primary" to={"/"}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
