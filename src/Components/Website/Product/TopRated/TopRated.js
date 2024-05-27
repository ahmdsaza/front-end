import React from "react";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sales.css";

export default function TopRated(props) {
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon style={{ color: "FFB000" }} key={index} icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));
  return (
    <div className="cards">
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
      <div className="m-1 col-12 rounded p-5 h-100 d-flex flex-column justify-content-between">
        <div>
          <p className="text-truncate" style={{ color: "gray" }}>
            {props.title}
          </p>
          <p className="text-truncate">{props.description}</p>
          <div className="px-5 py-5 position-relative"></div>
        </div>
        <div className="d-flex align-items-center justify-content-between pt-4">
          <div>
            {showGoldStars}
            {showEmptyStars}
            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-primary">{props.discount}$</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {" "}
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
    </div>
  );
}
