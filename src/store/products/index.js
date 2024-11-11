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

reducers.addToCart = function (state, { id, quantity }) {
  console.log(arguments);
  state.data.forEach((p) => p.id === id && state.data.push({ id, quantity }));
};

reducers.filterBy = function ({ data }, { type }) {
  const iterator = data.values(),
    result = [];

  let currItem = iterator.next();
  while (!currItem.done) !!currItem.value[type] && result.push(currItem.value);

  return result;
};

const Store = createSlice(Products);
export const { init, filterBy, addToCart } = Store.actions;
export default Store.reducer;
