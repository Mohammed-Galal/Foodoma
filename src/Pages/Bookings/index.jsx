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
    exDate = new Date(other.ex_data),
    isExpired = now > exDate;

  const nameArg = currLang ? "name_ar" : "name";
  const descArg = currLang ? "description_ar" : "description";

  return (
    <>
      <section id="book-banner">
        <div className="container align-items-stretch d-flex">
          <div className="align-items-center d-flex flex-column py-5">
            <span className="h1 my-5">{other[nameArg]}</span>

            <div className="text-center my-auto">
              {"ينتهي الحجز في"}
              <p className="d-grid my-4">
                <Timer expireDate={exDate} isExpired={isExpired} />
                <span>{"يوم"}</span>:<span>{"ساعة"}</span>:
                <span>{"دقيقة"}</span>
              </p>

              {other[descArg]}
            </div>
          </div>

          <img className="mx-auto" src={other.image} alt="book-banner" />
        </div>
      </section>

      {isExpired || <BookProducts />}
    </>
  );
}

function Timer({ expireDate, isExpired }) {
  const [update, setUpdate] = useState(true);

  let days = 0,
    hours = 0,
    minutes = 0;

  if (!isExpired) {
    const now = new Date().getTime();
    let diff = expireDate - now;

    days = Math.floor(diff / daysInMs);
    diff -= days * daysInMs;

    hours = diff / hoursInMs;
    diff -= days * hoursInMs;

    minutes = diff / minsInMs;

    setTimeout(() => now < expireDate && setUpdate(!update), 1000);
  }

  return (
    <span className="align-items-baseline display-4 timer">
      <samp>{Math.max(0, Math.floor(minutes % 60))}</samp>:
      <samp>{Math.max(0, Math.floor(hours % 60))}</samp>:
      <samp>{Math.max(0, days)}</samp>
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
      <p className="h4">{"منتجات ذات صلة"}</p>
      {targetItems}
    </section>
  );
}
