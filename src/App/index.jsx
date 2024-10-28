import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { createPortal } from "react-dom";
import store from "../store";

import HomePage from "./Home";

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
          <Route path="*" Component={HomePage} />
        </Routes>
        {createPortal(Nav(isMobileView), nav)}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

isMobileView && (body.id = "mobile");
body.prepend(header);
