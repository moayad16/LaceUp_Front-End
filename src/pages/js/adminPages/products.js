import React, { useState, useEffect } from "react";
import "../../css/adminPages/products.css";
import Card from "../../../components/js/card";
import axios from "axios";
import "animate.css";
import Spinner from "../../../components/js/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faClose } from "@fortawesome/free-solid-svg-icons";
import { search } from "../../../modules/utils";

const ax = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

function Products(props) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  let spinners = [];

  useEffect(() => {
    ax.get("/GetAllProducts")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = () => {
    setClicked(!clicked);
    setProducts(search(products, searchTerm));
  };

  const handleReset = () => {
    setClicked(!clicked);
    setSearch("");
    ax.get("/GetAllProducts")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="allProductsCont">
      <h1 className="animate__animated animate__fadeInLeft">All Products</h1>
      <div className="input_box animate__animated animate__fadeInRightBig">
        <input
          type="text"
          placeholder="Product Name"
          value={searchTerm}
          onChange={(e) => setSearch(e.target.value)}
        />
        <a
          style={clicked ? { display: "none" } : { display: "block" }}
          href="#"
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="lg"
            color="black"
            onClick={handleSearch}
          />
        </a>
        <a
          style={!clicked ? { display: "none" } : { display: "block" }}
          href="#"
        >
          <FontAwesomeIcon
            icon={faClose}
            size="xl"
            color="black"
            onClick={handleReset}
          />
        </a>
      </div>
      {!searchTerm && clicked ? (
        <div className="animate__animated animate__fadeInUp">
          <h1>No Products Found</h1>
        </div>
      ) : (
        <div className="row animate__animated animate__fadeInUpBig ">
          {(() => {
            if (products.length === 0) {
              for (let i = 0; i < 8; i++) {
                spinners.push(<Spinner key={i} />);
              }
              return spinners;
            } else {
              return products.map((product, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      props.selector("prod");
                      props.product(product);
                    }}
                    className="col-md-3"
                  >
                    <Card product={product} />
                  </div>
                );
              });
            }
          })()}
        </div>
      )}
    </div>
  );
}

export default Products;
