import React, { createContext } from "react";
import { db } from "../config/Config.js";

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    const prevProducts = this.state.products;
    db.collection("products").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((changes) => {
        if (changes.type === "added") {
          prevProducts.push({
            ID: changes.doc.id,
            name: changes.doc.data().name,
            desc: changes.doc.data().desc,
            price: changes.doc.data().price,
            img: changes.doc.data().img,
          });
        }
        this.setState({
          products: prevProducts,
        });
      });
    });
  }

  render() {
    return (
      <ProductsContext.Provider value={{ products: [...this.state.products] }}>
        {this.props.children}
      </ProductsContext.Provider>
    );
  }
}
