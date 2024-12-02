/* eslint-disable import/no-anonymous-default-export */
export default function () {
  return (
    <ul className="d-flex flex-column gap-3 history list-unstyled m-0 p-0">
      {orderItem({
        date: "الاربعاء 1.نوفمر",
        price: 22.0,
        quantity: 12,
        isDelevered: true,
        rate: 4,
      })}
    </ul>
  );
}

function orderItem({ date, price, quantity, isDelevered, rate }) {
  const stars = Array(5).fill((U, I) => (
    <img
      src={"/assets/home/icons/" + (I < rate ? "star" : "blank-star") + ".svg"}
      alt="star"
    />
  ));

  return (
    <li
      className="d-flex flex-column"
      style={{
        cssText:
          "background-color: #fbfbfb; border-radius: 16px; overflow: hidden",
      }}
    >
      <div className="align-items-center d-flex justify-content-between px-3 py-2">
        <p
          className="d-flex flex-column m-0"
          style={{ cssText: "color: var(--midgray); font-size: smaller" }}
        >
          <span className="h6 m-0 mb-1">{date}</span>
          {price} ر.س/ {quantity} منتج
        </p>

        <button
          type="button"
          className="btn px-4"
          style={{
            cssText:
              "background-color: var(--primary); border-radius: 24px; color: #fff; scale: 0.9;",
          }}
        >
          اعادة طلب
        </button>
      </div>

      <img
        src="/assets/home/products/(0).png"
        style={{ cssText: "max-height: 72px; align-self: flex-start" }}
        alt="img"
      />

      <div
        className="px-3 py-2"
        style={{ cssText: "color: var(--midgray); background-color: #e6f0f7" }}
      >
        <span>{isDelevered ? "تم التوصيل" : "لم يتم التوصيل"}</span>
        {stars}
      </div>
    </li>
  );
}
