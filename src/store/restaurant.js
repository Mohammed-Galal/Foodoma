import { createSlice } from "@reduxjs/toolkit";

const Store = { name: "restaurant", initialState: {} },
  reducers = (Store.reducers = {});

reducers.init = function (state, action) {
  Object.assign(state, action.payload[0]);
};

// Action creators are generated for each case reducer function
export default createSlice(Store).reducer;
