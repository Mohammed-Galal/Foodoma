import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { createPortal } from "react-dom";
import isMobileView from "../shared/isMobile.js";
import store from "../store";

import About from "./About.jsx";
import Alerts from "./Alerts";
import All_Products from "./All_Products.jsx";
import Bookings from "./Bookings";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Design from "./Design/index.jsx";
import FAQs from "./FAQs/index.jsx";
import HomePage from "./Home";
import Invoice from "./Invoice.jsx";
import Product from "./Product";
import Restaurant from "./Restaurant";
import Settings from "./Settings";
import User from "./User";

import Header from "../Header";
import Nav from "../Nav";
import Footer from "../Footer.jsx";

const body = document.body,
  header = document.createElement("header"),
  nav = document.querySelector("nav"),
  footer = document.querySelector("body > footer");

isMobileView && (body.id = "mobile");
body.prepend(header);

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

export default (
  <React.StrictMode>
    <div
      id="wrong-credentials"
      popover="auto"
      className="px-5 py-4 text-danger"
      style={{
        borderRadius: "8px",
        borderColor: "#f0f8ff",
        background: "#fff",
        animation: "reveal 1s ease",
        boxShadow: "rgb(0, 0, 0, 0.2) 2px 2px 8px 0px",
      }}
    >
      {"يرجى التحقق من البيانات الطلوبة"}
    </div>

    <div
      id="used-account"
      popover="auto"
      className="px-5 py-4 text-danger"
      style={{
        borderRadius: "8px",
        borderColor: "#f0f8ff",
        background: "#fff",
        animation: "reveal 1s ease",
        boxShadow: "rgb(0, 0, 0, 0.2) 2px 2px 8px 0px",
      }}
    >
      {"هذا الحساب مسجل بالفعل"}
    </div>

    <BrowserRouter>
      <Provider store={store}>
        <App />
        {createPortal(Footer, footer)}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

function App() {
  const storeDefined = window.localStorage.getItem("slug");
  const location = useLocation(),
    showPopup = !storeDefined && location.pathname !== "/restaurant";

  useEffect(() => {
    window.scrollTo(0, 0);
    // Add your custom event logic here
    body.style.overflow = showPopup ? "hidden" : "auto";
  }, [location]);

  return (
    <>
      {createPortal(Header(isMobileView), header)}
      {showPopup && (
        <>
          <Restaurant isPopup={true} />
          <div className="dismisser"></div>
        </>
      )}

      <Routes>
        <Route path="/faq" Component={FAQs} />
        <Route path="/restaurant" Component={Restaurant} caseSensitive={true} />
        <Route path="/about-us" Component={About} caseSensitive={true} />
        <Route
          path="/all-products/:category?"
          Component={All_Products}
          caseSensitive={true}
        />
        <Route path="/invoice/:id?" Component={Invoice} caseSensitive={true} />
        <Route path="/alerts" Component={Alerts} caseSensitive={true} />
        <Route path="/user/:action?" Component={User} />
        <Route path="/settings/:tab?" Component={Settings} />
        <Route path="/products/:id" caseSensitive={true} Component={Product} />
        <Route
          path="/early-booking"
          caseSensitive={true}
          Component={Bookings}
        />
        <Route
          path={"/design/:style?"}
          caseSensitive={true}
          Component={Design}
        />
        <Route path="/cart" Component={Cart} caseSensitive={true} />
        <Route path="/checkout" Component={Checkout} caseSensitive={true} />
        <Route path="*" Component={HomePage} />
      </Routes>
      {createPortal(Nav(isMobileView), nav)}
    </>
  );
}
