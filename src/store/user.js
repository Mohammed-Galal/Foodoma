import { createSlice } from "@reduxjs/toolkit";

const User = {
    name: "user",
    initialState: {
      activeAddressIndex: null,
      loaded: false,
      data: {},
      loc: {},
      alerts: [],
      addresses: [],
    },
  },
  reducers = (User.reducers = {});

reducers.init = function (state, action) {
  state.loaded = true;
  state.data = action.payload;

  const token = action.payload.auth_token;
  window.localStorage.setItem("token", "Bearer " + token);
};

reducers.logout = function (state) {
  state.loaded = false;
  state.data = {};
  state.loc = {};
  state.alerts = [];
  state.addresses = [];
  window.localStorage.removeItem("token");
  window.location.href = "/";
};

reducers.setLoc = function (state, action) {
  state.loc = action.payload;
};

reducers.setAlerts = function (state, action) {
  state.alerts = action.payload;
};

reducers.setAddresses = function (state, action) {
  state.addresses = action.payload;
};

reducers.setActiveAddress = function (state, action) {
  let activeAddressIndex = 0;

  if (state.addresses.length) {
    activeAddressIndex =
      action.payload === undefined
        ? window.localStorage.getItem("activeAddressIndex")
        : action.payload;
  }

  state.activeAddressIndex = activeAddressIndex;
  window.localStorage.setItem("activeAddressIndex", activeAddressIndex);
};

// Action creators are generated for each case reducer function
const Store = createSlice(User);
export default Store.reducer;
