import React, { useContext } from "react";
import { CartContext } from "../global/CartContext";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";

export const Cart = () => {
  const data = useContext(CartContext);
  // console.log(data);
  const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(
    CartContext
  );
  return (
    <>
      <Navbar />
      <>
        {shoppingCart.length !== 0 && <h1>Cart</h1>}
        <div className="cart-container">
          {shoppingCart.length === 0 && (
            <div>
              <div>
                no items in your cart or slow internet causing trouble (Refresh
                the page) or you are not logged in
              </div>
              <div>
                <Link to="/">Return to Home page</Link>
              </div>
            </div>
          )}
          {shoppingCart &&
            shoppingCart.map((cart) => (
              <div className="cart-card" key={cart.ID}>
                <div className="cart-img">
                  <img src={cart.img} alt="not found" />
                </div>

                <div className="cart-name">{cart.name}</div>

                <div className="cart-price-orignal">{cart.price} Bath</div>

                <div
                  className="inc"
                  onClick={() => dispatch({ type: "INC", id: cart.ID, cart })}
                >
                  <AddIcon size={24} />
                </div>

                <div className="quantity">{cart.qty}</div>

                <div
                  className="dec"
                  onClick={() => dispatch({ type: "DEC", id: cart.ID, cart })}
                >
                  <RemoveIcon size={24} />
                </div>

                <div className="cart-price">{cart.price} Bath</div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    dispatch({ type: "DELETE", id: cart.ID, cart })
                  }
                >
                  <DeleteIcon size={24} />
                </button>
              </div>
            ))}
          {shoppingCart.length > 0 && (
            <div className="cart-summary">
              <div className="cart-summary-heading">Cart-Summary</div>
              <div className="cart-summary-price">
                <span>Total Price</span>
                <span>{totalPrice}</span>
              </div>
              <div className="cart-summary-price">
                <span>Total Qty</span>
                <span>{totalQty}</span>
              </div>
              <Link to="cashout" className="cashout-link">
                <Button style={{ marginTop: 5 + "px" }}>
                  Cash on delivery
                </Button>
              </Link>
            </div>
          )}
        </div>
      </>
    </>
  );
};
