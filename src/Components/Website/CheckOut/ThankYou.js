import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center h-100">
        Thank You For Shopping from us, After 5sec we will send you go to home
        page
      </div>
      <Link
        to="../"
        className="d-flex align-items-center justify-content-center"
      >
        Back to website
      </Link>
    </Container>
  );
}
