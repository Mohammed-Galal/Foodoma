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
    <div id="addresses" className="container d-grid gap-4">
      <p
        style={{ cssText: "color: var(--primary); font-weight: 700" }}
        className="h4 m-0 title"
      >
        اختر عنوان التوصيل
      </p>

      <ul className="d-grid gap-3 list-unstyled m-0 p-0">{addressItems}</ul>

      <NewAddress isActive={showNewAddress} deActivate={deActivate} />

      <button
        type="button"
        onClick={() => setShowNewAddress(true)}
        className="btn mx-auto"
        style={{
          cssText:
            "background-color: var(--primary); color: #fff; border-radius: 24px; width: 70%;",
        }}
      >
        اضف عنوان جديد
      </button>
    </div>
  );
}

function AddressItem({ created_at, tag, house, address, landmark }) {
  address ||= emptyStr;
  house ||= emptyStr;
  landmark ||= emptyStr;

  return (
    <li
      key={created_at}
      style={{ cssText: "border: 2px solid #a8d0ec; border-radius: 24px" }}
    >
      <label className="align-items-center d-flex gap-2 h-100 justify-content-start p-3 w-100">
        <img src="/assets/settings/address.png" alt="icon" />

        <div
          className="d-grid gap-2"
          style={{ cssText: "color: var(--midgray); font-weight: 600" }}
        >
          <span
            style={{ cssText: "color: var(--primary); font-weight: bold" }}
            class="h5 m-0"
          >
            {tag}
          </span>
          {`${house}, ${address}, ${landmark}`}
        </div>

        <input type="radio" style={{ marginRight: "auto" }} />
      </label>
    </li>
  );
}
