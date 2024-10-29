import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "./landing.css";
import banner1 from "../../../Assets/2.jpg";

export default function Landing() {
  return (
    <Container className="my-4">
      <Carousel>
        <Carousel.Item>
          <NavLink to="/categories/1">
            <img className="d-block w-100" src={banner1} alt="First slide" />
            <Carousel.Caption>
              {/* <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </NavLink>
        </Carousel.Item>
        <Carousel.Item>
          <NavLink to="/categories/2">
            <img className="d-block w-100" src={banner1} alt="First slide" />
            <Carousel.Caption>
              {/* <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </NavLink>
        </Carousel.Item>
        <Carousel.Item>
          <NavLink to="/categories/3">
            <img className="d-block w-100" src={banner1} alt="First slide" />
            <Carousel.Caption>
              {/* <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </NavLink>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
