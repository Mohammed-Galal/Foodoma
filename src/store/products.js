import { createSlice } from "@reduxjs/toolkit";

const Products = {
    name: "products",
    initialState: { loaded: false, data: [], cart: [], fav: [] },
  },
  reducers = (Products.reducers = {});

reducers.init = function (state, action) {
  state.loaded = true;
  const itemsObj = action.payload,
    items = [];
  Object.keys(itemsObj).forEach((k) => items.push.apply(items, itemsObj[k]));
  state.data = items;
};

reducers.addToCart = function (state, { payload }) {
  const cart = [...state.cart, payload];
  state.cart = cart;
};

reducers.updateCartItem = function (state, { payload }) {
  const { index, quantity } = payload;
  if (quantity > 0) {
    const cartItem = state.cart[index];
    Object.assign(cartItem, {
      quantity,
      totalPrice: quantity * cartItem.price + calcAddonsPrice(cartItem.addons),
    });
    state.cart = [...state.cart];
  } else state.cart = state.cart.filter(($, i) => i !== index);
};

reducers.initFavourites = function (state, { payload }) {
  state.fav = payload;
};

reducers.clearCart = function (s) {
  s.cart = [];
};

const Store = createSlice(Products);
export const { addToFav, removeFromFav } = Store.actions;
export default Store.reducer;

function calcAddonsPrice(arr) {
  let index = 0,
    result = 0;
  while (index < arr.length) result += +arr[index++].price;
  return result;
}
