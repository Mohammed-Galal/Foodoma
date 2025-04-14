/* eslint-disable import/no-anonymous-default-export */
import { keys } from "../../../translation";
import { useNavigate, useParams } from "react-router-dom";
import tabs from "./tabs";
import Globe from "../../../icons/Globe";
import AltArrowDown from "../../../icons/Arrow_Down";
import { useSelector } from "react-redux";

export default function () {
  const redirect = useNavigate(),
    tabName = useParams().tab || "main",
    TargetTab = tabs[tabName];

  const { name, phone } = useSelector((e) => e.User).data;

  return (
    <section id="settings-mobile" className="position-relative container">
      <div id="personal" className="align-items-center d-flex gap-3 p-3  mb-3">
        <img src="/assets/settings/avatar.png" alt="avatar" />

        <div class="d-flex flex-column flex-grow-1 info overflow-hidden">
          <span>{name}</span>
          {/* <span>{email}</span> */}
          <span>{phone}</span>
        </div>

        <div class="align-items-center d-flex gap-2 langs">
          {Globe}
          <span>{window.localStorage.getItem("lang") || "العربية"}</span>
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

      {TargetTab && <TargetTab name={tabName} />}
    </section>
  );

  function changeLang(lang) {
    window.localStorage.setItem("lang", lang);
    redirect(0);
  }
}
