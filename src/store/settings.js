import { createSlice } from "@reduxjs/toolkit";

const customCSS = document.createElement("style"),
  Store = {
    name: "settings",
    initialState: { loaded: false, data: null },
  },
  reducers = (Store.reducers = {});

document.head.appendChild(customCSS);

reducers.init = function (state, action) {
  const obj = {};
  state.loaded = true;
  action.payload.forEach(({ key, value }) => (obj[key] = value));
  customCSS.textContent = obj.customCSS;
  // console.log(obj);
  state.data = obj;
};

export default createSlice(Store).reducer;
