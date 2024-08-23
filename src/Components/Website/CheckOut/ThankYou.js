import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./thankyou.css";
export default function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return (
    <Container>
      <section id="thankyou-section" class="section-p1">
        <div class="message">
          <h1>Thank you.</h1>
          <h4>Your order was completed successfully.</h4>
          <div class="email">
            <i class="fa fa-envelope-circle-check"></i>
          </div>
        </div>
      </section>
      <Link
        to="../"
        className="d-flex align-items-center justify-content-center"
      >
        Back to website
      </Link>
    </Container>
  );
}
