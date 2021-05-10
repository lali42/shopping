import React from "react";
// import { Link } from "react-router-dom";
import logo from "../images/logo.png"

export const Navbar = () => {
  return (
    <div className="navbox">
      <div className="leftside">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};
