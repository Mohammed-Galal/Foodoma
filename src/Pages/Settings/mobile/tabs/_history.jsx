import { useLayoutEffect, useState } from "react";
import { useStore } from "react-redux";

/* eslint-disable import/no-anonymous-default-export */
const base = process.env.REACT_APP_API_URL;

let restaurantId,
  items = [];

export default function () {
  const store = useStore().getState(),
    [loaded, setLoaded] = useState(false);

  restaurantId = store.Restaurant.data.id;

  useLayoutEffect(getOrders, [loaded]);

  return (
    <div className="container history">
      <span className="d-block h3 mb-4">طلباتي</span>
      <ul className="d-flex gap-3 list-unstyled m-0 p-0">
        {/* {orderItem({
          date: "الاربعاء 1.نوفمر",
          price: 22.0,
          quantity: 12,
          isDelevered: true,
          rate: 4,
        })} */}
      </ul>
    </div>
  );

  function getOrders() {
    fetch(base + "/public/api/get-orders", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + store.User.data.auth_token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        items = r.data;
        setLoaded(true);
      });
  }
}

function orderItem({ id, date, price, quantity, isDelevered, rate }) {
  const stars = Array(5).fill((U, I) => (
    <img
      src={"/assets/home/icons/" + (I < rate ? "star" : "blank-star") + ".svg"}
      alt="star"
    />
  ));

  return (
    <li
      key={id}
      className="d-grid w-100"
      style={{
        cssText:
          "background-color: #fbfbfb; border-radius: 24px; overflow: hidden",
      }}
    >
      <div className="d-flex justify-content-between px-3 py-2">
        <p
          className="d-grid gap-2 m-0"
          style={{ cssText: "color: var(--midgray); font-weight: 600" }}
        >
          <span className="h3 m-0" style={{ cssText: "color: var(--primary)" }}>
            {date}
          </span>
          {price} ر.س/ {quantity} منتج
        </p>

        <button
          type="button"
          className="btn px-5 py-2"
          style={{
            cssText:
              "background-color: var(--primary);color: #fff;align-self: center;border-radius: 24px;scale: 0.8;",
          }}
        >
          اعادة طلب
        </button>
      </div>

      <div
        className="d-grid gap-2 px-3 py-2"
        style={{
          cssText:
            " grid-template-columns: repeat(5, 1fr); overflow: hidden; grid-auto-rows: 74px; justify-items: center;",
        }}
      >
        <img src="/assets/home/products/(0).png" alt="img" />
        <img src="/assets/home/products/(0).png" alt="img" />
        <img src="/assets/home/products/(0).png" alt="img" />
        <img src="/assets/home/products/(0).png" alt="img" />
        <img src="/assets/home/products/(0).png" alt="img" />
      </div>

      <div
        className="d-flex px-3 py-2"
        style={{
          cssText:
            "color: var(--midgray); background-color: #e4f4ff; font-size: 1.15rem;",
        }}
      >
        <span>{isDelevered ? "تم التوصيل" : "لم يتم التوصيل"}</span>
        {stars}
      </div>
    </li>
  );
}
