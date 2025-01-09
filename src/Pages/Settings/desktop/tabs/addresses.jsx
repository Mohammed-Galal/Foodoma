/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewAddress from "../../NewAddress";

const emptyStr = "";

let I;
export default function () {
  const { data, addresses } = useSelector((e) => e.User),
    token = data.auth_token,
    dispatch = useDispatch();

  const [showNewAddress, setShowNewAddress] = useState(false),
    deActivate = () => setShowNewAddress(false);

  const Addresses = [];
  I = 0;
  while (I < addresses.length)
    Addresses[I] = AddressItem(addresses[I++], dispatch, token);

  return (
    <div className="addresses d-flex flex-column gap-3">
      <span className="h5 m-0 title" style={{ color: "var(--primary)" }}>
        العناوين المسجلة
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
          </label>
        </li>

        {Addresses}
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

function AddressItem(
  { id, created_at, tag, house, address, landmark },
  dispatch,
  token
) {
  address ||= emptyStr;
  house ||= emptyStr;
  landmark ||= emptyStr;

  return (
    <li
      key={created_at}
      style={{
        cssText:
          " border-radius: 16px; overflow: hidden; border: 1px solid #c7e0f2; cursor: pointer;",
      }}
      className="px-2 d-flex justify-content-between align-items-center gap-2"
    >
      <label className="align-items-center d-flex gap-2 py-2">
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
      </label>
      <input
        type="button"
        onClick={removeAdrress}
        style={{ fontSize: "smaller" }}
        className="border-0 btn btn-outline-danger"
        value="حذف"
      />
    </li>
  );

  function removeAdrress() {
    fetch("https://mon10.amir-adel.com/public/api/delete-address", {
      method: "POST",
      body: JSON.stringify({ address_id: id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((e) => e.json())
      .then((r) => {
        console.log(r);

        dispatch({ type: "user/setAddresses", payload: r });
      });
  }
}
