import React from "react";
import "../css/product.css";
import "animate.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Bottom from "../../components/js/bottomSection";

function Product(props) {
  const [size, setSize] = useState({
    size: "",
    index: "",
  });

  const size_setter = async (sze, index) => {
    setSize({
        size: sze,
        index: index,
    });
    
    props.prod.size = sze;
  };

  return (
    <div className="product row">
      <div className="prod_img col-lg-6 animate__animated animate__fadeInUp">
        <img src={props.prod.image} alt="prodImg" />
      </div>
      <div className="prod_actions col-lg-6 animate__animated animate__fadeInRightBig">
        <div className="row">
          <h1 className="prod_name">{props.prod.name}</h1>
        </div>
        <div className="row">
          <h4 className="prod_price">EGP {props.prod.price}</h4>
        </div>
        <div className="row">
          <h6 className="prod_size">Select Size:</h6>
        </div>
        <div className="row sizes">
          {props.prod.sizes.map((sze, index) => {
            return (
              <div key={index} className="col-sm-3">
                <button key={index} onClick={() => size_setter(sze, index)} className={size.index === index? "size_btn clicked": "size_btn"}>
                  {sze}
                </button>
              </div>
            );
          })}
        </div>
        <div className="row add_to_cart">
          <button
            onClick={() => {
                props.add_prod(props.prod)
                props.cart_viz(true)
            }}
            className="add_prod"
          >
            ADD TO CART <FontAwesomeIcon icon={faArrowRightLong} size="xl" />
          </button>
        </div>
        <div className="row prod_info">
          <div className="col-sm-12">
            <h3>Description</h3>
            <p>{props.prod.description}</p>
          </div>
        </div>
      </div>
      <Bottom />
    </div>
  );
}

export default Product;
