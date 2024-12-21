import { createSlice } from "@reduxjs/toolkit";

const User = { name: "user", initialState: { loaded: false, data: {} } },
  reducers = (User.reducers = {});

reducers.init = function (state, action) {
  state.loaded = true;
  state.data = action.payload;
};

// Action creators are generated for each case reducer function
const Store = createSlice(User);
export default Store.reducer;
