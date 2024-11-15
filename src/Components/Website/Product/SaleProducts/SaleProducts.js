import React from "react";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./salesPro.css";
import { NavLink } from "react-router-dom";

export default function SaleProducts(props) {
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
      to={`products/${props.id}`}
      className={`col-12 ${
        window.innerWidth > 1400 ? "col-xl-3" : "col-xl-4"
      } col-lg-5 col-md-6 my-2 d-flex`}
      key={props.index}
    >
      <div className="cards rounded-3 bg-white">
        <div>
          <div className="p-2 position-relative">
            {props.discount > 0 && (
              <p
                className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block
                  text-center"
                style={{ width: "50px", height: "50px", lineHeight: "50px" }}
              >
                Sale
              </p>
            )}
            <div style={{ height: "300px" }}>
              <img
                src={props.img}
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                  height: "300px",
                  width: "270px",
                  borderRadius: "5px",
                }}
                alt={props.title}
                loading="lazy"
              />
            </div>
          </div>
          <h4
            className="mx-2 text-black d-flex"
            style={{ color: "gray", maxWidth: "300px" }}
          >
            {props.title}
          </h4>
        </div>
        <div className="d-flex align-items-center justify-content-between p-2 border-top">
          <div className="text-black">
            {showGoldStars}
            {showEmptyStars}
            <small className="mx-1 fw-bold">({props.ratings_number})</small>
            <div className="d-flex align-items-center gap-3">
              {/* <h5 className="m-0 text-primary">{props.discount}$</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {props.price}$
              </h6> */}
              {props.discount > 0 ? (
                <>
                  {" "}
                  <h5 className="m-0 text-black">{props.discount}$</h5>
                  <h6
                    className="m-0"
                    style={{ color: "gray", textDecoration: "line-through" }}
                  >
                    {props.price}$
                  </h6>
                </>
              ) : (
                <>
                  {" "}
                  <h5 className="m-0 text-black">{props.price}$</h5>
                </>
              )}
            </div>
          </div>
          <div className="border p-2 rounded">
            {/* <Link to={`products/${props.id}`}> */}
            <img
              src={require("../../../../Assets/shopping-cart.png")}
              alt="cart"
              width="20px"
            />
            {/* </Link> */}
          </div>
        </div>
      </div>
    </NavLink>
  );
}
