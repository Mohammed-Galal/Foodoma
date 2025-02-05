/* eslint-disable react-hooks/rules-of-hooks */
import getText from "../../../../translation";
import { Link } from "react-router-dom";
import { useStore } from "react-redux";
import Power from "../../../../icons/Power";

export default function main() {
  const store = useStore();

  return (
    <>
      <ul
        className="list-unstyled mx-auto my-5 p-0 row container"
        style={{ fontSize: "smaller", textWrap: "nowrap" }}
      >
        <li className="col-4">
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
            to="/settings/addresses"
          >
            <img src="/assets/settings/address.png" alt="Icon" />
            {getText("settings", 0)}
          </Link>
        </li>

        <li className="col-4">
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
            to="/settings/history"
          >
            <img src="/assets/settings/delivery.png" alt="Icon" />
            {getText("settings", 1)}
          </Link>
        </li>

        <li className="col-4">
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
            to="/settings/fav"
          >
            <img src="/assets/settings/shop.png" alt="Icon" />
            {getText("settings", 2)}
          </Link>
        </li>

        <li className="col-4">
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
            to="/settings/wallet"
          >
            <img src="/assets/settings/wallet.png" alt="Icon" />
            {getText("settings", 3)}
          </Link>
        </li>

        <li className="col-4">
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
            to="/settings/account"
          >
            <img src="/assets/settings/gears.png" alt="Icon" />
            {getText("settings", 4)}
          </Link>
        </li>

        <li className="col-4">
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
            to="/about-us"
          >
            <img src="/assets/settings/address.png" alt="Icon" />
            {getText("settings", 27)}
          </Link>
        </li>
      </ul>

      <button type="button" className="btn container" onClick={logout}>
        {getText("settings", 5)} {Power}
      </button>
    </>
  );

  function logout() {
    store.dispatch({ type: "user/logout" });
  }
}
