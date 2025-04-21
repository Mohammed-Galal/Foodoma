/* eslint-disable import/no-anonymous-default-export */
import getText from "../../translation";
import { useState } from "react";
import { useSelector } from "react-redux";
import productItem from "../../shared/productItem";
import moment from "moment";
import "./index.scss";

const currLang = window.localStorage.getItem("lang") === "العربية";

export default function () {
  const { loaded, other } = useSelector((e) => e.Sliders),
    [update, setUpdate] = useState(true);

  if (!loaded) return null;

  const nameArg = currLang ? "name_ar" : "name";
  const descArg = currLang ? "description_ar" : "description";

  const now = new Date(),
    diff = moment(other.ex_data).diff(now),
    duration = moment.duration(diff),
    isExpired = diff <= 0;

  if (!isExpired) setTimeout(() => !isExpired && setUpdate(!update), 1000);

  return (
    <>
      <section id="book-banner">
        <div className="container align-items-stretch d-flex">
          <div className="align-items-center d-flex flex-column py-5">
            <span className="h1 my-5">{other[nameArg]}</span>

            <div className="text-center my-auto">
              {"ينتهي الحجز في"}
              <p className="d-grid my-4">
                <Timer duration={duration} isExpired={isExpired} />
                <span>{"دقيقة"}</span>:<span>{"ساعة"}</span>:
                <span>{"يوم"}</span>
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

function Timer({ duration, isExpired }) {
  let days = 0,
    hours = 0,
    minutes = 0;

  if (!isExpired) {
    days = duration.days();
    hours = duration.hours();
    minutes = duration.minutes();
  }

  return (
    <span className="align-items-baseline display-4 timer">
      <samp>{minutes}</samp>:<samp>{hours}</samp>:<samp>{days}</samp>
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
