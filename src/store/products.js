import { createSlice } from "@reduxjs/toolkit";

const Products = {
    name: "products",
    initialState: { loaded: false },
  },
  reducers = (Products.reducers = {});

reducers.init = function (state, action) {
  state.loaded = true;
  state.storeName = action.name;
  state.products = action.products;
};

const filterationKeys = {
  popular: "is_popular",
  recommended: "is_recommended",
  new: "is_new",
};

reducers.filterBy = function ({ products }, { type }) {
  const iterator = products.values(),
    result = [];

  type = filterationKeys[type];

  let currItem = iterator.next();
  while (!currItem.done) !!currItem.value[type] && result.push(currItem.value);

  return result;
};

const Store = createSlice(Products);
export const { increment, decrement, incrementByAmount } = Store.actions;
export default Store.reducer;
