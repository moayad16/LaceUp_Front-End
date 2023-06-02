import React from "react";
import "../css/card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

function Card(props) {
  // console.log(props.product);
  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div className="top">
            <img src={props.product.image} alt="prodImg" />
          </div>
          <div className="bottom">
            <p className="prodName">{props.product.name}</p>
            <p className="prodPrice">EGP {props.product.price}</p>
            <p className="prodGender">{props.product.gender}</p>
          </div>
        </div>
        <div className="inside">
          <div className="icon">
            <FontAwesomeIcon icon={faCircleInfo} />
          </div>
          <div className="contents">
            <h5>Brand: </h5>
            <p>{props.product.brand}</p>
            <h5>Description: </h5>
            <p>{props.product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
