/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import "./bootstrap.js";
import Products from "./products.js";
import User from "./user.js";
import Restaurant from "./restaurant.js";

const APP_STATE = configureStore({ reducer: { Products, User, Restaurant } });
export default APP_STATE;

const baseUrl = process.env.REACT_APP_API_URL + "/public/api",
  fetchOpts = {
    method: "POST",
    get headers() {
      const obj = { "Content-Type": "application/json" },
        token = window.localStorage.getItem("token");
      token && (obj["Authorization"] = token);
      return obj;
    },
  };

fetch(baseUrl + "/get-all-restaurant", fetchOpts)
  .then((res) => res.json())
  .then((data) =>
    APP_STATE.dispatch({
      type: "restaurant/INIT_BRANCHES",
      payload: data,
    })
  );

const savedSlug = window.localStorage.getItem("slug");

export const logout = function () {
    APP_STATE.dispatch({ type: "products/clearCart" });
    APP_STATE.dispatch({ type: "user/logout" });
  },
  getFavourites = function () {
    if (fetchOpts.headers.Authorization === undefined) return;

    fetch(baseUrl + "/get-favorite-items", fetchOpts)
      .then(toJson)
      .then((res) =>
        APP_STATE.dispatch({
          type: "products/initFavourites",
          payload: res,
        })
      );
  },
  getUserAlerts = function () {
    fetch(baseUrl + "/get-user-notifications", fetchOpts)
      .then(toJson)
      .then(
        (r) =>
          r.length && APP_STATE.dispatch({ type: "user/setAlerts", payload: r })
      )
      .catch(console.error);

    fetch(baseUrl + "/get-addresses", fetchOpts)
      .then(toJson)
      .then((r) => {
        APP_STATE.dispatch({ type: "user/setAddresses", payload: r });
        APP_STATE.dispatch({ type: "user/setActiveAddress" });
      })
      .catch(console.error);

    fetch(baseUrl + "/cash-back", fetchOpts)
      .then((r) => r.json())
      .then((res) => {
        const cashback = res.data.find((c) => c.title === "cart");
        if (!cashback) return;
        cashback.is_active &&
          APP_STATE.dispatch({
            type: "products/setCashback",
            payload: cashback,
          });
      })
      .catch(console.error);
  };

function toJson(res) {
  return res.json();
}

if (window.localStorage.getItem("token")) {
  fetch(baseUrl + "/update-user-info", fetchOpts)
    .then(toJson)
    .then((r) => {
      APP_STATE.dispatch({ type: "user/init", payload: r.data });
      getFavourites();
      getUserAlerts();
    });
}

if (savedSlug) {
  fetch(baseUrl + "/get-restaurant-info/" + savedSlug, fetchOpts)
    .then(toJson)
    .then((resData) => {
      APP_STATE.dispatch({ type: "restaurant/init", payload: resData });

      fetch(baseUrl + "/get-restaurant-items/" + savedSlug, fetchOpts)
        .then(toJson)
        .then((data) =>
          APP_STATE.dispatch({
            type: "products/init",
            payload: data,
          })
        );
    });
}
