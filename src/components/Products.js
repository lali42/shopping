import React, { useState, useContext } from "react";
import { CartContext } from "../global/CartContext";
import { ProductsContext } from "../global/ProductsContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Lottie from "react-lottie";
import Loader from "../lotties/36605-shopping-cart.json";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Products = () => {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;

  const handleClick = (newState) => {
    setOpen(true);
    setState({ open: true, ...newState });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setState({ ...state });
  };

  const { products } = useContext(ProductsContext);
  // console.log(products);
  // const data = useContext(CartContext);
  // console.log(data);
  const { dispatch, totalQty } = useContext(CartContext);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {products.length !== 0 && <h1>Products</h1>}
      <div className="products-container">
        {products.length === 0 && (
          // <div>slow internet...no products to display</div>
          <div>
            <Lottie options={defaultOptions} height={600} width={600} />
          </div>
        )}
        {products.map((product) => (
          <div className="product-card" key={product.ID}>
            <div className="product-img">
              <img src={product.img} alt="not found" />
            </div>
            <div className="product-name" style={{ fontSize: 20 }}>
              {product.name}
            </div>
            <div className="product-desc">{product.desc}</div>
            <hr />
            <div className="product-price">{product.price} Bath</div>

            <button
              className="addcart-btn"
              onClick={() => {
                handleClick({ vertical: "top", horizontal: "center" });
                dispatch({
                  type: "add_to_cart",
                  id: product.ID,
                  product,
                  totalQty,
                });
              }}
            >
              ADD TO CART
            </button>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              autoHideDuration={1000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="success">
                This product add your cart
              </Alert>
            </Snackbar>
          </div>
        ))}
      </div>
    </>
  );
};
