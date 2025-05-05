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
        className="list-unstyled mx-auto my-5 p-0 row container"
        style={{ fontSize: "smaller", textWrap: "nowrap" }}
      >
        <li className="col-4">
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
            to="/settings/addresses"
          >
            <img src="/assets/settings/address.png" alt="Icon" />
            {getText(24)}
          </Link>
        </li>

        <li className="col-4">
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
            to="/settings/history"
          >
            <img src="/assets/settings/delivery.png" alt="Icon" />
            {getText(25)}
          </Link>
        </li>

        <li className="col-4">
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
            to="/settings/fav"
          >
            <img src="/assets/settings/shop.png" alt="Icon" />
            {getText(26)}
          </Link>
        </li>

        <li className="col-4">
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
            to="/settings/wallet"
          >
            <img src="/assets/settings/wallet.png" alt="Icon" />
            {getText(27)}
          </Link>
        </li>

        <li className="col-4">
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
            to="/settings/account"
          >
            <img src="/assets/settings/gears.png" alt="Icon" />
            {getText(28)}
          </Link>
        </li>

        <li className="col-4">
          <Link
            className="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
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
