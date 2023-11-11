import React from "react";
import { Link } from "react-router-dom";
import "./404.css";

export default function Err404() {
  return (
    <>
      <div class="error-page">
        <div>
          <h1 data-h1="404">404</h1>
          <p data-p="NOT FOUND">Look like you're lost!</p>
        </div>
      </div>
      <div>
        <Link className="btn btn-primary d-block text-center" to={"/"}>
          Back to home
        </Link>
      </div>
    </>
  );
}
