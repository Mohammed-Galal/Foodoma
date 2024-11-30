/* eslint-disable import/no-anonymous-default-export */
import { Link } from "react-router-dom";

export default function () {
  return (
    <div className="addresses">
      <span className="title">اختر عنوان التوصيل</span>

      <ul>
        {AddressItem({
          name: "موقعك الحالي",
          info: "شارع، حي، منطقة الرياض، السعودية",
        })}
      </ul>

      <Link type="button" className="btn">
        أضف عنوان جديد
      </Link>
    </div>
  );
}

function AddressItem({ name, info }) {
  return (
    <li>
      <label>
        <img src="/assets/settings/address.png" alt="Icon" />

        <div>
          <span>{name}</span>
          {info}
        </div>

        <input type="radio" />
      </label>
    </li>
  );
}

/**
 * <div class="addresses d-flex flex-column gap-3">
  <span class="h5 m-0 title">اختر عنوان التوصيل</span>
  <ul class="list-unstyled m-0 p-0">
    <li class="">
      <label
        class="align-items-center d-flex gap-2 p-2"
        style="
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #c7e0f2;
          cursor: pointer;
        "
        ><img src="/assets/settings/address.png" alt="Icon" />
        <div
          class="d-flex flex-column flex-grow-1 m-0"
          style="font-size: small; color: var(--midgray)"
        >
          <span class="h6" style="color: var(--primary)">موقعك الحالي</span
          >شارع، حي، منطقة الرياض، السعودية
        </div>
        <input type="radio"
      /></label>
    </li>
  </ul>
  <a
    type="button"
    class="btn mt-auto mx-auto px-5"
    href="/settings/addresses"
    style="
      background-color: var(--primary);
      color: #fff;
      border-radius: 24px;
      scale: 0.9;
      position: sticky;
      bottom: 72px;
    "
    >أضف عنوان جديد</a
  >
</div>

 */
