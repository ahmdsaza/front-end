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
      id={product.id}
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
    // <div className="d-flex justify-content-center align-items-center flex-wrap">
    //   <div className="col-lg-6 col-md-6 col-12">
    //     <h1>Top Rated</h1>
    //     <div className="p-5">
    //       {loading ? (
    //         <>
    //           <SkeletonShow height="800px" length="1" classes="col-12" />
    //         </>
    //       ) : (
    //         productsShow
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="card-style">
      <h1 className="d-flex justify-content-center">Top Rated</h1>
      <div className="d-flex justify-content-center flex-wrap mt-5 gap-2 m-3">
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
  );
}
