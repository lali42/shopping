export const CartReducer = (state, action) => {
  const { shoppingCart, totalPrice, totalQty } = state;
  let product;
  let index;
  let updatePrice;
  let updateQty;
  switch (action.type) {
    case "add_to_cart":
      const check = shoppingCart.find((product) => product.ID === action.id);
      if (check) {
        // console.log("Product is already in your cart.");
        return state;
      } else {
        product = action.product;
        product["qty"] = 1;
        product["TotalPrice"] = product.price * product.qty;
        updateQty = totalQty + 1;
        updatePrice = totalPrice + product.price;
        return {
          shoppingCart: [product, ...shoppingCart],
          totalPrice: updatePrice,
          totalQty: updateQty,
        };
      }
      break;

    case "INC":
      product = action.cart;
      product.qty = ++product.qty;
      product.TotalProductPrice = product.qty * product.price;
      updateQty = totalQty + 1;
      updatePrice = totalPrice + product.price;
      index = shoppingCart.findIndex((cart) => cart.ProductID === action.id);
      shoppingCart[index] = product;

      return {
        shoppingCart: [...shoppingCart],
        totalPrice: updatePrice,
        totalQty: updateQty,
      };

      break;

    case "DEC":
      product = action.cart;
      if (product.qty > 1) {
        product.qty = product.qty - 1;
        product.TotalProductPrice = product.qty * product.price;
        updatePrice = totalPrice - product.price;
        updateQty = totalQty - 1;
        index = shoppingCart.findIndex((cart) => cart.ID === action.id);
        shoppingCart[index] = product;
        return {
          shoppingCart: [...shoppingCart],
          totalPrice: updatePrice,
          totalQty: updateQty,
        };
      } else {
        return state;
      }
      break;

    case "DELETE":
      const filtered = shoppingCart.filter(
        (product) => product.ID !== action.id
      );
      product = action.cart;
      updateQty = totalQty - product.qty;
      updatePrice = totalPrice - product.qty * product.price;
      return {
        shoppingCart: [...filtered],
        totalPrice: updatePrice,
        totalQty: updateQty,
      };
    case "EMPTY":
      return {
        shoppingCart: [],
        totalPrice: 0,
        totalQty: 0,
      };
      break;

    default:
      return state;
  }
};
