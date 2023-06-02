import React from "react";
import TopBar from "../../components/js/topBar";
import "../css/main.css";
import { useState, useEffect } from "react";
import Home from "./home";
import Shop from "./shop";
import RightBar from "../../components/js/rightBar";
import Product from "./product";
import Cart from "../../components/js/cart";
import Profile from "./profile";
import Checkout from "./checkout";
import Bottom from "../../components/js/bottomSection";

function Main(props) {
  const [page, setPage] = useState("home");
  const [clicked, setClicked] = useState({ isClicked: false, title: "" });
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [cart_viz, setCartViz] = useState(false);
  const [prods, setProds] = useState([]);
  const [term, setTerm] = useState("");

  const cart_manager = (prod) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    try {
      cart.push(prod);
      localStorage.setItem("cart", JSON.stringify(cart));
      setCart(cart);
    } catch {
      localStorage.setItem("cart", JSON.stringify([prod]));
      setCart(cart);
    }
  };

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    setCart(cart);
  }, []);

  function selectPage(page, term) {
    setPage(page);
    setTerm(term);
  }

  const handleDelCartItem = (index) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  };

  const cart_shower = () => {
    setCartViz(!cart_viz);
  };

  const productSelector = (prod) => {
    setProduct(prod);
  };

  const rightBarController = (fitl_sort) => {
    setClicked({
      isClicked: !clicked.isClicked,
      title: fitl_sort,
    });
  };

  const clearCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    setCart([]);
  };

  return (
    <div className="main">
      <div className="topBar_cart">
        <TopBar selector={selectPage} cartShower={cart_shower} />
        <Cart
          viz={cart_viz}
          cart={cart}
          delCartItem={handleDelCartItem}
          selector={selectPage}
          shower={cart_shower}
        />
      </div>
      {(() => {
        switch (page) {
          case "home":
            return <Home selector={selectPage} />;
          case "shop":
            return (
              <div>
                <Shop
                  rightBarControl={rightBarController}
                  selector={selectPage}
                  productSelect={productSelector}
                  products={setProds}
                  term={term}
                />
              </div>
            );
          case "product":
            return (
              <Product
                prod={product}
                add_prod={cart_manager}
                cart_viz={setCartViz}
              />
            );
          case "profile":
            return <Profile selector={selectPage} />;
          case "checkout":
            return (
              <div>
                <Checkout
                  cart={cart}
                  del={handleDelCartItem}
                  clear={clearCart}
                  selector={selectPage}
                />{" "}
                <Bottom />
              </div>
            );
          default:
            return <Home />;
        }
      })()}
    </div>
  );
}

export default Main;
