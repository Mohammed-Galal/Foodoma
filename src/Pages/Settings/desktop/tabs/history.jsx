export default function () {
  return (
    <ul className="history">
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
    <li>
      <div>
        <p>
          <span>{date}</span>
          {price} ر.س/ {quantity} منتج
        </p>

        <button type="button">اعادة طلب</button>
      </div>

      <img src="/assets/home/products/(0).png" alt="img" />

      <div>
        <span>{isDelevered ? "تم التوصيل" : "لم يتم التوصيل"}</span>
        {stars}
      </div>
    </li>
  );
}
/**
 *<ul class="d-flex flex-column gap-3 history list-unstyled m-0 p-0">
  <li
    style="background-color: #fbfbfb; border-radius: 16px; overflow: hidden"
    class="d-flex flex-column"
  >
    <div class="align-items-center d-flex justify-content-between px-3 py-2">
      <p
        class="d-flex flex-column m-0"
        style="color: var(--midgray); font-size: smaller"
      >
        <span class="h6 m-0 mb-1">الاربعاء 1.نوفمر</span>22 ر.س/ 12 منتج
      </p>
      <button
        type="button"
        class="btn px-4"
        style="
          background-color: var(--primary);
          border-radius: 24px;
          color: #fff;
          scale: 0.9;
        "
      >
        اعادة طلب
      </button>
    </div>
    <img
      src="/assets/home/products/(0).png"
      alt="img"
      style="max-height: 72px; align-self: flex-start"
    />
    <div
      class="px-3 py-2"
      style="color: var(--midgray); background-color: #e6f0f7"
    >
      <span>تم التوصيل</span>
    </div>
  </li>
</ul>

 */
