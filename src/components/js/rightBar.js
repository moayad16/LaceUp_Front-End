import React, { useState } from "react";
import "../css/rightBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {filter, remove_filter} from '../../modules/utils.js'
import CustomSelect from "./customSelect";

function RightBar(props) {
  const [filterOps, setFilterOps] = useState({
    gender: null,
    price: null,
    brand: null,
  });

  let prices = [...new Set(props.prods.map((prod) => prod.price))];
  let max = Math.max(...prices)
  let min = Math.min(...prices)
  let diff = max - min
  let step = diff / 4
  let final_prices = [[min, min + step], [min + step, min + step * 2], [min + step * 2, min + step * 3], [min + step * 3, max]]



  const updateGender = (value) => {
    setFilterOps({...filterOps, gender: value})
  }
  const updatePrice = (value) => {
    setFilterOps({...filterOps, price: value})
  }
  const updateBrand = (value) => {
    setFilterOps({...filterOps, brand: value})
  }

  

  return (
    <div
      className={
        props.isClicked.isClicked ? "rightBar rightBar_clicked" : "rightBar"
      }
    >
      <div className="row">
        <div className="col-sm-12 rightBarHeader">
          <h1>{props.isClicked.title}</h1>
          <FontAwesomeIcon
            icon={faSquareXmark}
            size="xl"
            style={{ cursor: "pointer" }}
            onClick={() => props.closer({ isClicked: false, title: "" })}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 filterOptions">
          <label>Gender</label>
          <CustomSelect val="Select Gender" update={updateGender} options={[...new Set(props.prods.map(prod => prod.gender))]}/>
          <label>Brand</label>
          <CustomSelect val="Select brand" update={updateBrand} options={[...new Set(props.prods.map(prod => prod.brand))]}/>
          <label>Price</label>
          {
            final_prices.map((price, index) => {
              return(
                <div key={index} className="price">
                  <input className="radio" type="radio" id={price} name="price" value={price} onChange={(e) => updatePrice(price)}/>
                  <label >From {price[0]} to {price[1]}</label>
                </div>

              )
            })
          }
          
        </div>
        <div className="actionBtns">
            <button className="applyBtn" onClick={async () => {
              props.filter(await filter(props.prods, filterOps))}}>
              APPLY FILTER
            </button>
            <button className="applyBtn" onClick={async () => props.removeFilter(await remove_filter(props.prods, null))}>
              REMOVE FILTER
            </button>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
