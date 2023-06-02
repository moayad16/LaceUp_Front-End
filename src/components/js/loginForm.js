import React from "react";
import "../css/login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'animate.css'


function Login(props) {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false)

  const _login = () => {
    axios
      .post("http://localhost:8080/login", loginInfo)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("id", res.data.id);
          console.log(res.data.token);

          if (res.data.type === "customer") {
            navigate("/");
          }
          else if (res.data.type === "admin") {
            navigate("/admin");
          }
          
        }
        else{
          alert("Invalid login credentials");
        }
      })
      .catch((err) => {
        setError(true)
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="loginForm">
        <h4>Email</h4>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, email: e.target.value.toLowerCase() })
          }
        />
        <h4>Password</h4>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
        />
        <div style={(error)? {display: "block"} : {display: "none"}} className="error">Invalid Email Or Password</div>
        <button onClick={_login} className="btn btn-primary" type="button">
          Login
        </button>
        <button onClick={props.selector} className="btn btn-primary" type="button">
          Don't have an account? Sign up here!
        </button>
      </div>
    </div>
  );
}

export default Login;
