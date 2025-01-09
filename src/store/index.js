/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";

import Products from "./products.js";
import User from "./user.js";
import Restaurant from "./restaurant.js";

const APP_STATE = configureStore({ reducer: { Products, User, Restaurant } }),
  fetchOpts = {
    method: "POST",
    get headers() {
      const obj = { "Content-Type": "application/json" },
        token = window.localStorage.getItem("token");
      token && (obj["Authorization"] = token);
      return obj;
    },
  };
export default APP_STATE;

const savedRes = window.localStorage.getItem("restaurant"),
  baseUrl = "https://mon10.amir-adel.com/public/api";

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
if (savedRes) {
  const resData = JSON.parse(savedRes);

  APP_STATE.dispatch({
    type: "restaurant/init",
    payload: resData,
  });

  fetch(baseUrl + "/get-restaurant-items/" + resData.slug, fetchOpts)
    .then(toJson)
    .then((data) =>
      APP_STATE.dispatch({ type: "products/init", payload: data })
    );
}

// fetch(baseUrl + "/get-delivery-restaurants", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({}),
// })
//   .then((res) => res.json())
//   .then((data) => {
//     APP_STATE.dispatch({
//       type: "restaurant/init",
//       payload: data[0],
//     });

//     fetch(baseUrl + "/get-restaurant-items/" + data[0].slug, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({}),
//     })
//       .then((D) => D.json())
//       .then((products) => {
//         APP_STATE.dispatch({
//           type: "products/init",
//           payload: products.items,
//         });
//       })
//       .catch(console.log);
//   });
