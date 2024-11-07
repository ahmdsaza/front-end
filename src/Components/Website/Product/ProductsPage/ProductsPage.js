import React, { useContext, useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { PRODUCT, CART, USER, RATES } from "../../../../API/Api";
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

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [user, setUser] = useState("");
  const [showRate, setShowRate] = useState([]);
  const [showSize, setShowSize] = useState([]);
  const [showRateNumber, setShowRateNumber] = useState(0);
  const [sizeChoice, setSizeChoice] = useState();
  const [images, setImages] = useState([]);
  const { setIsChange } = useContext(CartExport);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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

  // Call Rate
  useEffect(() => {
    Axios.get(`${RATES}/${id}`)
      .then((data) => setShowRate(data.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Get Product by id
  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((data) => {
        setProducts(data.data);
        setShowRateNumber(data.data[0].rating);
        setShowSize(data.data[0].sizes);
        document.title = `Ahmed store | ${data.data[0]?.title}`;
        setImages(
          data.data[0].images.map((item) => {
            return {
              original: item.image,
              thumbnail: item.image,
              originalHeight: window.innerWidth > 786 ? 600 : 400,
            };
          })
        );
      })
      // .then((document.title = `${products[0]?.title}`))
      .catch((err) => console.log(err));
  }, [id, sizeChoice]);

  useEffect(() => {
    Axios.get(`${PRODUCT}/showRelated/${id}`)
      .then((data) => {
        setRelatedProducts(data.data);
        window.scrollTo(0, 0);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Get User
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUser(data.data))
      .catch((err) => console.log(err));
  }, []);

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

    const checkSize = showSize.find((item) => {
      return (sizeChoice == null ? showSize[0].id : sizeChoice) == item.id;
    });

    try {
      if (user) {
        const res = await Axios.post(`${CART}`, data)
          // .then(setIsChange((prev) => !prev))
          .catch((err) => {
            if (err.response.status === 420) {
              toast.error(err.response.data.error);
            } else {
              toast.error("Something went worng");
            }
          });
      } else {
        toast.error("Login to add Products to Cart");
      }
      if (checkSize.quantity >= count) {
        toast.success("Product add to cart successfully", {
          autoClose: 2000,
        });
      }
      setTimeout(updateCartCount, 1800);
    } catch (err) {
      console.log(err);
    }
  }

  function updateCartCount() {
    setIsChange((prev) => !prev);
    console.log("Hello after 3sec");
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
          <div className="card mt-3" key={index}>
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
                <p className="col-10">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const findSizeQuantity = showSize?.find((item) => {
    return item?.id === sizeChoice * 1;
  });

  const showData = products.map((item, key) => {
    showSize.map((item) => (
      <option key={key} name="name" value={item.id} onChange={handleSize}>
        {item.id}
      </option>
    ));

    return (
      <div className="product-div" key={key}>
        <div className="col-lg-6">
          <ImageGallery
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
          />
        </div>
        <div className="product-side">
          <div className="product-description">
            {showGoldStars}
            {showEmptyStars}
            <span className="product-category">{item.category.title}</span>
            <h1 className="product-title">{item.title}</h1>
            <p className="product-description">{item.description}</p>
          </div>
          <div>
            {showSize.length > 0 ? (
              <div className="mx-4 my-1">
                <Form.Select className="size" onClick={handleSize}>
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
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  });

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
        className="d-flex flex-wrap mt-4"
        key={key}
      >
        <div className="cards bg-white">
          <div>
            <div className="px-5 py-5 position-relative">
              {item.discount > 0 && (
                <p
                  className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block
                  text-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    lineHeight: "50px",
                  }}
                >
                  Sale
                </p>
              )}
              <div
                className="w-100"
                alt=""
                style={{
                  backgroundImage: `url('${item?.images[0].image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  height: "200px",
                  width: "100%",
                }}
              ></div>
            </div>
            <h4
              className="text-truncate text-black d-flex justify-content-center"
              style={{ color: "gray" }}
            >
              {item.title}
            </h4>
          </div>
          <div className="d-flex align-items-center justify-content-between pt-4 border-top">
            <div className="text-black">
              {showGoldStarsRelated}
              {showEmptyStarsRelated}
              <small className="mx-1 fw-bold">({item.ratings_number})</small>
              <div className="d-flex align-items-center gap-3">
                {item.discount > 0 ? (
                  <>
                    {" "}
                    <h5 className="m-0 text-black">{item.discount}$</h5>
                    <h6
                      className="m-0"
                      style={{
                        color: "gray",
                        textDecoration: "line-through",
                      }}
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
              />
            </div>
          </div>
        </div>
      </NavLink>
    );
  });

  return (
    <Container>
      {showData}
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
