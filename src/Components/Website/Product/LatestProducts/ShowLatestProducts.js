import React, { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { Latest } from "../../../../API/Api";
import SkeletonShow from "../../Skeleton/SkeletonShow";
import SaleProducts from "../SaleProducts/SaleProducts";
import { Container } from "react-bootstrap";

export default function ShowLatestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${Latest}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const productsShow = products.map((product, key) => (
    <SaleProducts
      id={product.id}
      title={product.title}
      description={product.description}
      discount={product.discount}
      sale
      img={product.images[0].image}
      price={product.price}
      rating={product.rating}
      ratings_number={product.ratings_number}
      col="3"
    />
  ));
  return (
    <Container>
      <div className="card-style">
        <h1 className="d-flex justify-content-center">Latest Products</h1>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2 m-3">
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
      </div>
    </Container>
  );
}
