import React, { useState, useEffect } from "react";
import "../../css/adminPages/dashboard.css";
import Charts from "../../../components/js/charts";
import axios, { all } from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import "animate.css";
import { utils, writeFile } from "xlsx";
import { saveAs } from "file-saver";

const ax = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novemver",
  "December",
];

function Dashboard(props) {
  const navigate = useNavigate();

  const [orders, setOrders] = useState({
    categories: months,
    data: [],
  });
  const [sales, setSales] = useState({
    categories: months,
    data: [],
  });
  const [prodFreq, setProdFreq] = useState({
    categories: [],
    data: [],
  });

  const [salesByCity, setSalesByCity] = useState([]);

  const [ords, setOrds] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    ax.get("/GetAllUsers")
      .then((res) => {
        res.data == null && navigate("/login");
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    ax.get("/GetAllOrders")
      .then((res) => {
        // grouping all orders by month
        let allOrders = res.data;
        let groupedOrders = {
          count: [],
          money: [],
        };
        setOrds(allOrders);
        let months = orders.categories;
        for (let i = 0; i < months.length; i++) {
          let count = 0;
          let money = 0;
          allOrders.filter((order) => {
            if (order.date.split("/")[1] === "0" + (i + 1).toString()) {
              count++;
              money += order.total_price;
            }
          });
          groupedOrders.count.push(count);
          groupedOrders.money.push(money);
          setOrders({ ...orders, data: groupedOrders.count });
          setSales({ ...sales, data: groupedOrders.money });
        }

        // grouping all products by frequency
        let productsInOrders = [];

        allOrders.forEach((order) => {
          order.products.forEach((product) => {
            let productInOrders = productsInOrders.find(
              (p) => p.id === product.id
            );
            if (productInOrders) {
              productInOrders.count++;
            } else {
              productsInOrders.push({
                id: product.id,
                name: product.name,
                count: 1,
              });
            }
          });
        });

        productsInOrders = productsInOrders
          .sort((a, b) => {
            return b.count - a.count;
          })
          .slice(0, 6);
        setProdFreq({
          ...prodFreq,
          categories: productsInOrders.map((p) => p.name),
          data: productsInOrders.map((p) => p.count),
        });

        // sales by city
        let salesByCity = [];
        let ctys = [...new Set(allOrders.map((order) => order.address.city))];
        ctys.forEach((cit) => {
            salesByCity.push({
              x: cit,
              y: 0,
          })
        });
        allOrders.forEach((order) => {
          salesByCity.forEach((cit) => {
            if (cit.x === order.address.city) {
              cit.y += order.total_price;
            }
          });

        });

        setSalesByCity(salesByCity);
        console.log(salesByCity);
        console.log(ctys);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const download = () => {
    ax.get("/downloadData")
      .then((res) => {
        const wb = utils.book_new();
        Object.keys(res.data).forEach((key) => {
          const ws = utils.json_to_sheet(res.data[key]);
          utils.book_append_sheet(wb, ws, key);
        });
        writeFile(wb, "myData.xlsx");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let mostActiveUsers = [];

  const mostActive = () => {
    let allUsers = users;

    allUsers.forEach((user) => {
      let totalSpent = 0;
      let totalOrders = 0;
      ords.forEach((order) => {
        if (order.userId === user.id) {
          totalSpent += order.total_price;
          totalOrders++;
        }
      });
      mostActiveUsers.push({
        id: user.id,
        name: user.name,
        totalSpent: totalSpent,
        totalOrders: totalOrders,
        email: user.email,
      });
    });
    // sorting by total spent
    mostActiveUsers = mostActiveUsers.sort((a, b) => {
      return b.totalSpent - a.totalSpent;
    });
    // taking the top 5
    return (mostActiveUsers = mostActiveUsers.slice(0, 5));
  };

  return (
    <div className="dashboard">
      <h1 className="animate__animated animate__fadeInLeft">Dashboard</h1>
      <button
        onClick={download}
        className="download animate__animated animate__fadeInRightBig"
      >
        Download All Data
        <FontAwesomeIcon icon={faArrowDownLong} />
      </button>
      <div className="dcharts row">
        <div className="chart col-lg-4 animate__animated animate__fadeInLeftBig">
          <Charts
            title="ORDERS"
            categories={orders.categories}
            data={orders.data}
            type="bar"
            unit="Orders"
          />
        </div>
        <div className="chart col-lg-4 animate__animated animate__fadeInDownBig">
          <Charts
            title="SALES"
            categories={sales.categories}
            data={sales.data}
            type="line"
            unit="EGP"
          />
        </div>
        <div className="chart col-lg-4 animate__animated animate__fadeInRightBig">
          <Charts
            title="BEST SELLERS"
            categories={prodFreq.categories}
            data={prodFreq.data}
            type="bar"
            unit=""
          />
        </div>
        <div className="map col-lg-5 animate__animated animate__fadeInLeftBig">
          <Charts
            title="SALES BY CITY"
            data={salesByCity}
            type="treemap"
            unit=""
          />
        </div>
        <div className="allUsers col-lg-7 animate__animated animate__fadeInRightBig">
          <div className="header">
            <h1>MOST ACTIVE USERS</h1>
            <button onClick={() => props.selector("orders")}>
              GOTO ORDERS <FontAwesomeIcon icon={faArrowRightLong} />
            </button>
          </div>
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ORDERS</th>
                  <th>SPENT</th>
                </tr>
              </thead>
              <tbody>
                {mostActive().map((user, index) => {
                  return (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "odd" : "even"}
                    >
                      <td>{user.name}</td>
                      <td>
                        <a href="mailto:">{user.email}</a>
                      </td>
                      <td>{user.totalOrders}</td>
                      <td>{user.totalSpent}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="users row"></div>
    </div>
  );
}

export default Dashboard;
