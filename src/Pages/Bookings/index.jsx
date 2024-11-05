import { useState } from "react";
import categories from "../../shared/productItem";
import "./index.scss";

const targetItems = categories.is_new;

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

    <section
      id="book-products"
      className="align-items-stretch container d-grid justify-content-center"
    >
      {targetItems}
      {targetItems}
    </section>
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
