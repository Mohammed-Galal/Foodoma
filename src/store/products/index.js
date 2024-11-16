import { createSlice } from "@reduxjs/toolkit";
import data from "./data.json";

const Products = {
    name: "products",
    initialState: { loaded: false, data, cart: [] },
  },
  reducers = (Products.reducers = {});

reducers.init = function (state, action) {
  state.loaded = true;
  state.storeName = action.name;
  // state.data = action.products;
};

reducers.addToCart = function (state, { payload }) {
  const cart = state.cart,
    cartItem = cart.find((e) => e.id === payload.id);
  if (cartItem) cartItem.quantity = payload.quantity;
  else cart[cart.length] = payload;
  state.cart = Object.assign([], cart);
};

reducers.reduce_cart_item = function (state, { payload }) {
  const cartItem = state.cart.find((e) => e.id === payload.id);
  cartItem.quantity--;
  state.cart = state.cart.filter((e) => e.quantity !== 0);
};

reducers.remove_cart_item = function (state, { payload: id }) {
  const cart = state.cart.filter((e) => e.id !== id);
  state.cart = cart;
};

const Store = createSlice(Products);
// export const { init, log, addToCart } = Store.actions;
export default Store.reducer;
