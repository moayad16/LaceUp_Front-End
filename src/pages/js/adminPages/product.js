import React, { useState } from "react";
import "../../css/adminPages/product.css";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faClose,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ax = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

function Product(props) {
  const [disabled, setDisabled] = useState(true);
  const [prod, setProd] = useState(props.prod);

  const handleCommit = () => {
    // check if any of the fields are empty
    Object.keys(prod).forEach((key) => {
      if (prod[key] === "") {
        return alert("Please fill all fields");
      }
    });

    console.log(typeof props.prod.sizes);
    console.log(prod.sizes);

    // convert the sizes to an array

    let newProd = {};

    if (typeof prod.sizes === "string") {
      let sizes = prod.sizes.split(",");
      for (let i = 0; i < sizes.length; i++) {
        sizes[i] = parseInt(sizes[i]);
      }
      newProd = { ...prod, sizes: sizes };
    } else newProd = { ...prod };

    // send the request
    ax.post("/EditProduct", newProd)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          alert("Product Edited");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error editing product");
      });
  };

  const handleDelete = () => { 
    ax.delete(`/DeleteProduct`, {params: {id: props.prod.id}})
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                alert("Product Deleted");
                props.selector("prods")
            }
        })
        .catch((err) => {
            console.log(err);
            alert("Error deleting product");
        });
    }

  return (
    <div className="adminProduct">
      <div className="row">
        <h1>Edit Product</h1>
        <div className="prod_img col-lg-6 animate__animated animate__fadeInUp">
          <img src={props.prod.image} alt="prodImg" />
        </div>
        <div className="prod_actions col-lg-6 animate__animated animate__fadeInRightBig">
          <div className="actionBtns">
            <button
              onClick={handleDelete}
              className="animate__animated animate__fadeInRightBig deleteBtn"
            >
              Delete Product
              <FontAwesomeIcon icon={faClose} size="lg" />
            </button>
            <button
              onClick={handleCommit}
              disabled={disabled}
              className={
                disabled
                  ? "animate__animated animate__fadeInRightBig actionBtnDisabled"
                  : "animate__animated animate__fadeInRightBig actionBtn"
              }
            >
              Commit Changes
              <FontAwesomeIcon icon={faCheck} size="lg" />
            </button>
            <button
              onClick={() => setDisabled(false)}
              style={{ marginRight: 0 }}
              className="animate__animated animate__fadeInRightBig actionBtn"
            >
              Edit Product
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
          <div className="prodForm">
            <form>
              <div className="form-group">
                <label for="prodName">Product Name</label>
                <input
                  onChange={(e) => setProd({ ...prod, name: e.target.value })}
                  disabled={disabled}
                  type="text"
                  className="form-control"
                  id="prodName"
                  placeholder="Enter product name"
                  value={disabled ? props.prod.name : prod.name}
                />
              </div>
              <div className="form-group">
                <label for="prodName">Gender</label>
                <select
                  onChange={(e) => setProd({ ...prod, gender: e.target.value })}
                  disabled={disabled}
                  type="text"
                  className="form-control"
                  id="prodName"
                  placeholder="Enter product name"
                  value={disabled ? props.prod.gender : prod.gender}
                >
                  <option>
                    Male
                  </option>
                  <option>
                    Female
                  </option>
                  <option>
                    Unisex
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label for="prodName">Brand</label>
                <input
                  onChange={(e) => setProd({ ...prod, brand: e.target.value })}
                  disabled={disabled}
                  type="text"
                  className="form-control"
                  id="prodName"
                  placeholder="Enter product name"
                  value={disabled ? props.prod.brand : prod.brand}
                />
              </div>
              <div className="form-group">
                <label for="prodName">Sizes</label>
                <input
                  onChange={(e) => setProd({ ...prod, sizes: e.target.value })}
                  disabled={disabled}
                  type="text"
                  className="form-control"
                  id="prodName"
                  placeholder="Enter product name"
                  value={disabled ? props.prod.sizes.toString() : prod.sizes}
                />
              </div>
              <div className="form-group">
                <label for="prodPrice">Product Price</label>
                <input
                  onChange={(e) => setProd({ ...prod, price: e.target.value })}
                  disabled={disabled}
                  type="number"
                  className="form-control"
                  id="prodPrice"
                  placeholder="Enter product price"
                  value={disabled ? props.prod.price : prod.price}
                />
              </div>
              <div className="form-group">
                <label for="prodDesc">Product Description</label>
                <textarea
                  onChange={(e) =>
                    setProd({ ...prod, description: e.target.value })
                  }
                  disabled={disabled}
                  className="form-control"
                  id="prodDesc"
                  rows="3"
                  value={disabled ? props.prod.description : prod.description}
                ></textarea>
              </div>
              <div className="form-group">
                <label for="prodImg">Product Image Url</label>
                <input
                  onChange={(e) => setProd({ ...prod, image: e.target.value })}
                  disabled={disabled}
                  type="text"
                  className="form-control"
                  id="prodImg"
                  placeholder="Enter product image url"
                  value={disabled ? props.prod.image : prod.image}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
