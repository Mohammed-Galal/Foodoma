import { createSlice } from "@reduxjs/toolkit";

const Store = {
    name: "settings",
    initialState: { loaded: false, data: null },
  },
  reducers = (Store.reducers = {});

reducers.init = function (state, action) {
  const obj = {};

  state.loaded = true;
  action.payload.forEach(({ key, value }) => (obj[key] = value));
  state.data = obj;
};

// Action creators are generated for each case reducer function
export default createSlice(Store).reducer;
