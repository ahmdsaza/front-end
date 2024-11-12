import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "./landing.css";
import banner1 from "../../../Assets/2.jpg";
import { Axios } from "../../../API/axios";
import { BANNER } from "../../../API/Api";
import SkeletonShow from "../Skeleton/SkeletonShow";

export default function Landing() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${BANNER}`)
      .then((data) => setBanners(data.data))
      .finally(() => setLoading(false));
  }, []);

  let callDescription = "";
  const showBanners = banners.map((item, key) => {
    callDescription = item.description;
    return (
      // <div>
      <Carousel.Item key={key}>
        <NavLink to={`${item.url}`}>
          <img
            className="landing-style d-block w-100 object-fit-cover"
            src={item.image}
            alt="First slide"
          />
          <Carousel.Caption>
            {callDescription != null ? item.description : <></>}
          </Carousel.Caption>
        </NavLink>
      </Carousel.Item>
      // </div>
    );
  });

  return (
    <Container className="my-4">
      {loading ? (
        <SkeletonShow
          length="1"
          height={window.innerWidth > 768 ? "500px" : "200px"}
          baseColor="white"
          classes="col"
        />
      ) : (
        <Carousel>{showBanners}</Carousel>
      )}
    </Container>
  );
}
