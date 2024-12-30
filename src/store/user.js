import { createSlice } from "@reduxjs/toolkit";

const User = {
    name: "user",
    initialState: { loaded: false, data: {}, loc: {}, alerts: [] },
  },
  reducers = (User.reducers = {});

reducers.init = function (state, action) {
  state.loaded = true;
  state.data = action.payload;

  const token = action.payload.auth_token;
  window.localStorage.setItem("token", "Bearer " + token);
};

reducers.setLoc = function (state, action) {
  state.loc = action.payload;
};

reducers.setAlerts = function (state, action) {
  state.alerts = action.payload;
};

// Action creators are generated for each case reducer function
const Store = createSlice(User);
export default Store.reducer;
