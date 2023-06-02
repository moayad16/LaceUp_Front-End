import React from "react";
import "../css/profile.css";
import "animate.css";
import Bottom from "../../components/js/bottomSection";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const [user, setUser] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrdes] = useState([]);
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

    localStorage.getItem("token") === null && navigate("/login")

    ax.post("/validateToken", {}).then((res) => {
      if (res.data === false) {
        navigate("/login");
      }
    })
    .catch((err) => {
      console.log(err);
    });

    ax.get("/GetUser")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        err.response.status === 401 ? props.selector("home") : console.log(err);
      });

    ax.get("/getAddresses")
      .then((res) => {
        setAddresses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    ax.get("GetAllUserOrders")
      .then((res) => {
        setOrdes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    props.selector("home");
  };

  return (
    <div className="profile ">
      <button
        onClick={logOut}
        className="animate__animated animate__fadeInDownBig"
      >
        LOG OUT
        <FontAwesomeIcon icon={faArrowRightLong} size="xl" />
      </button>
      <div className="row personalInfo">
        <div className="col-lg-6 personalInfCont animate__animated animate__fadeInLeftBig">
          <div className="title">
            <h3>PERSONAL INFORMATION</h3>
            <div className="content">
              <div className="row">
                <div className="col-lg-6">
                  <label>NAME</label>
                  <input type="text" placeholder={user.name} disabled />
                </div>
                <div className="col-lg-6">
                  <label>EMAIL</label>
                  <input type="text" placeholder={user.email} disabled />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <label>PASSWORD</label>
                  <input type="password" placeholder="Password" disabled />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 addresses animate__animated animate__fadeInRightBig">
          <div className="title">
            <h3>ADDRESS BOOK</h3>
            <div className="content">
              {addresses.map((address) => {
                return (
                  <div>
                    <div>{address.adress}</div>
                    <div>{address.city},</div>
                    <div>{address.region}</div>
                    <div>{address.phoneNumber}</div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="row ordersHistory animate__animated animate__fadeInUpBig">
        <div className="col-lg-12 ordersCont">
          <div className="title">
            <h3>YOUR ORDERS</h3>
            <div className="content">
              {orders.map((order, index) => {
                return (
                  <div className="order">
                    <div>
                      <h5>ORDER: {order.id}</h5>
                      <h5>STATUS: {order.status}</h5>
                      <hr />
                    </div>
                    {order.products.map((product) => {
                      return (
                        <div className="row products">
                          <div className="col-lg-2 itemImage">
                            <img src={product.image} alt="prodImg" />
                          </div>
                          <div className="col-lg-9 itemSpecs">
                            <div>{product.name}</div>
                            <div>{product.size}</div>
                            <div>EGP {product.price}</div>
                          </div>
                          <hr />
                        </div>
                      );
                    })}
                    <div className="row orderSummary">
                      <div className="col-lg-6">
                        <div>Date Ordered: {order.date}</div>
                        <div>
                          Address: {order.address.adress} {order.address.city},{" "}
                          {order.address.region}
                        </div>
                        <div>Phone Number: {order.address.phoneNumber}</div>
                        <div>Total Items: {order.products.length}</div>
                        <div>Total: EGP {order.total_price}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Bottom />
    </div>
  );
}

export default Profile;
