import React, { useEffect, useState } from "react";
import { Axios } from "../../../../API/axios";
import { PRODUCT } from "../../../../API/Api";
import { useParams } from "react-router-dom";
import "./ProductsPage.css";
import { Container } from "react-bootstrap";
import Footer from "../../Footer/Footer";
import sho from "../../../../Assets/3.jpg";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(products);

  const showData = products.map((item) => (
    <Container>
      <div>
        <main class="contain">
          <div class="left-column">
            <img data-image="black" src={item.images[0].image} alt="" />
          </div>

          <div class="right-column">
            <div class="product-description">
              <span>{item.category.title}</span>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
            <div class="product-price">
              <span>${item.price}</span>
              <span className="discount">${item.discount}</span>
              <a href="/" class="cart-btn">
                Add to cart
              </a>
            </div>
          </div>
        </main>
      </div>
    </Container>
  ));

  console.log(showData);
  return (
    <div>
      {showData}
      <Footer />
    </div>
  );
}
