/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";

import Products from "./products.js";
import User from "./user.js";
import Restaurant from "./restaurant.js";

const baseUrl = "https://mon10.doobagency.com/public/api";
const APP_STATE = configureStore({ reducer: { Products, User, Restaurant } });

export default APP_STATE;

fetch(baseUrl + "/get-delivery-restaurants", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({}),
})
  .then((res) => res.json())
  .then((data) => {
    APP_STATE.dispatch({
      type: "restaurant/init",
      payload: data,
    });

    fetch(baseUrl + "/get-restaurant-items/" + data[0].slug, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((D) => D.json())
      .then((products) => {
        APP_STATE.dispatch({
          type: "products/init",
          payload: products.items,
        });
      })
      .catch(console.log);
  });
