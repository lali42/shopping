export const CartReducer = (state, action) => {
  const { shoppingCart, totalPrice, totalQty, pricePromotion } = state;
  let product;
  let index;
  let updatePrice;
  let updateQty;
  let updatePricePromotion;
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
        updatePricePromotion = updatePrice;
        return {
          shoppingCart: [product, ...shoppingCart],
          totalPrice: updatePrice,
          totalQty: updateQty,
          pricePromotion: updatePricePromotion,
        };
      }
      break;

    case "INC":
      product = action.cart;
      product.qty = ++product.qty;
      product.TotalProductPrice = product.qty * product.price;
      updateQty = totalQty + 1;
      updatePrice = totalPrice + product.price;
      updatePricePromotion = updatePrice + updatePricePromotion;
      index = shoppingCart.findIndex((cart) => cart.ProductID === action.id);
      shoppingCart[index] = product;
      const test = shoppingCart[index].qty;
      let priceBerfore = test * product.price;
      // console.log("befroe", priceBerfore);

      if (test % 4 === 0) {
        console.log("test", test);
        let unit = test / 4;
        let priceAfter = unit * product.price;
        // console.log("After", priceAfter);
        let after = priceBerfore - priceAfter;
        updatePricePromotion = after;
        console.log("price", updatePricePromotion);
        return {
          shoppingCart: [...shoppingCart],
          pricePromotion: updatePricePromotion,
          totalPrice: updatePrice,
          totalQty: updateQty,
        };
      } else {
        return {
          shoppingCart: [...shoppingCart],
          totalPrice: updatePrice,
          totalQty: updateQty,
          pricePromotion: updatePrice,
        };
      }
      break;

    case "DEC":
      product = action.cart;
      if (product.qty > 1) {
        product.qty = product.qty - 1;
        product.TotalProductPrice = product.qty * product.price;
        updatePrice = totalPrice - product.price;
        updateQty = totalQty - 1;
        updatePricePromotion = updatePrice + updatePricePromotion;
        index = shoppingCart.findIndex((cart) => cart.ID === action.id);
        shoppingCart[index] = product;
        const test = shoppingCart[index].qty;
        let priceBerfore = test * product.price;
        if (test % 4 === 0) {
          console.log("test", test);
          let unit = test / 4;
          let priceAfter = unit * product.price;
          // console.log("After", priceAfter);
          let after = priceBerfore - priceAfter;
          updatePricePromotion = after;
          console.log("price", updatePricePromotion);
          return {
            shoppingCart: [...shoppingCart],
            pricePromotion: updatePricePromotion,
            totalPrice: updatePrice,
            totalQty: updateQty,
          };
        } else {
          return {
            shoppingCart: [...shoppingCart],
            totalPrice: updatePrice,
            totalQty: updateQty,
            pricePromotion: updatePrice,
          };
        }
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
