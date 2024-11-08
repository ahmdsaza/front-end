import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "./landing.css";
import banner1 from "../../../Assets/2.jpg";
import { Axios } from "../../../API/axios";
import { BANNER } from "../../../API/Api";

export default function Landing() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    Axios.get(`${BANNER}`).then((data) => setBanners(data.data));
  }, []);

  const showBanners = banners.map((item, key) => (
    // <div>
    <Carousel.Item key={key}>
      <NavLink to={`${item.url}`}>
        <img
          className="d-block w-100 object-fit-cover"
          width="1296px"
          height="500px"
          src={item.image}
          alt="First slide"
        />
        {/* <Carousel.Caption>{item.url}</Carousel.Caption> */}
      </NavLink>
    </Carousel.Item>
    // </div>
  ));

  return (
    <Container className="my-4">
      <Carousel>
        {showBanners}
        {/* <Carousel.Item>
          <NavLink to="/categories/1">
            <img className="d-block w-100" src={banner1} alt="First slide" />
            <Carousel.Caption>
            </Carousel.Caption>
          </NavLink>
        </Carousel.Item> */}
        {/* <Carousel.Item>
          <NavLink to="/categories/2">
            <img className="d-block w-100" src={banner1} alt="First slide" />
            <Carousel.Caption></Carousel.Caption>
          </NavLink>
        </Carousel.Item> */}
        {/*<Carousel.Item>
          <NavLink to="/categories/3">
            <img className="d-block w-100" src={banner1} alt="First slide" />
            <Carousel.Caption>
               <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </NavLink>
        </Carousel.Item> */}
      </Carousel>
    </Container>
  );
}
