/* eslint-disable react-hooks/rules-of-hooks */
import getPage from "../../../../translation";
import { Link } from "react-router-dom";
import { useStore } from "react-redux";
import Power from "../../../../icons/Power";

const getText = getPage("settings");

export default function main() {
  const store = useStore();

  return (
    <>
      <ul
        id="mobile-menu"
        className="container d-grid gap-3 list-unstyled my-5 py-0"
        style={{
          fontSize: "smaller",
          textWrap: "nowrap",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <li style={{ maxHeight: "180px" }}>
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center h-100"
            to="/settings/addresses"
          >
            <img src="/assets/settings/address.png" alt="Icon" />
            {getText(24)}
          </Link>
        </li>

        <li style={{ maxHeight: "180px" }}>
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center h-100"
            to="/settings/history"
          >
            <img src="/assets/settings/delivery.png" alt="Icon" />
            {getText(25)}
          </Link>
        </li>

        <li style={{ maxHeight: "180px" }}>
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center h-100"
            to="/settings/fav"
          >
            <img src="/assets/settings/shop.png" alt="Icon" />
            {getText(26)}
          </Link>
        </li>

        <li style={{ maxHeight: "180px" }}>
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center h-100"
            to="/settings/wallet"
          >
            <img src="/assets/settings/wallet.png" alt="Icon" />
            {getText(27)}
          </Link>
        </li>

        <li style={{ maxHeight: "180px" }}>
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center h-100"
            to="/settings/account"
          >
            <img src="/assets/settings/gears.png" alt="Icon" />
            {getText(28)}
          </Link>
        </li>

        <li style={{ maxHeight: "180px" }}>
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center h-100"
            to="/about-us"
          >
            <img src="/assets/settings/address.png" alt="Icon" />
            {getText(29)}
          </Link>
        </li>
      </ul>

      <button type="button" className="btn container" onClick={logout}>
        {getText(30)} {Power}
      </button>
    </>
  );

  function logout() {
    store.dispatch({ type: "user/logout" });
  }
}
