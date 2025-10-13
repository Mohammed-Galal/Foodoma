<<<<<<< HEAD
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
    TargetTab = tabs[tabName],
    DATA = useSelector((e) => e.User).data,
    { name, phone } = DATA;

  return (
    <section id="settings">
      <style>{`body{background-color: #f8fafc;}`}</style>
      <div className="container p-3">
        <LangInfo />

        <div
          className="d-grid mt-4 gap-4"
          style={{ "grid-template-columns": "1fr 3fr" }}
        >
          <ul
            id="menu"
            className="d-flex flex-column gap-2 list-unstyled m-0 p-4 "
            style={{
              height: "fit-content",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow:
                " 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
              position: "sticky",
              top: "130px",
            }}
          >
            <li className="align-items-center d-flex gap-2 mb-4">
              <img
                src="/assets/settings/avatar.png"
                alt="avatar"
                style={{ maxHeight: "54px" }}
              />

              <p
                className="d-flex flex-column flex-grow-1 m-0"
                style={{ cssText: "color: var(--midgray)" }}
              >
                <span className="h5 m-0" style={{ color: "var(--primary)" }}>
                  {name}
                </span>
                {/* <span>{email}</span> */}
                <span>{phone}</span>
              </p>
            </li>

            <li>
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/addresses"
              >
                <img src="/assets/settings/address.png" alt="Icon" />
                {getText(0)}
              </NavLink>
            </li>

            <li>
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/history"
              >
                <img src="/assets/settings/delivery.png" alt="Icon" />
                {getText(1)}
              </NavLink>
            </li>

            <li>
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/fav"
              >
                <img src="/assets/settings/shop.png" alt="Icon" />
                {getText(2)}
              </NavLink>
            </li>

            <li>
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/wallet"
              >
                <img src="/assets/settings/wallet.png" alt="Icon" />
                {getText(3)}
              </NavLink>
            </li>

            <li>
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/account"
              >
                <img src="/assets/settings/gears.png" alt="Icon" />
                {getText(4)}
              </NavLink>
            </li>

            <hr className="m-0" />
            <li>
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

function LangInfo() {
  const redirect = useNavigate();

  return (
    <div
      className="align-items-center d-flex gap-2 langs position-relative"
      style={{
        color: "var(--primary)",
        width: "fit-content",
        marginInlineStart: "auto",
      }}
    >
      {Globe}
      {window.localStorage.getItem("lang") || "العربية"}
      {AltArrowDown}

      <ul className="d-grid list-unstyled m-0 p-0 py-2 text-center">
        {keys.map((k) => (
          <li key={k} className="px-3 py-2" onClick={() => changeLang(k)}>
            {k}
          </li>
        ))}
      </ul>
    </div>
  );

  function changeLang(lang) {
    window.localStorage.setItem("lang", lang);
    redirect(0);
  }
}
=======
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
    TargetTab = tabs[tabName],
    DATA = useSelector((e) => e.User).data,
    { name, phone } = DATA;

  return (
    <section id="settings">
      <style>{`body{background-color: #f8fafc;}`}</style>
      <div className="container p-3">
        <LangInfo />

        <div
          className="d-grid mt-4 gap-4"
          style={{ "grid-template-columns": "1fr 3fr" }}
        >
          <ul
            id="menu"
            className="d-flex flex-column gap-2 list-unstyled m-0 p-4 "
            style={{
              height: "fit-content",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow:
                " 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
              position: "sticky",
              top: "130px",
            }}
          >
            <li className="align-items-center d-flex gap-2 mb-4">
              <img
                src="/assets/settings/avatar.png"
                alt="avatar"
                style={{ maxHeight: "54px" }}
              />

              <p
                className="d-flex flex-column flex-grow-1 m-0"
                style={{ cssText: "color: var(--midgray)" }}
              >
                <span className="h5 m-0" style={{ color: "var(--primary)" }}>
                  {name}
                </span>
                {/* <span>{email}</span> */}
                <span>{phone}</span>
              </p>
            </li>

            <li>
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/addresses"
              >
                <img src="/assets/settings/address.png" alt="Icon" />
                {getText(0)}
              </NavLink>
            </li>

            <li>
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/history"
              >
                <img src="/assets/settings/delivery.png" alt="Icon" />
                {getText(1)}
              </NavLink>
            </li>

            <li>
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/fav"
              >
                <img src="/assets/settings/shop.png" alt="Icon" />
                {getText(2)}
              </NavLink>
            </li>

            <li>
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/wallet"
              >
                <img src="/assets/settings/wallet.png" alt="Icon" />
                {getText(3)}
              </NavLink>
            </li>

            <li>
              <NavLink
                className="align-items-center d-grid gap-2 text-decoration-none"
                to="/settings/account"
              >
                <img src="/assets/settings/gears.png" alt="Icon" />
                {getText(4)}
              </NavLink>
            </li>

            <hr className="m-0" />
            <li>
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

function LangInfo() {
  const redirect = useNavigate();

  return (
    <div
      className="align-items-center d-flex gap-2 langs position-relative"
      style={{
        color: "var(--primary)",
        width: "fit-content",
        marginInlineStart: "auto",
      }}
    >
      {Globe}
      {window.localStorage.getItem("lang") || "العربية"}
      {AltArrowDown}

      <ul className="d-grid list-unstyled m-0 p-0 py-2 text-center">
        {keys.map((k) => (
          <li key={k} className="px-3 py-2" onClick={() => changeLang(k)}>
            {k}
          </li>
        ))}
      </ul>
    </div>
  );

  function changeLang(lang) {
    window.localStorage.setItem("lang", lang);
    redirect(0);
  }
}
>>>>>>> 8828f8872f24d5af85ad0af7e8efc7f7c81bcb4c
