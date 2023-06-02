import React, { useState, useEffect } from "react";
import "../../css/adminPages/admin.css";
import AdminTop from "../../../components/js/adminTopBar";
import Dashboard from "./dashboard";
import Orders from "./orders";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Bottom from "../../../components/js/bottomSection";
import CreateProduct from "./creareProduct";
import Products from "./products";
import Product from "./product";

function Admin() {
  const [page, setPage] = useState("dashboard");
  const[product, setProduct] = useState()
  const navigate = useNavigate();

  const ax = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });

  useEffect(() => {
    localStorage.getItem("token") === null && navigate("/login");
    ax.post("/validateToken", {})
      .then((res) => {
        if (res.data === false) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mainAdminCont">
      <AdminTop selector={setPage} />
      <div>
        {page === "dashboard" ? (
          <Dashboard selector={setPage} />
        ) : page === "orders" ? (
          <Orders />
        ) : page === "createProd" ? (
          <CreateProduct />
        ) : page === "prods" ? (
            <Products selector={setPage} product={setProduct} />
        ) : page === "prod" ? (
            <Product selector={setPage} prod={product} />
        ) : null}
      </div>
      <Bottom />
    </div>
  );
}

export default Admin;
