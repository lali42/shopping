import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BasketIcon from "@material-ui/icons/ShoppingBasket";
import { IconButton } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import { CartContext } from "../global/CartContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Navbar = () => {
  const { totalQty } = useContext(CartContext);
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className="bgBar">
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className="navlinks">
              Games Market
            </Link>
          </Typography>
          <Link to="/cartproducts">
            <IconButton>
              <StyledBadge badgeContent={totalQty} color="secondary">
                <BasketIcon className="badge" />
              </StyledBadge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
