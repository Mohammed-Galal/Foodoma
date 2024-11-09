import { createSlice } from "@reduxjs/toolkit";
import data from "./data.json";

const Products = {
    name: "products",
    initialState: { loaded: false, data },
  },
  reducers = (Products.reducers = {});

reducers.init = function (state, action) {
  state.loaded = true;
  state.storeName = action.name;
  state.products = action.products;
};

reducers.filterBy = function ({ products }, { type }) {
  const iterator = products.values(),
    result = [];

  let currItem = iterator.next();
  while (!currItem.done) !!currItem.value[type] && result.push(currItem.value);

  return result;
};

const Store = createSlice(Products);
export const { init, filterBy } = Store.actions;
export default Store.reducer;
