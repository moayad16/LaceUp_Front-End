import React from "react";
import '../css/carousel.css'


function Carousel() {
    return (
      <div className="supp_section">
        <div className="row">
          <h1>Our Suppliers</h1>
        </div>
        <div className="row supps">
          <div className="col-lg-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png"
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="col-lg-2">
            <img
              src="https://1000logos.net/wp-content/uploads/2021/11/Nike-Logo.png"
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="col-lg-2">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Emblem.png"
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="col-lg-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/3/37/Jumpman_logo.svg"
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="col-lg-2">
            <img
              src="https://chelsfieldlakes.co.uk/wp-content/uploads/2017/08/puma-logo-black.png"
              height="100"
              width="250"
              alt=""
            />
          </div>
        </div>
      </div>
    );
}


export default Carousel