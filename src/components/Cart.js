import React, { useContext } from "react";
import { CartContext } from "../global/CartContext";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import Lottie from "react-lottie";
import Error from "../lotties/shopping-bag-error.json";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Footer } from "./Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "auto",
  },
}));

export const Cart = () => {
  // const data = useContext(CartContext);
  // console.log(data);
  const { shoppingCart, dispatch, totalPrice, totalQty, rebate } =
    useContext(CartContext);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Error,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Navbar />
      <>
        {shoppingCart.length !== 0 && (
          <h1 style={{ marginTop: 60 + "px" }}>All orders</h1>
        )}
        <div className="cart-container">
          {shoppingCart.length === 0 && (
            <div>
              <div>
                <Lottie
                  options={defaultOptions}
                  height={600}
                  width={600}
                  style={{ marginTop: 120 + "px" }}
                />
                <p>
                  no items in your cart or slow internet causing trouble
                  (Refresh the page) or you are not logged in
                </p>
                <Link
                  to="/"
                  style={{ color: "#f05454", textDecoration: "none" }}
                >
                  Return to Home page
                </Link>
              </div>
            </div>
          )}
          <Grid container spacing={3}>
            <Grid item xs={9}>
              {shoppingCart &&
                shoppingCart.map((cart) => (
                  <div className="cart-card cart-list" key={cart.ID}>
                    <div className="cart-img">
                      <img
                        src={cart.img}
                        alt="not found"
                        style={{ borderRadius: "5px" }}
                      />
                    </div>

                    <div className="cart-name">{cart.name}</div>

                    <div className="cart-price-orignal">THB {cart.price}</div>

                    <div
                      className="inc"
                      onClick={() =>
                        dispatch({ type: "INC", id: cart.ID, cart,rebate })
                      }
                    >
                      <AddIcon size={50} />
                    </div>

                    <div className="quantity">{cart.qty}</div>

                    <div
                      className="dec"
                      onClick={() =>
                        dispatch({ type: "DEC", id: cart.ID, cart,rebate })
                      }
                    >
                      <RemoveIcon size={50} />
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        dispatch({ type: "DELETE", id: cart.ID, cart,rebate })
                      }
                    >
                      <DeleteIcon size={50} />
                    </button>
                  </div>
                ))}
            </Grid>
            <Grid item xs={3}>
              {shoppingCart.length > 0 && (
                <div className="cart-summary">
                  <div className="cart-summary-heading">Total payment</div>
                  <div className="cart-summary-price">
                    <span>Price</span>
                    <span>{totalPrice}</span>
                  </div>
                  <div className="cart-summary-price">
                    <span>Total Qty</span>
                    <span>{totalQty}</span>
                  </div>
                  <div className="cart-summary-price">
                    <span>Rebate</span>
                    <span>{rebate}</span>
                  </div>
                  <div className="cart-summary-price">
                    <span>Total Price</span>
                    <span>{totalPrice-rebate}</span>
                  </div>
                  <Grid>
                    <Grid item xs className="cart-padding">
                      <Link to="cashout" className="cashout-link">
                        <Button
                          fullWidth
                          style={{
                            marginTop: 5 + "px",
                            color: "#fff",
                            backgroundColor: "#ea5455",
                          }}
                        >
                          Cash on delivery
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item xs className="cart-padding">
                      <Link to="/" className="cashout-link">
                        <Button
                          fullWidth
                          style={{
                            marginTop: 5 + "px",
                            color: "#fff",
                            backgroundColor: "#2d4059",
                          }}
                        >
                          Cancle
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      </>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
