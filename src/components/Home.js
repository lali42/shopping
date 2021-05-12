import React from "react";
import { Navbar } from "./Navbar";
import { Products } from "./Products";
import "../css/Home.css";
import { SlideShow } from "./SlideShow";

export const Home = () => {
  return (
    <div className="wrapper">
      <Navbar />
      {/* <SlideShow/> */}
      <Products />
    </div>
  );
};
