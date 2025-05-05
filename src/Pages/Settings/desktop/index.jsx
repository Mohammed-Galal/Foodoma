/* eslint-disable import/no-anonymous-default-export */
import getPage, { keys } from "../../../translation";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import tabs from "./tabs";

import Globe from "../../../icons/Globe";
import AltArrowDown from "../../../icons/Arrow_Down";
import Power from "../../../icons/Power";
import { useSelector } from "react-redux";
import { logout } from "../../../store";

const getText = getPage("settings");

export default function () {
  const tabName = useParams().tab,
    TargetTab = tabs[tabName];

  return (
    <section id="settings">
      <div
        className="container p-3"
        style={{ border: "1px solid #f4f9ff", borderRadius: "16px" }}
      >
        <AccountInfo />

        <div
          className="d-grid mt-5 gap-3"
          style={{ "grid-template-columns": "256px 1fr" }}
        >
          <ul id="menu" className="list-unstyled p-0 m-0">
            <li className="pb-2">
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/addresses"
              >
                <img src="/assets/settings/address.png" alt="Icon" />
                {getText(0)}
              </NavLink>
            </li>

            <li className="py-2">
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/history"
              >
                <img src="/assets/settings/delivery.png" alt="Icon" />
                {getText(1)}
              </NavLink>
            </li>

            <li className="py-2">
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/fav"
              >
                <img src="/assets/settings/shop.png" alt="Icon" />
                {getText(2)}
              </NavLink>
            </li>

            <li className="py-2">
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/wallet"
              >
                <img src="/assets/settings/wallet.png" alt="Icon" />
                {getText(3)}
              </NavLink>
            </li>

            <li className="py-2">
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/account"
              >
                <img src="/assets/settings/gears.png" alt="Icon" />
                {getText(4)}
              </NavLink>
            </li>

            <li className="py-2">
              <button
                className="btn align-items-center d-grid gap-2 w-100 p-0"
                onClick={logout}
              >
                {Power}
                {getText(5)}
              </button>
            </li>
          </ul>

          {!!TargetTab && <TargetTab />}
        </div>
      </div>
    </section>
  );
}

function AccountInfo() {
  const redirect = useNavigate(),
    DATA = useSelector((e) => e.User).data,
    { name, phone } = DATA;

  return (
    <div id="account" className="align-items-center d-flex gap-3">
      <img src="/assets/settings/avatar.png" alt="avatar" />

      <p
        className="d-flex flex-column flex-grow-1 m-0"
        style={{ cssText: "color: var(--midgray)" }}
      >
        <span className="h4" style={{ color: "var(--primary)" }}>
          {name}
        </span>
        {/* <span>{email}</span> */}
        <span>{phone}</span>
      </p>

      <div
        className="align-items-center d-flex gap-2 langs position-relative"
        style={{ color: "var(--primary)" }}
      >
        {Globe}
        {window.localStorage.getItem("lang") || "العربية"}
        {AltArrowDown}

        {/* <ul className="d-grid list-unstyled m-0 p-0 py-2 text-center">
          {keys.map((k) => (
            <li key={k} className="px-3 py-2" onClick={() => changeLang(k)}>
              {k}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );

  function changeLang(lang) {
    window.localStorage.setItem("lang", lang);
    redirect(0);
  }
}
