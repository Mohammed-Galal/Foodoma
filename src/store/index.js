/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";

import Products from "./products/index.js";
import User from "./user.js";

// const reducer = combineReducers({ Products, User });
const APP_STATE = configureStore({ reducer: { Products, User } });

// const storeApi =
//   "https://food.doobagency.com/public/api/get-restaurant-items/h-alslam-jd-gHvBrHEMIoUN0jY";

// fetch(storeApi, {
//   method: "POST",
// });

// console.log(APP_STATE.getState());

// APP_STATE.dispatch(increment());

// console.log(APP_STATE.getState().Products);

export default APP_STATE;
