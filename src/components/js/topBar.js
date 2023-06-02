import React, {useState} from "react";
import "../css/topBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBagShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";


function TopBar(props) {

  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = () => {
    props.selector("shop", searchTerm);
  };

  return (
    <div className="top_bar">
      <h4 onClick={() => props.selector("home")} className="logo">
        LaceUp
      </h4>
      <div className="top_bar_links">
        <button onClick={() => props.selector("shop")} href="#">
          Shop
        </button>
        <button href="#">About</button>
        <button href="#">Become a partner</button>
      </div>

      <div className="top_bar_icons">
        <div className="input_box">
          <input type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
          <a onClick={null} href="#">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" onClick={handleClick} />
          </a>
        </div>
        {
          (localStorage.getItem("token") !== null) ? <p>Welcome <h6>{localStorage.getItem("name")}</h6></p> : null
        }
        <div className="top_bar_profile_login">
          <button onClick={() => props.selector("profile")}>
            <FontAwesomeIcon icon={faUser} size="sm" />
            <img href="https://www.adidas.com.eg/on/demandware.static/Sites-adidas-EG-Site/-/default/dwa18afe00/images/bag%20empty.svg" />
          </button>
          <button onClick={props.cartShower} href="#">
            <FontAwesomeIcon icon={faBagShopping} size="sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
