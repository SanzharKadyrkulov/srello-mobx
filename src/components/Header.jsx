import React from "react";
import Search from "../img/search_white_24dp.svg";
import Person from "../img/person_white_24dp.svg";
import Language from "../img/language_white_24dp.svg";
import "../styles/header.css";
const colors = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwyEBzm8NV0uYa6O95FBsDp2VVnaFEx4Ofdw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS22d9g5lCB3jNhaiMFxSxQ1N_HGg16gJdIBw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMOdyxB8r2jBbJ0QdBrUAMAA-J1NT2NHckcg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfsG2jwn_P4WGGzWbOT_TMGwjWpXyn86kmWQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_PfPn5BcnspToUb2hS_h0171KpzxBunANGA&usqp=CAU",
];
const counter = () => {
  let i = 0;
  return () => {
    if (i == colors.length) {
      i = 0;
    }
    return i++;
  };
};
let b = counter();
const Header = () => {
  const changeBackground = (e) => {
    e.target.offsetParent.style.backgroundImage = `url(${colors[b()]})`;
  };

  return (
    <div>
      <nav>
        <div class="nav-left">
          <div class="logos">SRELLO</div>
          <ul class="nav-list">
            <li class="nav-list-link nav-font">
              <p>MODES</p>
            </li>
            <li class="nav-list-link nav-font">
              <p>BATTLE PASS</p>
            </li>
            <li class="nav-list-link nav-font">
              <p>CREW</p>
            </li>
            <li class="nav-list-link nav-font">
              <p>V-BUCKS</p>
            </li>
            <li class="nav-list-link nav-font">
              <p>COMPETITIVE</p>
            </li>
            <li class="nav-list-link nav-font">
              <p>NEWS</p>
            </li>
            <li class="nav-list-link nav-font">
              <p>MERCH</p>
            </li>
            <li class="nav-list-link nav-font">
              <p>COSPLAY</p>
            </li>
            <li class="nav-list-link nav-font">
              <p>HELP</p>
            </li>
          </ul>
        </div>
        <div class="nav-right">
          <div class="nav-icons-container">
            <img class="nav-icons" src={Search} alt="search icon" />
            <img class="nav-icons" src={Language} alt="lang icon" />
          </div>
          <div class="sign">
            <img src={Person} />
            <span class="nav-font signin">SIGN IN</span>
          </div>
          <div onClick={(e) => changeBackground(e)} class="nav-font theme-btn">
            Theme
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
