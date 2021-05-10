import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AddProducts } from "./components/AddProducts";
import { Home } from "./components/Home";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/addproducts" component={AddProducts} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
