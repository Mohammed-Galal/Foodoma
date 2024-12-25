import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import isMobileView from "../shared/isMobile.js";
import store from "../store";

import User from "./User";
import Bookings from "./Bookings";
import HomePage from "./Home";
import Product from "./Product";
import Cart from "./Cart";
import Design from "./Design";
import Settings from "./Settings";
import Checkout from "./Checkout";
import Restaurant from "./Restaurant";

import Header from "../Header";
import Nav from "../Nav";

const body = document.body;

const header = document.createElement("header"),
  nav = document.querySelector("nav");

isMobileView && (body.id = "mobile");
body.prepend(header);

export default (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

function App() {
  const storeDefined = useSelector((e) => e.Restaurant).loaded;

  return !storeDefined ? (
    <Restaurant />
  ) : (
    <>
      {createPortal(Header(isMobileView), header)}
      <Routes>
        <Route path="/user/:action?" Component={User} />
        <Route path="/settings/:tab?" Component={Settings} />
        <Route path="/products/:id" caseSensitive={true} Component={Product} />
        <Route path="/early-booking" caseSensitive={true} element={Bookings} />
        <Route path={"/design/:style"} caseSensitive={true} element={Design} />
        <Route path="/cart" Component={Cart} caseSensitive={true} />
        <Route path="/checkout" element={Checkout} caseSensitive={true} />
        <Route path="/" element={HomePage} caseSensitive={true} />
      </Routes>
      {createPortal(Nav(isMobileView), nav)}
    </>
  );
}
