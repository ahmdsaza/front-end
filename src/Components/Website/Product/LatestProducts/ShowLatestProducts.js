import React, { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { Latest } from "../../../../API/Api";
import SkeletonShow from "../../Skeleton/SkeletonShow";
import SaleProducts from "../SaleProducts/SaleProducts";

export default function ShowLatestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${Latest}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const productsShow = products.map((product) => (
    <SaleProducts
      id={product.id}
      title={product.title}
      description={product.description}
      discount={product.discount}
      sale
      img={product.images[0].image}
      price={product.price}
      rating={product.rating}
      col="4"
    />
  ));
  return (
    <div className="d-flex justify-content-center">
      <div className="ms-md-3">
        <h1 className="d-flex justify-content-center">Latest Products</h1>
        <div className="d-flex justify-content-center flex-wrap row-gap-3 mb-5">
          {loading ? (
            <>
              <SkeletonShow
                height="300px"
                length="4"
                classes="col-md-6 col-12"
              />
            </>
          ) : (
            productsShow
          )}
        </div>
      </div>
    </div>
  );
}
