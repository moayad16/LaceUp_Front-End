import React, { useState, useEffect } from "react";
import "../../css/adminPages/orders.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMagnifyingGlass,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import "animate.css";
import { useNavigate } from "react-router-dom";

const ax = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [modifiedOrders, setModifiedOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    ax.get("/GetAllUsersOrders")
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });

    // sort orders by date descendingly
    setOrders(
      orders.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })
    );
  }, []);

  const handleChange = (val, id) => {
    setDisabled(false);
    setModifiedOrders([...modifiedOrders, { id: id, status: val }]);
  };

  const handleCommit = () => {
    ax.post("/ModifyOrder", modifiedOrders)
      .then((res) => {
        (res.status === 200 || res.status === 201) && setDisabled(true);
        alert("Changes Committed");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    setClicked(!clicked);
    setOrders(orders.filter((order) => order.id.includes(search)));
  };

  const handleReset = () => {
    setClicked(!clicked);
    setSearch("");
    ax.get("/GetAllUsersOrders")
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="orders">
      <h1 className="animate__animated animate__fadeInLeftBig">Orders</h1>
      <div className="searchCommit">
        <div className="input_box animate__animated animate__fadeInLeft">
          <input
            type="text"
            placeholder="Order ID"
            value={search}
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
        <button
          onClick={handleCommit}
          className={
            disabled
              ? "comitBtnDisabled animate__animated animate__fadeInRightBig"
              : "comitBtn animate__animated animate__fadeInRightBig"
          }
          disabled={disabled}
        >
          Commit Changes
          <FontAwesomeIcon icon={faCheck} size="xl" />
        </button>
      </div>
      {!search && clicked ? (
        <div>
          <h1>Order Not Found</h1>
        </div>
      ) : (
        <div className="row ordersTable">
          <div className="col-lg-12">
            <table className="table table-striped">
              <thead className="animate__animated animate__fadeInLeftBig">
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Products</th>
                  <th scope="col">Total</th>
                  <th scope="col">Address</th>
                  <th scope="col">Order Date</th>
                  <th scope="col">Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .sort((a, b) => {
                    const dateA = new Date(
                      a.date.split("/").reverse().join("/")
                    );
                    const dateB = new Date(
                      b.date.split("/").reverse().join("/")
                    );
                    return dateB - dateA;
                  })
                  .map((order, index) => (
                    <tr
                      key={order.id}
                      className={
                        index % 2 === 0
                          ? "animate__animated animate__fadeInLeftBig"
                          : "animate__animated animate__fadeInRightBig"
                      }
                    >
                      <th scope="row">{order.id}</th>
                      <td>{order.userId}</td>
                      <td className="productsCell">
                        {order.products.map((product, index) => {
                          return (
                            <div className="row prods">
                              <div className="col-lg-4 prodImg">
                                <img
                                  src={product.image}
                                  className="img"
                                  alt="product"
                                />
                              </div>
                              <div className="col-lg-10 prodInfo">
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                                <p>{product.size}</p>
                              </div>
                            </div>
                          );
                        })}
                      </td>
                      <td>EGP {order.total_price}</td>
                      <td>
                        <div>{order.address.adress}</div>
                        <div>{order.address.city},</div>
                        <div>{order.address.region}</div>
                        <div>{order.address.phoneNumber}</div>
                      </td>
                      <td>{order.date}</td>
                      <td>
                        <select
                          onChange={(e) =>
                            handleChange(e.target.value, order.id)
                          }
                          className="form-select"
                          aria-label="Default select example"
                          disabled={order.status === "shipped" ? true : false}
                        >
                          <option selected>{order.status}</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                        </select>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
