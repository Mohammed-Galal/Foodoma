/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";

import Products from "./products.js";
import User from "./user.js";
import Restaurant from "./restaurant.js";

const APP_STATE = configureStore({ reducer: { Products, User, Restaurant } });
export default APP_STATE;

const baseUrl = "https://mon10.amir-adel.com/public/api",
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

const savedSlug = window.localStorage.getItem("slug");
if (savedSlug) {
  fetch(baseUrl + "/get-restaurant-info/" + savedSlug, fetchOpts)
    .then(toJson)
    .then((resData) => {
      APP_STATE.dispatch({ type: "restaurant/init", payload: resData });

      fetch(baseUrl + "/get-restaurant-items/" + savedSlug, fetchOpts)
        .then(toJson)
        .then((data) =>
          APP_STATE.dispatch({ type: "products/init", payload: data })
        );
    });
}
