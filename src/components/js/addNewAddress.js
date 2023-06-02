import React from "react";
import "../css/addNewAddress.css";
import "animate.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddAddress(props) {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    adress: "",
    city: "",
    region: "",
    phoneNumber: "",
    userId: localStorage.getItem("id"),
  });

  const token = localStorage.getItem("token");

  const ax = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const saveAddress = () => {
    ax.post("/createAddress", address)
      .then((res) => {
        console.log(res);
        props.reload(!props.reloaded)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
  };

  return (
    <div
      className="addNewAdd animate__animated animate__fadeInRight"
      style={props.viz ? { display: "block" } : { display: "none" }}
    >
      <h1>Add An Address To Your Account</h1>
      <div className="row addAddressForm">
        <div className="col-lg-12">
          <label>Street Name and Buildin Number</label>
        </div>
        <div className="col-lg-12">
          <input
            type="text"
            placeholder="Street & Building #"
            onChange={(e) => setAddress({ ...address, adress: e.target.value })}
          />
        </div>
        <div className="col-lg-12">
          <label>City</label>
        </div>
        <div className="col-lg-12">
          <input
            type="text"
            placeholder="City"
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
        </div>
        <div className="col-lg-12">
          <label>Region</label>
        </div>
        <div className="col-lg-12">
          <input
            type="text"
            placeholder="Region"
            onChange={(e) => setAddress({ ...address, region: e.target.value })}
          />
        </div>
        <div className="col-lg-12">
          <label>Phone Number</label>
        </div>
        <div className="col-lg-12">
          <input
            type="text"
            placeholder="Phone Number"
            onChange={(e) =>
              setAddress({ ...address, phoneNumber: e.target.value })
            }
          />
        </div>
        <div className="row">
          <button onClick={saveAddress}>ADD ADDRESS TO YOUR ACCOUNT</button>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
