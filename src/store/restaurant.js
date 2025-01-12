import { createSlice } from "@reduxjs/toolkit";

const savedRes = window.localStorage.getItem("restaurant"),
  existed = !!savedRes,
  data = existed ? JSON.parse(savedRes) : {},
  Store = {
    name: "restaurant",
    initialState: { loaded: existed, data, branches: [] },
  },
  reducers = (Store.reducers = {});

reducers.init = function (state, action) {
  state.loaded = true;
  action.payload.delivery_charges ||= 0;
  state.data = action.payload;
  window.localStorage.setItem("restaurant", JSON.stringify(action.payload));
};

reducers.INIT_BRANCHES = function (state, action) {
  state.branches = action.payload;
};

// Action creators are generated for each case reducer function
export default createSlice(Store).reducer;
