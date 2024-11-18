import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { createPortal } from "react-dom";
import store from "../store";

import Bookings from "./Bookings";
import HomePage from "./Home";
import Product from "./Product";
import Cart from "./Cart";
import Design from "./Design";

import Header from "../Header";
import Nav from "../Nav";

const body = document.body;

const header = document.createElement("header"),
  nav = document.querySelector("nav");

const isMobileView = window.outerWidth < 576;

export default (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {createPortal(Header(isMobileView), header)}
        <Routes>
          <Route
            path="/products/:id"
            caseSensitive={true}
            Component={Product}
          />

          <Route
            path="/early-booking"
            caseSensitive={true}
            element={Bookings}
          />

          <Route
            path={"/design/:style"}
            caseSensitive={true}
            element={Design}
          />

          <Route path="/cart" Component={Cart} caseSensitive={true} />
          <Route path="*" element={HomePage} />
        </Routes>
        {createPortal(Nav(isMobileView), nav)}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

isMobileView && (body.id = "mobile");
body.prepend(header);
