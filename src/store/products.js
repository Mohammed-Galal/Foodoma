import { createSlice } from "@reduxjs/toolkit";

const cartStorage = JSON.parse(window.localStorage.getItem("cartItems")) || {};

const Products = {
    name: "products",
    initialState: {
      loaded: false,
      categories: [],
      data: [],
      cart: [],
      fav: [],
    },
  },
  reducers = (Products.reducers = {});

reducers.init = function (state, action) {
  state.loaded = true;

  const itemsObj = action.payload.items,
    categories = Object.keys(itemsObj),
    items = [];

  const slug = window.localStorage.getItem("slug"),
    cartItems = (cartStorage[slug] ||= []);

  categories.forEach((k) => items.push.apply(items, itemsObj[k]));
  state.data = items;
  state.categories = categories;
  state.cart = cartItems;
};

reducers.addToCart = function (state, { payload }) {
  const cart = [...state.cart, payload];
  state.cart = cart;

  const slug = window.localStorage.getItem("slug");
  cartStorage[slug] = cart;
  window.localStorage.setItem("cartItems", JSON.stringify(cartStorage));
};

reducers.updateCartItem = function (state, { payload }) {
  const { index, quantity } = payload;
  if (quantity > 0) {
    const cartItem = state.cart[index];
    Object.assign(cartItem, {
      quantity,
      totalPrice:
        quantity * cartItem.price + calcAddonsPrice(cartItem.addons, quantity),
    });
    state.cart = [...state.cart];
  } else state.cart = state.cart.filter(($, i) => i !== index);

  const slug = window.localStorage.getItem("slug");
  cartStorage[slug] = state.cart;
  window.localStorage.setItem("cartItems", JSON.stringify(cartStorage));
};

reducers.initFavourites = function (state, { payload }) {
  state.fav = payload;
};

reducers.clearCart = function (s) {
  s.cart = [];
  const slug = window.localStorage.getItem("slug");
  cartStorage[slug] = s.cart;
  window.localStorage.setItem("cartItems", JSON.stringify(cartStorage));
};

const Store = createSlice(Products);
export const { addToFav, removeFromFav } = Store.actions;
export default Store.reducer;

function calcAddonsPrice(arr, quantity) {
  let index = 0,
    result = 0;
  while (index < arr.length) result += arr[index++].price;
  return result * quantity;
}
