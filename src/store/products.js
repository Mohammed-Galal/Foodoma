import { createSlice } from "@reduxjs/toolkit";

const cartStorage = JSON.parse(window.localStorage.getItem("cartItems")) || {};
const cartMsg =
  "لا يمكن اضافة الطلب المخصص الى العربة بجانب الطلبات الأخرى، هل تريد إخلاء العربة؟";

const Products = {
    name: "products",
    initialState: {
      loaded: false,
      early_booking: [],
      custom: [],
      categories: [],
      data: [],
      cart: [],
      cashback: null,
      fav: [],
    },
  },
  reducers = (Products.reducers = {});

reducers.init = function (state, action) {
  const itemsObj = action.payload.items,
    customProducts = itemsObj["الطلبات الخاصة"] || [],
    earlyBooking = itemsObj["الحجز المبكر"] || [],
    items = [];

  delete itemsObj["الحجز المبكر"];
  delete itemsObj["الطلبات الخاصة"];

  const categories = Object.keys(itemsObj),
    slug = window.localStorage.getItem("slug"),
    cartItems = (cartStorage[slug] ||= []);

  categories.forEach((k) => items.push.apply(items, itemsObj[k]));

  state.loaded = true;
  state.data = items;
  state.categories = categories;
  state.early_booking = earlyBooking;
  state.custom = customProducts.filter((i) => i.is_active);
  state.cart = cartItems;
};

reducers.addSingleItemToCart = function (state, { item }) {
  const targetItem = state.cart.find((e) => e.id === item.id);

  if (targetItem) {
    targetItem.quantity++;
    state.cart = [...state.cart];
  } else {
    state.cart = [
      ...state.cart,
      {
        category_name: item.category_name,
        id: item.id,
        name: item.name,
        name_ar: item.name_ar,
        price: item.price,
        restaurant_id: item.restaurant_id,
        quantity: 1,
        addons: [],
        totalPrice: +item.price,
      },
    ];
  }

  window.localStorage.setItem("cartItems", JSON.stringify(cartStorage));
};

reducers.addToCart = function (state, { payload }) {
  const isCustomItem = state.cart.concat(payload).some((e) => !!e.customProps);

  if (state.cart.length && isCustomItem) {
    const proceedToClear = window.confirm(cartMsg);
    if (proceedToClear) state.cart = [];
    else return;
  }

  const cart = [...state.cart, payload];
  state.cart = cart;

  if (!isCustomItem) {
    const slug = window.localStorage.getItem("slug");
    cartStorage[slug] = cart;
    window.localStorage.setItem("cartItems", JSON.stringify(cartStorage));
  }
};

reducers.setCashback = function (state, { payload }) {
  state.cashback = payload;
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
