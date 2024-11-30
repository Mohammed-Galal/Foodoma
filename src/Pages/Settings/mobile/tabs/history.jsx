/* eslint-disable import/no-anonymous-default-export */
export default function () {
  return (
    <div className="history">
      <span>طلباتي</span>
      <ul>
        {orderItem({
          date: "الاربعاء 1.نوفمر",
          price: 22.0,
          quantity: 12,
          isDelevered: true,
          rate: 4,
        })}
      </ul>
    </div>
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

      <div>
        <img src="/assets/home/products/(0).png" alt="img" />
        <img src="/assets/home/products/(0).png" alt="img" />
        <img src="/assets/home/products/(0).png" alt="img" />
        <img src="/assets/home/products/(0).png" alt="img" />
        <img src="/assets/home/products/(0).png" alt="img" />
      </div>

      <div>
        <span>{isDelevered ? "تم التوصيل" : "لم يتم التوصيل"}</span>
        {stars}
      </div>
    </li>
  );
}

/**
 *
 <div class="container history">
  <span class="d-block h3 mb-4">طلباتي</span>
  <ul class="d-flex gap-3 list-unstyled m-0 p-0">
    <li
      class="d-grid w-100"
      style="background-color: #fbfbfb; border-radius: 24px; overflow: hidden"
    >
      <div class="d-flex justify-content-between px-3 py-2">
        <p
          class="d-grid gap-2 m-0"
          style="color: var(--midgray); font-weight: 600"
        >
          <span class="h3 m-0" style="color: var(--primary)"
            >الاربعاء 1.نوفمر</span
          >22 ر.س/ 12 منتج
        </p>
        <button
          type="button"
          class="btn px-5 py-2"
          style="
            background-color: var(--primary);
            color: #fff;
            align-self: center;
            border-radius: 24px;
            scale: 0.8;
          "
        >
          اعادة طلب
        </button>
      </div>
      <div
        class="d-grid gap-2 px-3 py-2"
        style="
          grid-template-columns: repeat(5, 1fr);
          overflow: hidden;
          grid-auto-rows: 74px;
          justify-items: center;
        "
      >
        <img
          src="/assets/home/products/(0).png"
          alt="img"
          class=""
          style=""
        /><img src="/assets/home/products/(0).png" alt="img" /><img
          src="/assets/home/products/(0).png"
          alt="img"
        /><img src="/assets/home/products/(0).png" alt="img" /><img
          src="/assets/home/products/(0).png"
          alt="img"
        />
      </div>
      <div
        class="d-flex px-3 py-2"
        style="
  color: var(--midgray););
  background-color: #e4f4ff;
  font-size: 1.15rem;
"
      >
        <span>تم التوصيل</span>
      </div>
    </li>
  </ul>
</div>

 */
