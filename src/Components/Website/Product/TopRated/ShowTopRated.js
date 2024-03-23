import React, { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import TopRated from "./TopRated";
import { TopRatedApi } from "../../../../API/Api";
import SkeletonShow from "../../Skeleton/SkeletonShow";

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    Axios.get(`${TopRatedApi}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const productsShow = products.map((product) => (
    <TopRated
      title={product.title}
      description={product.description}
      discount={product.discount}
      sale
      img={product.images[0].image}
      price={product.price}
      rating={product.rating}
    />
  ));
  return (
    <div className="col-md-6 col-12" style={{ border: "2px solid #0D6EFD" }}>
      <h1 className="text-center m-0 p-3 bg-primary text-white">Top Rated</h1>
      <div className="p-5">
        {loading ? (
          <>
            <SkeletonShow height="800px" length="1" classes="col-12" />
          </>
        ) : (
          productsShow
        )}
      </div>
    </div>
  );
}
