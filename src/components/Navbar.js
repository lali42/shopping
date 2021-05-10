import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import BasketIcon from "@material-ui/icons/ShoppingBasket";
import { IconButton } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import { CartContext } from "../global/CartContext";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

export const Navbar = () => {
  const { totalQty } = useContext(CartContext);
  return (
    <div className="navbox">
      <div className="leftside">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="rightside">
        <Link to="/cartproducts" className="navlinks">
          <IconButton>
            <StyledBadge badgeContent={totalQty} color="secondary">
              <BasketIcon />
            </StyledBadge>
          </IconButton>
        </Link>
      </div>
    </div>
  );
};
