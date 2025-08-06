import { createSlice } from "@reduxjs/toolkit";

const Store = {
    name: "sliders",
    initialState: { loaded: false, main: {}, other: {} },
  },
  reducers = (Store.reducers = {});

reducers.init = function (state, action) {
  state.loaded = true;
  state.main = action.payload.mainSlider;
  state.other = action.payload.otherSlide;
};

// Action creators are generated for each case reducer function
export default createSlice(Store).reducer;
