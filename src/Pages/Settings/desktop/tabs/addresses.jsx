/* eslint-disable import/no-anonymous-default-export */
import { Link } from "react-router-dom";

export default function () {
  return (
    <div className="addresses d-flex flex-column gap-3">
      <span className="h5 m-0 title" style={{ color: "var(--primary)" }}>
        اختر عنوان التوصيل
      </span>

      <ul className="list-unstyled m-0 p-0">
        {AddressItem({
          name: "موقعك الحالي",
          info: "شارع، حي، منطقة الرياض، السعودية",
        })}
      </ul>

      <Link
        className="btn mt-auto mx-auto px-5"
        style={{
          cssText:
            " background-color: var(--primary); color: #fff; border-radius: 24px; scale: 0.9; position: sticky; bottom: 72px;",
        }}
      >
        أضف عنوان جديد
      </Link>
    </div>
  );
}

function AddressItem({ name, info }) {
  return (
    <li>
      <label
        className="align-items-center d-flex gap-2 p-2"
        style={{
          cssText:
            " border-radius: 16px; overflow: hidden; border: 1px solid #c7e0f2; cursor: pointer;",
        }}
      >
        <img src="/assets/settings/address.png" alt="Icon" />

        <div
          className="d-flex flex-column flex-grow-1 m-0"
          style={{ cssText: "font-size: small; color: var(--midgray)" }}
        >
          <span className="h6" style={{ cssText: "color: var(--primary)" }}>
            {name}
          </span>
          {info}
        </div>

        <input type="radio" />
      </label>
    </li>
  );
}
