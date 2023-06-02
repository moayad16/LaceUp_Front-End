import React from "react";
import "../css/bagItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


function BagItem(props) {
    return (
      <div className="bagItem">
        <div className="row">
          <div className="col-lg-4 bagItemImg">
            <img src={props.item.image} alt="prodImg" />
          </div>
          <div className="col-lg-6 bagItemInfo">
            <h1>{props.item.name}</h1>
            <p>Size: {props.item.size}</p>
            <p>EGP {props.item.price}</p>
            <button onClick={() =>props.del(props.index)}>
              REMOVE FROM BAG
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    );
    }

export default BagItem;