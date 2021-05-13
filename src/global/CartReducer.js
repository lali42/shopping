export const CartReducer = (state, action) => {
  const { shoppingCart, totalPrice, totalQty, rebate } = state;
  let product;
  let index;
  let updatePrice;
  let updateRebate;
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
        updateRebate = rebate;
        return {
          shoppingCart: [product, ...shoppingCart],
          totalPrice: updatePrice,
          totalQty: updateQty,
          pricePromotion: updatePricePromotion,
          rebate: updateRebate,
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
      let test = shoppingCart[index].qty;
      let priceBerfore = test * product.price;
      // console.log("befroe", priceBerfore);

      if (test % 4 === 0) {
        console.log("test", test);
        let unit = test / 4;
        let pAfter = unit * product.price;
        console.log("After", pAfter);
        let after = priceBerfore - pAfter;
        updatePricePromotion = after;
        updateRebate = rebate + product.price;
        console.log("price", updatePricePromotion);
        return {
          shoppingCart: [...shoppingCart],
          pricePromotion: updatePricePromotion,
          totalPrice: updatePrice,
          totalQty: updateQty,
          rebate: updateRebate,
        };
      } else {
        return {
          shoppingCart: [...shoppingCart],
          totalPrice: updatePrice,
          totalQty: updateQty,
          pricePromotion: updatePrice,
          rebate: rebate,
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
        let testD = shoppingCart[index].qty;
        console.log("1:", testD);
        console.log("rebate:", rebate);
        let priceBerfore = testD * product.price;
        if (testD % 4 !== 0) {
          let unit = testD / 4;
          let pAfter = unit * product.price;
          let after = priceBerfore - pAfter;
          updatePricePromotion = after;
          let mod = testD % 4;
          console.log("mod", mod);
          if (mod === 3) {
            updateRebate = rebate - product.price;
            console.log("up", updateRebate);
            return {
              shoppingCart: [...shoppingCart],
              pricePromotion: updatePricePromotion,
              totalPrice: updatePrice,
              totalQty: updateQty,
              rebate: updateRebate,
            };
          } else {
            return {
              shoppingCart: [...shoppingCart],
              totalPrice: updatePrice,
              totalQty: updateQty,
              pricePromotion: updatePrice,
              rebate: rebate,
            };
          }
        } else {
          return {
            shoppingCart: [...shoppingCart],
            totalPrice: updatePrice,
            totalQty: updateQty,
            pricePromotion: updatePrice,
            rebate: rebate,
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
      console.log("Product",product);
      updateQty = totalQty - product.qty;
      updatePrice = totalPrice - product.qty * product.price;
      updateRebate = rebate - rebate;
      console.log(rebate);
      return {
        shoppingCart: [...filtered],
        totalPrice: updatePrice,
        totalQty: updateQty,
        rebate: updateRebate,
      };
    case "EMPTY":
      return {
        shoppingCart: [],
        totalPrice: 0,
        totalQty: 0,
        pricePromotion: 0,
        rebate: 0,
      };
      break;

    default:
      return state;
  }
};
