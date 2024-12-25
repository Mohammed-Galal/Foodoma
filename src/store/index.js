/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";

import Products from "./products.js";
import User from "./user.js";
import Restaurant from "./restaurant.js";

const fetchOpts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  },
  APP_STATE = configureStore({ reducer: { Products, User, Restaurant } });

export default APP_STATE;

const baseUrl = "https://mon10.doobagency.com/public/api";

fetch(baseUrl + "/get-all-restaurant", fetchOpts)
  .then((res) => res.json())
  .then((data) =>
    APP_STATE.dispatch({
      type: "restaurant/INIT_BRANCHES",
      payload: data,
    })
  );

export const getFavourites = function () {
  fetch(baseUrl + "/get-favorite-items", fetchOpts)
    .then((res) => res.json())
    .then((res) =>
      APP_STATE.dispatch({
        type: "products/initFavourites",
        payload: res,
      })
    );
};

getFavourites();

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
