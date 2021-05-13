import React, { useContext } from "react";
import { CartContext } from "../global/CartContext";
import { ProductsContext } from "../global/ProductsContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Lottie from "react-lottie";
import Loader from "../lotties/36605-shopping-cart.json";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Footer } from "./Footer";
import { Grid } from "@material-ui/core";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import P1 from "../images/1.jpg";
import P2 from "../images/2.jpg";
import P3 from "../images/3.jpg";

const useStyles = makeStyles({
  rootGrid: {
    flexGrow: 1,
    paddingLeft: 45,
    paddingRight: 45,
  },
  rootCard: {
    width: 275,
    maxHeight: 600,
    backgroundColor: "#313131",
    marginBottom: 30,
  },
  media: {
    maxWidth: "auto",
    maxHeight: "auto",
  },
});

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
  const { dispatch, totalQty,rebate } = useContext(CartContext);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const classes = useStyles();

  return (
    <>
      {products.length !== 0 && (
        <div>
          <div className="center">
            <Card className="card-slide">
              <Slide easing="ease">
                <div className="each-slide">
                  <div style={{ backgroundImage: `url(${P1})` }}></div>
                </div>
                <div className="each-slide">
                  <div style={{ backgroundImage: `url(${P2})` }}></div>
                </div>
                <div className="each-slide">
                  <div style={{ backgroundImage: `url(${P3})` }}></div>
                </div>
              </Slide>
            </Card>
          </div>
          <h1 style={{ marginLeft: 100 + "px" }}>Games Store</h1>
        </div>
      )}
      <div>
        {products.length === 0 && (
          <div>
            <Lottie options={defaultOptions} height={600} width={600} />
          </div>
        )}
        <div className={classes.rootGrid}>
          <Grid container className="center">
            {products.map((product) => (
              <div key={product.ID}>
                <Grid item xs={6} sm={3}>
                  <div style={{ padding: 30 + "px" }}>
                    <Card className={classes.rootCard}>
                      <CardMedia
                        component="img"
                        image={product.img}
                        title={product.name}
                        className={classes.media}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          className="title-name"
                          component="h6"
                          align="left"
                        >
                          {product.name}
                        </Typography>
                        <Grid container>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              variant="body2"
                              component="p"
                              align="left"
                            >
                              {product.desc}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              variant="h6"
                              component="h6"
                              align="right"
                              style={{ color: "#f05454" }}
                            >
                              THB {product.price}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="large"
                          style={{ color: "#fff", backgroundColor: "#2d4059" }}
                          fullWidth
                          onClick={() => {
                            handleClick({
                              vertical: "bottom",
                              horizontal: "left",
                            });
                            dispatch({
                              type: "add_to_cart",
                              id: product.ID,
                              product,
                              totalQty,
                              rebate
                            });
                          }}
                        >
                          ADD TO CART
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                </Grid>
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  open={open}
                  autoHideDuration={1000}
                  onClose={handleClose}
                  message="This product add your cart"
                  className="snack"
                >
                  {/* <Alert onClose={handleClose} severity="success">
                    This product add your cart
                  </Alert> */}
                </Snackbar>
              </div>
            ))}
          </Grid>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
