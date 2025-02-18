import getText from "../../translation";
import { useState } from "react";
import { useSelector, useStore } from "react-redux";
import productItem from "../../shared/productItem";
import "./index.scss";

const expireDate = new Date();
// setting Fixed Time (currTime(ms) + expireTime(ms))
expireDate.setTime(expireDate.getTime() + 172800000);

export default (
  <>
    <section id="book-banner">
      <div className="container align-items-stretch d-flex">
        <div className="align-items-center d-flex flex-column py-5">
          <span className="h1 my-5">{getText("bookings", 0)}</span>
          <div className="text-center">
            {getText("bookings", 1)}
            <p className="d-grid my-4">
              <Timer />
              <span>{getText("bookings", 4)}</span>:
              <span>{getText("bookings", 3)}</span>:
              <span>{getText("bookings", 2)}</span>
            </p>
            {getText("bookings", 5)}
          </div>
        </div>

        <img
          className="mx-auto"
          src="/assets/home/banner/(1).png"
          alt="book-banner"
        />
      </div>
    </section>

    <BookProducts />
  </>
);

function Timer() {
  const [update, setUpdate] = useState(true);

  const now = new Date().getTime(),
    seconds = (expireDate - now) / 1000,
    minutes = seconds / 60,
    houres = minutes / 60;

  setTimeout(() => setUpdate(!update), 1000);

  return (
    <span className="align-items-baseline display-4 timer">
      <samp>{Math.floor(seconds % 60)}</samp>:
      <samp>{Math.floor(minutes % 60)}</samp>:
      <samp>{Math.floor(houres % 24)}</samp>
    </span>
  );
}

function BookProducts() {
  const targetItems = useSelector((e) => e.Products).early_booking.map(
    productItem
  );

  return (
    <section
      id="book-products"
      className="container align-items-stretch px-2 mx-auto d-flex flex-wrap "
    >
      <p className="h4 mb-3">{getText("bookings", 6)}</p>
      {targetItems}
    </section>
  );
}
