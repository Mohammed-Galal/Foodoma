/* eslint-disable import/no-anonymous-default-export */
import getText from "../../translation";
import { useState } from "react";
import { useSelector } from "react-redux";
import productItem from "../../shared/productItem";
import "./index.scss";

// const expireDate = new Date();
// setting Fixed Time (currTime(ms) + expireTime(ms))
// expireDate.setTime(expireDate.getTime() + 172800000);

const currLang = window.localStorage.getItem("lang") === "العربية";

const daysInMs = 1000 * 60 * 60 * 24,
  hoursInMs = 1000 * 60 * 60,
  minsInMs = 60 * 1000;

export default function () {
  const { loaded, other } = useSelector((e) => e.Sliders);

  if (!loaded) return null;

  const now = new Date(),
    exDate = new Date(other.ex_data);

  const nameArg = currLang ? "name_ar" : "name";
  const descArg = currLang ? "description_ar" : "description";

  return (
    <>
      <section id="book-banner">
        <div className="container align-items-stretch d-flex">
          <div className="align-items-center d-flex flex-column py-5">
            <span className="h1 my-5">{other[nameArg]}</span>

            <div className="text-center my-auto">
              {now < exDate && (
                <>
                  {getText("bookings", 1)}
                  <p className="d-grid my-4">
                    <Timer expireDate={exDate} />
                    <span>{getText("bookings", 4)}</span>:
                    <span>{getText("bookings", 3)}</span>:
                    <span>{getText("bookings", 2)}</span>
                  </p>
                </>
              )}

              {other[descArg]}
            </div>
          </div>

          <img className="mx-auto" src={other.image} alt="book-banner" />
        </div>
      </section>

      <BookProducts />
    </>
  );
}

function Timer({ expireDate }) {
  const [update, setUpdate] = useState(true);

  const now = new Date().getTime();
  let diff = expireDate - now;

  const days = Math.floor(diff / daysInMs);
  diff -= days * daysInMs;

  const hours = diff / hoursInMs;
  diff -= days * hoursInMs;

  const minutes = diff / minsInMs;

  setTimeout(() => setUpdate(!update), 30000);

  return (
    <span className="align-items-baseline display-4 timer">
      <samp>{Math.max(0, Math.floor(minutes % 60))}</samp>:
      <samp>{Math.max(0, Math.floor(hours % 60))}</samp>:
      <samp>{Math.max(0, Math.floor(days))}</samp>
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
      className="container align-items-stretch px-2 mx-auto d-flex flex-wrap gap-3"
    >
      <p className="h4">{getText("bookings", 6)}</p>
      {targetItems}
    </section>
  );
}
