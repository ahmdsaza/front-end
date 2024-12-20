import React, { useContext, useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { PRODUCT, CART, USER, RATES, CARTS } from "../../../../API/Api";
import { NavLink, useParams } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartExport } from "../../../../Context/CartContext";
import ImageGallery from "react-image-gallery";
import { ToastContainer, toast } from "react-toastify";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./ProductsPage.css";
import SkeletonShow from "../../Skeleton/SkeletonShow";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams();
  const [count, setCount] = useState(80);
  const [ring, setRing] = useState(false);
  const [user, setUser] = useState("");
  const [carts, setCarts] = useState([]);
  const [showRate, setShowRate] = useState([]);
  const [showSize, setShowSize] = useState([]);
  const [showRateNumber, setShowRateNumber] = useState(0);
  const [sizeChoice, setSizeChoice] = useState();
  const [images, setImages] = useState([]);
  const { setIsChange } = useContext(CartExport);
  const [loading, setLoading] = useState(true);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Call cart
  useEffect(() => {
    Axios.get(`${CARTS}`)
      .then((data) => setCarts(data.data))
      .catch((err) => console.log(err));
  }, [ring]);

  // Get Product by id
  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((data) => {
        setProducts(data.data);
        setShowRateNumber(data.data[0].rating);
        setShowSize(data.data[0].sizes);
        document.title = `Ahmed store | ${data.data[0]?.title}`;
        window.scrollTo(0, 0);
        setImages(
          data.data[0].images.map((item) => {
            return {
              original: item.image,
              thumbnail: item.image,
              originalHeight: window.innerWidth > 786 ? 600 : 400,
            };
          })
        );
        setCount(1);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id, sizeChoice]);

  // Related Projects
  useEffect(() => {
    Axios.get(`${PRODUCT}/showRelated/${id}`)
      .then((data) => {
        setRelatedProducts(data.data);
        window.scrollTo(0, 0);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Call Rate
  useEffect(() => {
    Axios.get(`${RATES}/${id}`)
      .then((data) => setShowRate(data.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Get User
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUser(data.data))
      .catch((err) => console.log(err));
  }, []);

  function updateCartCount() {
    setIsChange((prev) => !prev);
  }

  function handleSize(e) {
    setSizeChoice(e.target.value);
    setCount(1);
  }

  const roundStars = Math.round(showRateNumber);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solid} style={{ color: "FFC100" }} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));

  const showRateData = showRate.map((item, index) => {
    const roundStarsRate = Math.round(item.product_rate);
    const starsRate = Math.min(roundStarsRate, 5);
    const showGoldStarsRate = Array.from({ length: starsRate }).map(
      (_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={solid}
          style={{ color: "FFC100", fontSize: "12px" }}
        />
      )
    );
    const showEmptyStarsRate = Array.from({ length: 5 - starsRate }).map(
      (_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={regularStar}
          style={{ fontSize: "12px" }}
        />
      )
    );

    return (
      <div className="row m-0">
        <div className="col col-md-8">
          <div className="card mt-3 " key={index}>
            <div className="rate-div">
              <div>
                <img
                  width="50px"
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt={item.users[0].name}
                />
              </div>
              <div>
                <p className="fw-bold">{item.users[0].name}</p>
                {showGoldStarsRate}
                {showEmptyStarsRate}
                <p className="col pe-4">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const findSizeQuantity = showSize?.find((item) => {
    return item?.id === sizeChoice ? sizeChoice * 1 : showSize[0].id;
  });

  const showData = products.map((item, key) => {
    showSize.map((item) => (
      <option key={key} name="name" value={item.id} onChange={handleSize}>
        {item.id}
      </option>
    ));

    return (
      <div className="product-div" key={key}>
        <div className="col col-lg-6">
          <ImageGallery
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
            lazyLoad
          />
        </div>
        <div className="product-side">
          <div className="product-description">
            <div className="ps-3">
              {showGoldStars}
              {showEmptyStars}({item.ratings_number})
            </div>
            <span className="product-category">{item.category.title}</span>
            <h1 className="product-title">{item.title}</h1>
            <p className="product-description">{item.description}</p>
          </div>
          <div>
            {showSize.length > 0 ? (
              <div className="mx-4 my-1">
                <Form.Select className="size" onChange={handleSize}>
                  {showSize.map((item, key) => (
                    <option key={key} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </Form.Select>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="product-prices mt-3">
            {item.discount > 0 ? (
              <>
                <span className="product-discount">${item.discount}</span>
                <span className="product-price">${item.price}</span>
              </>
            ) : (
              <>
                <span className="product-discount">${item.price}</span>
              </>
            )}
          </div>{" "}
          <div className="cart-btn">
            <div className="count-div">
              <input
                className="sum"
                type="button"
                value=" - "
                disabled={count < 2}
                onClick={() => {
                  setCount((prev) => prev - 1);

                  /* decrease 1 to quantity*/
                }}
              />
              <span className="count">{count}</span> {/* product Quantity */}
              <input
                className="minus"
                type="button"
                value=" + "
                disabled={
                  sizeChoice == null
                    ? count === showSize[0]?.quantity
                    : count === findSizeQuantity?.quantity
                }
                onClick={() => {
                  setCount((prev) => prev + 1);

                  /* increase 1 to quantity*/
                }}
              />
            </div>
            <button className="addToCart" onClick={submitToCart}>
              <img
                src={require("../../../../Assets/shopping-cart.png")}
                alt="cart"
                width="20px"
              />
              Add to cart
              <div></div>
            </button>
          </div>
        </div>
      </div>
    );
  });

  const callCartQuantity = carts.find(
    (item) =>
      item.product_size == (sizeChoice == null ? showSize[0]?.id : sizeChoice)
  );

  const sizeQuantity = callCartQuantity?.sizes[0]?.quantity;
  const calculateQuantity = callCartQuantity?.product_qty + count;
  const cartQuantity = callCartQuantity?.product_qty;

  const showRelatedProduct = relatedProducts.map((item, key) => {
    const roundStarsRelated = Math.round(item.rating);
    const starsRelated = Math.min(roundStarsRelated, 5);
    const showGoldStarsRelated = Array.from({ length: starsRelated }).map(
      (_, index) => (
        <FontAwesomeIcon key={index} icon={solid} style={{ color: "FFC100" }} />
      )
    );
    const showEmptyStarsRelated = Array.from({ length: 5 - starsRelated }).map(
      (_, index) => <FontAwesomeIcon key={index} icon={regularStar} />
    );
    return (
      <NavLink
        to={`../products/${item.slug}`}
        className={`col-12 ${
          window.innerWidth > 1400 ? "col-xl-3" : "col-xl-4"
        } col-lg-5 col-md-6  my-2`}
        key={item.index}
      >
        <div className="cards bg-white" style={{ height: "500px" }}>
          <div>
            <div className="p-2 position-relative">
              {item.discount > 0 && (
                <p
                  className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block
                  text-center"
                  style={{ width: "50px", height: "50px", lineHeight: "50px" }}
                >
                  Sale
                </p>
              )}
              <div>
                <img
                  src={
                    item?.images[1]?.image
                      ? item?.images[1]?.image
                      : item?.images[0]?.image
                  }
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    height: "300px",
                    width: "270px",
                    borderRadius: "5px",
                  }}
                  alt={item.title}
                  loading="lazy"
                />
              </div>
            </div>
            <h4
              className=" mx-2 text-black d-flex justify-content-center"
              style={{ color: "gray", maxWidth: "300px" }}
            >
              {item.title}
            </h4>
          </div>
          <div className="d-flex align-items-center justify-content-between p-2 border-top">
            <div className="text-black">
              {showGoldStarsRelated}
              {showEmptyStarsRelated}
              <small className="mx-1 fw-bold">({item.ratings_number})</small>
              <div className="d-flex align-items-center gap-3">
                {/* <h5 className="m-0 text-primary">{item.discount}$</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {item.price}$
              </h6> */}
                {item.discount > 0 ? (
                  <>
                    {" "}
                    <h5 className="m-0 text-black">{item.discount}$</h5>
                    <h6
                      className="m-0"
                      style={{ color: "gray", textDecoration: "line-through" }}
                    >
                      {item.price}$
                    </h6>
                  </>
                ) : (
                  <>
                    {" "}
                    <h5 className="m-0 text-black">{item.price}$</h5>
                  </>
                )}
              </div>
            </div>
            <div className="border p-2 rounded">
              <img
                src={require("../../../../Assets/shopping-cart.png")}
                alt="cart"
                width="20px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </NavLink>
    );
  });

  async function submitToCart(e) {
    e.preventDefault();
    const data = {
      user_id: user.id,
      product_id: products[0].id,
      product_slug: products[0].slug,
      product_qty: count,
      product_image: products[0].id,
      product_size: sizeChoice == null ? showSize[0].id : sizeChoice,
    };
    setRing((prev) => !prev);

    try {
      if (user) {
        if (callCartQuantity) {
          if (sizeQuantity >= calculateQuantity) {
            const res = await Axios.post(`${CART}`, data)
              .then(setTimeout(updateCartCount, 1000))
              .catch((err) => {
                if (err.response.status === 420) {
                  toast.error(err.response.data.error);
                } else {
                  toast.error("Something went worng");
                }
              });
          } else {
            toast.error(`There is only ${sizeQuantity} pices`);
          }
          if (
            sizeQuantity >= calculateQuantity &&
            sizeQuantity > cartQuantity &&
            sizeQuantity > 0
          ) {
            toast.success("Product add to cart successfully", {
              autoClose: 2000,
            });
          }
        } else {
          if (findSizeQuantity?.quantity > 0) {
            const res = await Axios.post(`${CART}`, data)
              .then(
                setTimeout(updateCartCount, 1000),
                toast.success("Product add to cart successfully", {
                  autoClose: 2000,
                })
              )
              .catch((err) => {
                if (err.response.status === 420) {
                  toast.error(err.response.data.error);
                } else {
                  toast.error("Something went worng");
                }
              });
          } else {
            toast.error(`There is only ${findSizeQuantity?.quantity} pices`);
          }
        }
      } else {
        toast.error("Login to add Products to Cart");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      {loading ? (
        <>
          {" "}
          {/* Skeleton */}
          <div
            // className="col-12 flex-column"
            className={`d-flex ${
              window.innerHeight < 768 ? "flex-wrap" : "flex-wrap"
            }`}
          >
            <div className="col">
              {" "}
              {/* Image skeleton */}
              <SkeletonShow
                length="1"
                // width={`${window.innerWidth > 786 ? 600 : 400}`}
                width={`${window.innerWidth > 786 ? 600 : 350}px`}
                height={`${window.innerWidth > 786 ? 600 : 400}px`}
                baseColor="white"
                classes="col-lg-2 col-md-6 col-12"
              />
            </div>
            <div className="col mt-4 ps-4">
              <SkeletonShow
                length="1"
                // width={`${window.innerWidth > 786 ? 600 : 400}`}
                width={`${window.innerWidth > 786 ? 200 : 150}px`}
                height={`${window.innerWidth > 786 ? 50 : 50}px`}
                baseColor="white"
                classes="col-lg-2 col-md-6 col-12"
              />
              <SkeletonShow
                length="1"
                // width={`${window.innerWidth > 786 ? 600 : 400}`}
                width={`${window.innerWidth > 786 ? 600 : 350}px`}
                height={`${window.innerWidth > 786 ? 50 : 50}px`}
                baseColor="white"
                classes="col-lg-2 col-md-6 col-12"
              />
              <SkeletonShow
                length="1"
                // width={`${window.innerWidth > 786 ? 600 : 400}`}
                width={`${window.innerWidth > 786 ? 600 : 350}px`}
                height={`${window.innerWidth > 786 ? 400 : 200}px`}
                baseColor="white"
                classes="col-lg-2 col-md-6 col-12"
              />
              <div className="d-flex justify-content-around col">
                <SkeletonShow
                  length="1"
                  // width={`${window.innerWidth > 786 ? 600 : 400}`}
                  width={`${window.innerWidth > 786 ? 100 : 100}px`}
                  height={`${window.innerWidth > 786 ? 50 : 50}px`}
                  baseColor="white"
                  classes="col-lg-2 col-md-6 col"
                />
                <SkeletonShow
                  length="1"
                  // width={`${window.innerWidth > 786 ? 600 : 400}`}
                  width={`${window.innerWidth > 786 ? 150 : 100}px`}
                  height={`${window.innerWidth > 786 ? 50 : 50}px`}
                  baseColor="white"
                  classes="col-lg-2 col-md-6 col"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>{showData}</div>
      )}
      <ToastContainer />
      {showRate.length > 0 ? (
        <div>
          <h1 className="text-center mt-3">Reviews</h1>
          <div className="mt-4 mx-auto">{showRateData}</div>
        </div>
      ) : (
        <></>
      )}
      {relatedProducts.length > 0 ? (
        <div>
          <h1 className="text-center mt-4">Relatd Products</h1>
          <Carousel
            centerMode={window.innerWidth > 768 ? true : false}
            responsive={responsive}
            infinite={true}
            draggable
          >
            {showRelatedProduct}
          </Carousel>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
}
