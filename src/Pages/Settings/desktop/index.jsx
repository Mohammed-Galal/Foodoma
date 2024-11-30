/* eslint-disable import/no-anonymous-default-export */
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import tabs from "./tabs";

import Globe from "../../../icons/Globe";
import AltArrowDown from "../../../icons/Arrow_Down";

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
          className="d-grid mt-5"
          style={{ "grid-template-columns": "256px 1fr" }}
        >
          <ul className="list-unstyled p-0 m-0">
            <li>
              <NavLink
                className="align-items-center d-flex gap-2 py-3 text-decoration-none"
                to="/settings/addresses"
              >
                <img src="/assets/settings/address.png" alt="Icon" />
                عناويني
              </NavLink>
            </li>

            <li>
              <NavLink
                className="align-items-center d-flex gap-2 py-3 text-decoration-none"
                to="/settings/history"
              >
                <img src="/assets/settings/delivery.png" alt="Icon" />
                طلباتي
              </NavLink>
            </li>

            <li>
              <NavLink
                className="align-items-center d-flex gap-2 py-3 text-decoration-none"
                to="/settings/fav"
              >
                <img src="/assets/settings/shop.png" alt="Icon" />
                المفضلة
              </NavLink>
            </li>

            <li>
              <NavLink
                className="align-items-center d-flex gap-2 py-3 text-decoration-none"
                to="/settings/wallet"
              >
                <img src="/assets/settings/wallet.png" alt="Icon" />
                محفظتي
              </NavLink>
            </li>

            <li>
              <NavLink
                className="align-items-center d-flex gap-2 py-3 text-decoration-none"
                to="/settings"
              >
                <img src="/assets/settings/gears.png" alt="Icon" />
                الاعدادات
              </NavLink>
            </li>

            <li>
              <NavLink
                className="align-items-center d-flex gap-2 py-3 text-decoration-none"
                to="/settings/about"
              >
                <img src="/assets/settings/address.png" alt="Icon" />
                حول التطبيق
              </NavLink>
            </li>
          </ul>

          {!!TargetTab && <TargetTab />}
        </div>
      </div>
    </section>
  );
}

function AccountInfo() {
  return (
    <div id="account" className="align-items-center d-flex gap-3">
      <img src="/assets/settings/avatar.png" alt="avatar" />

      <p
        className="d-flex flex-column flex-grow-1 m-0"
        style={{ cssText: "color: var(--midgray)" }}
      >
        <span className="h4" style={{ color: "var(--primary)" }}>
          {"الاسم"}
        </span>
        <span>{"useremail@gmail.com"}</span>
        <span>{"+20123456789"}</span>
      </p>

      <div
        className="align-items-center d-flex gap-2 langs"
        style={{ color: "var(--primary)" }}
      >
        {Globe}
        العربية
        {AltArrowDown}
      </div>
    </div>
  );
}

/**
 *  <div class=>
    <ul class="list-unstyled m-0 p-0" style="width: 256px">
    <li>
    <a class="" href="/settings/addresses" style="color: var(--primary)"
      ><img src="/assets/settings/address.png" alt="Icon" />عناويني</a
    >
  </li>
  <li>
    <a
      class="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
      href="/settings/history"
      ><img src="/assets/settings/delivery.png" alt="Icon" />طلباتي</a
    >
  </li>
  <li>
    <a
      class="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
      href="/settings/fav"
      ><img src="/assets/settings/shop.png" alt="Icon" />المفضلة</a
    >
  </li>
  <li>
    <a
      class="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
      href="/settings/wallet"
      ><img src="/assets/settings/wallet.png" alt="Icon" />محفظتي</a
    >
  </li>
  <li>
    <a
      aria-current="page"
      class="align-items-center d-flex flex-column gap-3 p-3 justify-content-center active"
      href="/settings"
      ><img src="/assets/settings/gears.png" alt="Icon" />الاعدادات</a
    >
  </li>
  <li>
    <a
      class="align-items-center d-flex flex-column gap-3 p-3 justify-content-center"
      href="/settings/about"
      ><img src="/assets/settings/address.png" alt="Icon" />حول التطبيق</a
    >
  </li>
</ul>
</div>
 */