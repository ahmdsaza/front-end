import React from "react";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./salesRa.css";
import { Link, NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function TopRated(props) {
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solid} style={{ color: "FFC100" }} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));
  return (
    <NavLink
      className="col-lg-3 col-md-6 col-12 text-black"
      to={`products/${props.id}`}
    >
      <div className="cards">
        <div>
          <div className="px-5 py-5 position-relative">
            {props.sale && (
              <p
                className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block
                  text-center"
                style={{ width: "50px", height: "50px", lineHeight: "50px" }}
              >
                Sale
              </p>
            )}
            <div
              className="w-100"
              alt=""
              style={{
                backgroundImage: `url('${props.img}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: "170px",
                width: "100%",
              }}
            ></div>
          </div>
          <h4
            className="text-truncate text-black d-flex justify-content-center"
            style={{ color: "gray" }}
          >
            {props.title}
          </h4>
        </div>
        <div className="d-flex align-items-center justify-content-between pt-4 border-top">
          <div>
            {showGoldStars}
            {showEmptyStars}
            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-primary">{props.discount}$</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {props.price}$
              </h6>
            </div>
          </div>
          <div className="border p-2 rounded">
            <img
              src={require("../../../../Assets/shopping-cart.png")}
              alt="cart"
              width="20px"
            />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
