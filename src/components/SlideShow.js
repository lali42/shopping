import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import P1 from "../images/1.jpg";
import P2 from "../images/2.jpg";
import P3 from "../images/3.jpg";
import { Card } from "@material-ui/core";

export const SlideShow = () => {
  return (
    <div className="center">
      <Card className="card-slide">
        <Slide easing="ease">
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${P1})` }}>

            </div>
          </div>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${P2})` }}>

            </div>
          </div>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${P3})` }}>

            </div>
          </div>
        </Slide>
      </Card>
    </div>
  );
};
