import { createSlice } from "@reduxjs/toolkit";

const User = { name: "user", initialState: { loaded: false } },
  reducers = (User.reducers = {});

reducers.init = login;

// Action creators are generated for each case reducer function
const Store = createSlice(User);
export const { increment, decrement, incrementByAmount } = Store.actions;
export default Store.reducer;

function login(state) {}
