import React from "react";
import "../css/checkout.css";
import BagItem from "../../components/js/bagItem";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "animate.css";
import { useState, useEffect } from "react";
import AddAddress from "../../components/js/addNewAddress";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout(props) {
  const [addVisible, setAddVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [reloadAdresses, setReloadAdresses] = useState(false);
  const [order, setOrder] = useState({
    userId: localStorage.getItem("id"),
    products: props.cart,
    status: "pending",
    address: "",
    total_price: props.cart.reduce((acc, item) => {
      return acc + item.price;
    }, 0),
    date: new Date().toLocaleDateString(),
  });

  const navigate = useNavigate();

  const ax = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    params: {
      userId: localStorage.getItem("id"),
    },
  });

  useEffect(() => {
    ax.post("/validateToken", {}).then((res) => {
      if (res.data === false) {
        navigate("/login");
      }
    })
    .catch((err) => {
      console.log(err);
      navigate("/login");
    });


    ax.get("/getAddresses")
      .then((res) => {
        setAddresses(res.data);
      })
      .catch((err) => {
        console.log(err.response.status);
      });
  }, [reloadAdresses]);

  const _checkout = async () => {
    await setOrder({
      ...order,
      products: props.cart,
      total: props.cart.reduce((acc, item) => {
        return acc + item.price;
      }, 0),
    });

    if (addresses.length > 0 && order.address !== "") {
      ax.post("/CreateOrder", order)
        .then((res) => {
          props.clear();
          props.selector("profile");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please Add or Select an Address");
    }
  };

  return (
    <div className="checkout">
      <div className="row">
        <h1 className="title animate__animated animate__fadeInDown">
          YOUR BAG
        </h1>
      </div>
      <div className="row">
        <div className="col-lg-8">
          {props.cart.map((item, index) => {
            return (
              <div
                className={
                  index % 2 == 0
                    ? "animate__animated animate__fadeInLeftBig"
                    : "animate__animated animate__fadeInLeft"
                }
              >
                <BagItem key={index} item={item} del={props.del} />
              </div>
            );
          })}
        </div>
        <div className="col-lg-4 summ animate__animated animate__fadeInRight">
          <div className="row bagSummary">
            <h1 className="summaryTitle">BAG SUMMARY</h1>
            <div className="col-lg-6 left">PAYMENT METHOD:</div>
            <div className="col-lg-6 right"> Cash On Delivery</div>
            <div className="col-lg-6 total left">TOTAL: </div>
            <div className="col-lg-6 total right">
              EGP{" "}
              {props.cart.reduce((acc, item) => {
                return acc + item.price;
              }, 0)}{" "}
            </div>
          </div>
          <div className="row selectAdd">
            <div className="col-lg-12 addressCont">
              <h1 className="selectAddTitle">SELECT ADDRESS</h1>
              <div className="addressesCont">
                {addresses.map((address, index) => {
                  return (
                    <div
                      key={index}
                      className="Address animate__animated animate__fadeInRightBig"
                    >
                      <div className="col-lg-1">
                        <input
                          onClick={() =>
                            setOrder({ ...order, address: address })
                          }
                          type="radio"
                          name="address"
                        />
                      </div>
                      <div className="col-lg-11">
                        <div>{address.adress}</div>
                        <div>{address.city},</div>
                        <div>{address.region}</div>
                        <div>{address.phoneNumber}</div>
                        <hr />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              onClick={() => setAddVisible(!addVisible)}
              className="col-lg-12 addAddress"
            >
              ADD NEW ADDRESS +
            </div>
            <AddAddress
              viz={addVisible}
              reload={setReloadAdresses}
              reloaded={reloadAdresses}
            />
          </div>
          <div className="row">
            <button onClick={_checkout} className="placeOrder">
              PLACE ORDER
              <FontAwesomeIcon icon={faArrowRightLong} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
