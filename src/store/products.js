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

reducers.addToFav = function (state, { payload }) {
  if (state.fav.indexOf(payload) > -1) return;
  state.fav.push(payload);
  state.fav = Object.assign([], state.fav);
};

reducers.removeFromFav = function (state, { payload }) {
  state.fav = state.fav.filter((e) => e.id !== payload.id);
};

const Store = createSlice(Products);
export const { addToFav, removeFromFav } = Store.actions;
export default Store.reducer;
