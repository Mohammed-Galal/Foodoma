import { createSlice } from "@reduxjs/toolkit";

const Store = { name: "restaurant", initialState: { loaded: false, data: {} } },
  reducers = (Store.reducers = {});

reducers.init = function (state, action) {
  state.loaded = true;
  state.data = action.payload;
};

// Action creators are generated for each case reducer function
export default createSlice(Store).reducer;
