import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AddProducts } from "./components/AddProducts";
import { Cart } from "./components/Cart";
import { Cashout } from "./components/Cashout";
import { Home } from "./components/Home";
import { CartContextProvider } from "./global/CartContext";
import { ProductsContextProvider } from "./global/ProductsContext";

export class App extends Component {
  render() {
    return (
      <ProductsContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/addproducts" component={AddProducts} />
              <Route path="/cartproducts" component={() => <Cart />} />
              <Route path="/cashout" component={()=> <Cashout/>}/>
            </Switch>
          </BrowserRouter>
        </CartContextProvider>
      </ProductsContextProvider>
    );
  }
}

export default App;
