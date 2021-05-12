import React, { useState, useContext } from "react";
import { Navbar } from "./Navbar";
import { CartContext } from "../global/CartContext";
import { db } from "../config/Config";
import { useHistory } from "react-router-dom";
import Lottie from "react-lottie";
import Delivery from "../lotties/delivery-boy.json";
import TextField from "@material-ui/core/TextField";
import { Button, Card, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: "50%",
    background: "#686d76",
    display: "flex",
    justifyContent: "center",
  },
});

export const Cashout = () => {
  const classes = useStyles();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Delivery,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { totalPrice, totalQty, dispatch, rebate } = useContext(CartContext);

  const history = useHistory();

  const [name, setName] = useState("");
  const [cell, setCell] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const cashoutSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const time = date.getTime();
    const total = totalPrice - rebate
    db.collection("Buyer-info")
      .doc("_" + time)
      .set({
        BuyerName: name,
        BuyerCell: cell,
        BuyerAddress: address,
        BuyerPayment: total,
        BuyerQuantity: totalQty,
      })
      .then(() => {
        setCell("");
        setAddress("");
        dispatch({ type: "EMPTY" });
        setSuccessMsg(
          "Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds"
        );
        setTimeout(() => {
          history.push("/");
        }, 5000);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <>
      <Navbar />
      <div>
        <div style={{ marginTop: 100 + "px" }}>
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>
        <h1 className="center">Make an order</h1>
        {successMsg && (
          <div
            className="success-msg"
            style={{ color: "black", position: "fixed" }}
          >
            {successMsg}
          </div>
        )}

        <div className="center">
          <Card className="container">
            <form autoComplete="off" onSubmit={cashoutSubmit}>
              <h2 style={{ marginTop: 30 + "px" }}>Delivery details</h2>
              <TextField
                onChange={(e) => setName(e.target.value)}
                required
                value={name}
                type="text"
                htmlFor="name"
                label="Name"
                variant="outlined"
                className="textField"
                style={{ marginTop: 5 + "px" }}
              />

              <TextField
                required
                onChange={(e) => setCell(e.target.value)}
                value={cell}
                placeholder="xxx-xxx-xxxx"
                type="number"
                htmlFor="Cell No"
                label="Phone Number"
                className="textField"
                variant="outlined"
                style={{ marginTop: 30 }}
              />

              <TextField
                type="text"
                required
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                htmlFor="Delivery Address"
                label="Address"
                className="textField"
                variant="outlined"
                placeholder="Placeholder"
                multiline
                style={{ marginTop: 30 }}
              />

              <Grid>
                <Grid item xs></Grid>
              </Grid>

              <h2 style={{ marginTop: 30 + "px" }}>Amount to be pay</h2>

              <TextField
                type="number"
                required
                value={totalPrice - rebate}
                disabled
                htmlFor="Price To Pay"
                label="Price To Pay"
                className="textField"
                variant="outlined"
                style={{ marginTop: 5 + "px" }}
              />

              <TextField
                type="number"
                required
                value={totalQty}
                disabled
                htmlFor="Total No of Products"
                label="Total No of Products"
                className="textField"
                variant="outlined"
                style={{ marginTop: 30 }}
              />

              <h4 style={{ marginTop: 30, color: "black" }}>
                Redate : {rebate}
              </h4>
              <h4 style={{ color: "black" }}>VAT : 0.00%</h4>

              <Button
                fullWidth
                type="submit"
                className="btn-comfirm"
                style={{
                  marginTop: 15 + "px",
                  color: "#fff",
                  backgroundColor: "#ea5455",
                  height: 45 + "px",
                }}
                onClick={() => dispatch({ type: "EMPTY" })}
              >
                confirm
              </Button>
              <Link to="/cartproducts" className="cashout-link">
                <Button
                  fullWidth
                  style={{
                    marginTop: 15 + "px",
                    marginBottom: 15 + "px",
                    color: "#fff",
                    backgroundColor: "#2d4059",
                  }}
                >
                  back
                </Button>
              </Link>
            </form>

            {error && <span className="error-msg">{error}</span>}
          </Card>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};
