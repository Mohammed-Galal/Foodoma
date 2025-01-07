/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import NewAddress from "../../NewAddress";
import { useStore } from "react-redux";

const emptyStr = "";

export default function () {
  const addresses = useStore().getState().User.addresses,
    addressItems = addresses.map(AddressItem);

  const [showNewAddress, setShowNewAddress] = useState(false),
    deActivate = () => setShowNewAddress(false);

  return (
    <div className="addresses d-flex flex-column gap-3">
      <span className="h5 m-0 title" style={{ color: "var(--primary)" }}>
        اختر عنوان التوصيل
      </span>

      <ul className="list-unstyled d-grid gap-3 m-0 p-0">
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
              <span
                className="h6 m-0"
                style={{ cssText: "color: var(--primary)" }}
              >
                موقعك الحالي
              </span>
            </div>

            <input type="radio" />
          </label>
        </li>

        {addressItems}
      </ul>

      <NewAddress isActive={showNewAddress} deActivate={deActivate} />

      <button
        className="btn mt-auto mx-auto px-5"
        onClick={() => setShowNewAddress(!showNewAddress)}
        style={{
          cssText:
            "background-color: var(--primary); color: #fff; border-radius: 24px; scale: 0.9; position: sticky; bottom: 72px;",
        }}
      >
        أضف عنوان جديد
      </button>
    </div>
  );
}

function AddressItem({ created_at, tag, house, address, landmark }) {
  address ||= emptyStr;
  house ||= emptyStr;
  landmark ||= emptyStr;

  return (
    <li key={created_at}>
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
          <span className="h6 m-0" style={{ cssText: "color: var(--primary)" }}>
            {tag}
          </span>
          {`${house}, ${address}, ${landmark}`}
        </div>

        <input type="radio" />
      </label>
    </li>
  );
}
