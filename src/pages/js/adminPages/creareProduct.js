import React, { useState } from "react";
import "../../css/adminPages/createProduct.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "animate.css";

const ax = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

function CreateProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    brand: "",
    description: "",
    image: "",
    gender: "male",
    sizes: [],
  });
  

  const handleCreate = async () => {
    // check if any of the values are empty
    for (let key in product) {
      if (product[key] === "") {
        return alert("Please fill all fields");
      }
    }

    //convert the string numbers to an array
    let sizes = product.sizes.split(",");
    for (let i = 0 ; i < sizes.length ; i++){
        sizes[i] = parseInt(sizes[i]);
    }
    //set the sizes to the array
    setProduct({ ...product, sizes: sizes });

    const newProduct = { ...product, sizes: sizes };

    //send the request
    ax.post("/CreateProduct", newProduct)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          alert("Product Created");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error creating product");
      });

    //reset the state
    setProduct({
        name: "",
        price: "",
        brand: "",
        description: "",
        image: "",
        sizes: [],
        });

  };

  return (
    <div className="createProductCont">
      <h1 className="animate__animated animate__fadeInLeft">Create Product</h1>
      <button
        className="animate__animated animate__fadeInRightBig"
        onClick={handleCreate}
      >
        Create Product
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </button>
      <div className="createProductForm">
        <form>
          <div className="form-group">
            <label
              className="animate__animated animate__fadeInRightBig"
              for="name"
            >
              Product Name *
            </label>
            <input
              type="text"
              className="form-control animate__animated animate__fadeInRightBig"
              id="name"
              placeholder="Enter product name"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              value={product.name}
            />
          </div>
          <div className="form-group">
            <label
              className="animate__animated animate__fadeInLeftBig"
              for="price"
            >
              Price *
            </label>
            <input
            value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              type="number"
              className="form-control animate__animated animate__fadeInLeftBig"
              id="price"
              placeholder="Enter product price"
            />
          </div>
          <div className="form-group">
            <label
            value={product.brand}
              className="animate__animated animate__fadeInRightBig"
              for="description"
            >
              Description *
            </label>
            <textarea
            value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="form-control animate__animated animate__fadeInRightBig"
              id="description"
              rows="3"
            ></textarea>
          </div>
          <div className="form-group">
            <label
              className="animate__animated animate__fadeInLeftBig"
              for="image"
            >
              Image Url *
            </label>
            <input
            value={product.image}
              onChange={(e) =>
                setProduct({ ...product, image: e.target.value })
              }
              className="form-control animate__animated animate__fadeInLeftBig"
              id="image"
            />
          </div>
          <div className="form-group">
            <label
              className="animate__animated animate__fadeInRightBig"
              for="category"
            >
              Gender *
            </label>
            <select
              onChange={(e) =>
                setProduct({ ...product, gender: e.target.value })
              }
              className="form-control animate__animated animate__fadeInRightBig"
              id="category"
            >
              <option selected value="male">
                Male
              </option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
          <div className="form-group">
            <label
              className="animate__animated animate__fadeInLeftBig"
              for="size"
            >
              Sizes *
            </label>
            <input
            value={product.sizes}
              onChange={(e) =>
                setProduct({ ...product, sizes: e.target.value })
              }
              type="text"
              className="form-control animate__animated animate__fadeInLeftBig"
              id="size"
              placeholder="Enter sizes separated by a ','"
            />
          </div>
          <div className="form-group">
            <label
              className="animate__animated animate__fadeInRightBig"
              for="size"
            >
              Brand *
            </label>
            <input
            value={product.brand}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
              type="text"
              className="form-control animate__animated animate__fadeInRightBig"
              id="size"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
