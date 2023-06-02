import React, { useState } from "react";
import "../css/topBar.css";
import '../css/adminTopBar.css'
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function AdminTop(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    navigate("/")

  }


  return (
    <div className="top_bar">
      <h4 className="logo">
        LaceUp
      </h4>
      <div className="top_bar_links">
        <button onClick={() => props.selector("dashboard")} href="#">
          Dashboard
        </button>
        <button onClick={() => props.selector("orders")}>Orders</button>
        <button onClick={() => props.selector("createProd")}>Create Product</button>
        <button onClick={() => props.selector("prods")}>Products</button>

      </div>

      <div className="top_bar_icons">
        {localStorage.getItem("token") !== null ? (
          <p>
            Welcome <h6>{localStorage.getItem("name")}</h6>
          </p>
        ) : null}
        <button onClick={logout} className="logout">
          Log out
          <FontAwesomeIcon icon={faArrowRightLong} size="sm" />
        </button>
      </div>
    </div>
  );
}

export default AdminTop;
