import React, { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { LatestSale } from "../../../../API/Api";
import SkeletonShow from "../../Skeleton/SkeletonShow";
import SaleProducts from "./SaleProducts";
import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function ShowLatestSaleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${LatestSale}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const productsShow = products.map((product, index) => (
    <SaleProducts
      id={product.slug}
      title={product.title}
      description={product.description}
      discount={product.discount}
      sale
      img={
        product?.images[1]?.image
          ? product?.images[1]?.image
          : product?.images[0]?.image
      }
      price={product.price}
      rating={product.rating}
      ratings_number={product.ratings_number}
      col="3"
      key={index}
    />
  ));
  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <Button>
          <NavLink to={`../latest-sale`} className="text-white">
            {" "}
            See All
          </NavLink>
        </Button>
        <h1 className="d-flex justify-content-center">Latest Sale Products</h1>
        <div></div>
      </div>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2 m-3">
        {loading ? (
          <>
            <SkeletonShow
              height="300px"
              length="4"
              classes="col-lg-3 col-md-6 col-12"
            />
          </>
        ) : (
          productsShow
        )}
      </div>
    </Container>
  );
}
