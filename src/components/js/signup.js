import React from "react";
import "../css/signup.css";
import axios from "axios";
import { useState } from "react";

function Signup(props) {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const _signup = () => {
    // check if the passwords match
    if (signupInfo.password !== signupInfo.confirmPassword) {
      setError({
        error: true,
        message: "Passwords do not match",
      });
      return;
    }

    //check if any of the fields are empty
    if (
      signupInfo.name === "" ||
      signupInfo.email === "" ||
      signupInfo.password === "" ||
      signupInfo.confirmPassword === ""
    ) {
      setError({
        error: true,
        message: "Please fill all the fields",
      });
      return;
    }

    axios
      .post("http://localhost:8080/signup", signupInfo)
      .then((res) => {
        console.log(res.data);
        props.selector("home");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <div className="signup">
      <h1>Signup</h1>
      <div className="signupForm">
        <h4>Name</h4>
        <input
          onChange={(e) => {
            setSignupInfo({ ...signupInfo, name: e.target.value });
          }}
          type="text"
          name="name"
          placeholder="Name"
        />
        <h4>Email</h4>
        <input
          onChange={(e) => {
            setSignupInfo({ ...signupInfo, email: e.target.value });
          }}
          type="text"
          name="email"
          placeholder="email"
        />
        <h4>Password</h4>
        <input
          onChange={(e) => {
            setSignupInfo({ ...signupInfo, password: e.target.value });
          }}
          type="password"
          name="password"
          placeholder="Password"
        />
        <h4>Confirm Password</h4>
        <input
          onChange={(e) => {
            setSignupInfo({ ...signupInfo, confirmPassword: e.target.value });
          }}
          type="password"
          name="password"
          placeholder="Password"
        />
        <div className="error">
          {error.error ? <p>{error.message}</p> : null}
        </div>
        <button onClick={_signup} className="btn btn-primary" type="button">
          Signup
        </button>
        <button
          onClick={props.selector}
          className="btn btn-primary"
          type="button"
        >
          Already have an account? Login here!
        </button>
      </div>
    </div>
  );
}

export default Signup;
