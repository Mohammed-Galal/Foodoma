import { useState } from "react";
import { useStore } from "react-redux";
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
          <span className="h1 my-5">كيكات اليوم الوطني السعودي</span>
          <div className="text-center">
            ينتهي الحجز في
            <p className="d-grid my-4">
              <Timer />
              <span>دقيقة</span>:<span>ساعة</span>:<span>يوم</span>
            </p>
            خصم 15% على الحجز المبكر لكيكات اليوم الوطني
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
  const targetItems = useStore()
    .getState()
    .Products.data.filter((e) => !!e.is_new)
    .map(productItem);

  return (
    <section
      id="book-products"
      className="align-items-stretch px-2 mx-auto d-flex flex-wrap "
    >
      <p className="h2 mb-1">منتجات ذات صلة</p>
      {targetItems}
      {targetItems}
    </section>
  );
}
