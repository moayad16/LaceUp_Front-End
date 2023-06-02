import React, { useEffect } from "react";
import "../css/cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

function CartBody(props) {
  const [idx, setIndex] = useState();

  useEffect(() => {
    setIndex();
  }, [props.cart]);
  

  return (
    <div>
      {props.cart.map((item, index) => {
        return (
          <div
            key={index}
            className={
              index === idx
                ? "row item_box animate__animated animate__fadeOutRight"
                : "row item_box animate__animated animate__fadeInRight"
            }
          >
            <div className="col-lg-3 cartItemImg">
              <img src={item.image} alt="prodImg" />
            </div>
            <div className="col-lg-7 cartItemInfo">
              <div className="row">
                <p>{item.name}</p>
                <p>Size: {item.size}</p>
                <p>EGP {item.price}</p>
              </div>
            </div>
            <div
              onClick={() => {
                props.delCartItem(index);
                setIndex(index);
              }}
              className="col-lg-2 delete_cart_item"
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        );
      })}
      <div className="row cart_footer">
        <div className="cart_total">
          <h5>Total: </h5>
          <h5>
            EGP{"   "}
            {props.cart.reduce((acc, item) => {
              return acc + item.price;
            }, 0)}
          </h5>
        </div>
        <button onClick={() => {
          props.selector("checkout")
          props.shower()
          }} className="checkout_btn">
          GO TO CHECKOUT
          <FontAwesomeIcon icon={faArrowRightLong} size="xl" />
        </button>
      </div>
    </div>
  );
}

export default CartBody;
