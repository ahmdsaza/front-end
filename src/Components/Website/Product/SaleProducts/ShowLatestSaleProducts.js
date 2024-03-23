import React, { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { LatestSale } from "../../../../API/Api";
import SkeletonShow from "../../Skeleton/SkeletonShow";
import SaleProducts from "./SaleProducts";
import { Container } from "react-bootstrap";

export default function ShowLatestSaleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${LatestSale}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const productsShow = products.map((product) => (
    <SaleProducts
      title={product.title}
      description={product.description}
      discount={product.discount}
      sale
      img={product.images[0].image}
      price={product.price}
      rating={product.rating}
      col="3"
    />
  ));
  return (
    <Container>
      <h1 className="mt-5">Latest Sale Products</h1>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2 mb-5">
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
