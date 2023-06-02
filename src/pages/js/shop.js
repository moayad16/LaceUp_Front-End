import React, { useEffect } from "react";
import "../css/shop.css";
import Card from "../../components/js/card";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faKipSign, faSort } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Spinner from "../../components/js/spinner";
import Bottom from "../../components/js/bottomSection";
import RightBar from "../../components/js/rightBar";
import CustomSelect from "../../components/js/customSelect";
import { sort, search } from "../../modules/utils";

function Shop(props) {
  const [products, setProducts] = React.useState([]);
  let spinners = [];

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/GetAllProducts")
      .then((res) => {
        if (props.term) {
          setProducts(search(res.data, props.term));
        } else {
          setProducts(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.term]);

  const [isClicked, setIsClicked] = React.useState({
    isClicked: false,
    title: "",
  });

  const sortHandler = (e) => {
    const sortedProducts = sort([...products], e); // Create a new array with the sorted products
    console.log(sortedProducts, "sorted Prods");
    setProducts(sortedProducts); // Set the state with the new array
    console.log(products, "prods");
  };

  return (
    <div className="shop animate__animated ">
      <RightBar
        isClicked={isClicked}
        closer={setIsClicked}
        filter={setProducts}
        prods={products}
        removeFilter={setProducts}
      />
      <h1 className="animate__animated animate__fadeIn">ALL PRODUCTS</h1>
      <div className="row">
        <div className="col-sm-12 filters">
          <button
            className="animate__animated animate__fadeInRightBig filterBtn"
            onClick={() =>
              setIsClicked({ isClicked: true, title: "FILTER BY" })
            }
          >
            FILTER BY
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <CustomSelect
            options={["PRICE: LOW TO HIGH", "PRICE: HIGH TO LOW"]}
            val="SORT BY"
            update={sortHandler}
          />
        </div>
      </div>
      <div className="products_cont animate__animated animate__fadeInUp">
        <div className="row">
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
                      props.productSelect(product);
                      props.selector("product");
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
      </div>
      <Bottom />
    </div>
  );
}

export default Shop;
