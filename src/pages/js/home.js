import React from "react";
import "animate.css";
import "../css/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faFire } from "@fortawesome/free-solid-svg-icons";
import Bottom from "../../components/js/bottomSection";
import Carousel from "../../components/js/carousel";
import Card from "../../components/js/card";
import products from "./default_products";

function Home(props) {
  

  return (
    <div className="home animate__animated animate__fadeInUp">
      <div className="welcome_section">
        <div className="row">
          <div className="col-lg-6 left-col">
            <h1>Welcome to LaceUp!</h1>
            <p>
              Here you'll find all kinds of sneakers & kicks you have been
              looking for.
              <br />
              <br />
              <h4>Explore Our Collection Now!</h4>
              <button onClick={() => props.selector("shop")} className="shop_btn">
                SHOP NOW <FontAwesomeIcon icon={faArrowRightLong} size="xl" />
              </button>
            </p>
          </div>
          <div className="col-lg-6 right-col">
            <img src={require("../../images/pngegg.png")} alt="home_img"/>
          </div>
        </div>
        <div className="custom-shape-divider-bottom-1679965571">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      <Carousel />
      <div className="products">
        <div className="row">
          <h1>
            <FontAwesomeIcon icon={faFire} size="lg" color="#ec6f59" /> {"  "}
            Products Sneak Peek {"  "}
            <FontAwesomeIcon icon={faFire} size="lg" color="#ec6f59" />
          </h1>
        </div>
        <div className="row prods">
          {products.map((product) => {
            return (
              <div className="col-md-3">
                <Card onClick={() => props.selector("product", product.id)} product={product} />
              </div>
            );
          })}
        </div>
      </div>
      <Bottom />
    </div>
  );
}

export default Home;
