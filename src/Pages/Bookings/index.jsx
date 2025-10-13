/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import { useSelector } from "react-redux";
import productItem from "../../shared/productItem";
import moment from "moment";
import "./index.scss";
import getPage from "../../translation";

const getText = getPage("bookings"),
  currLang = window.localStorage.getItem("lang") === "العربية";

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
              {getText(0)}
              <p className="d-grid my-4">
                <Timer duration={duration} isExpired={isExpired} />
                <span>{getText(1)}</span>:<span>{getText(2)}</span>:
                <span>{getText(3)}</span>
              </p>

              <span dangerouslySetInnerHTML={{ __html: other[descArg] }}></span>
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
      {targetItems}
    </section>
  );
}
