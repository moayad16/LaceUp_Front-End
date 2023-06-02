import "../css/cart.css";
import CartBody from "./cartBody";
import "animate.css";

function Cart(props) {
  return (
    <div
      className={
        props.viz
          ? "cart animate__animated animate__fadeInRight"
          : "cart animate__animated animate__fadeOutRight"
      }
    >
      {props.cart.length === 0 ? (
        <div className="empty_cart">
          <h1 className="animate__animated animate__fadeInUp">
            {" "}
            Your Cart is empty <br /> Go To Shop And Add Products Now!
          </h1>
        </div>
      ) : (
        <CartBody cart={props.cart} delCartItem={props.delCartItem} selector={props.selector} shower={props.shower} />
      )}
    </div>
  );
}

export default Cart;
