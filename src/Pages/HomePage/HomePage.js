import React from "react";
import "./Home.css";
import Landing from "../../Components/Website/Landing/Landing";
// import TopRated from "../../Components/Website/Product/TopRated";
import ShowTopRated from "../../Components/Website/Product/TopRated/ShowTopRated";
import { Container } from "react-bootstrap";
import ShowLatestSaleProducts from "../../Components/Website/Product/SaleProducts/ShowLatestSaleProducts";
import ShowLatestProducts from "../../Components/Website/Product/LatestProducts/ShowLatestProducts";

export default function HomePage() {
  return (
    <div>
      <Landing />
      <ShowLatestSaleProducts />
      <Container>
        <div className="d-flex align-items-start flex-wrap mt-5">
          <ShowTopRated />
          <ShowLatestProducts />
        </div>
      </Container>
    </div>
  );
}
