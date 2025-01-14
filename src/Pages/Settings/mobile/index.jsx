/* eslint-disable import/no-anonymous-default-export */
import { useParams } from "react-router-dom";
import tabs from "./tabs";
import Globe from "../../../icons/Globe";
import AltArrowDown from "../../../icons/Arrow_Down";
import { useSelector } from "react-redux";

export default function () {
  const tabName = useParams().tab || "main",
    TargetTab = tabs[tabName];

  const { name, email, phone } = useSelector((e) => e.User).data;

  return (
    <section id="settings-mobile" className="position-relative container">
      <div id="personal" className="align-items-center d-flex gap-3 p-3  mb-3">
        <img src="/assets/settings/avatar.png" alt="avatar" />

        <div class="d-flex flex-column flex-grow-1 info overflow-hidden">
          <span>{name}</span>
          <span>{email}</span>
          <span>+{phone}</span>
        </div>

        <div class="align-items-center d-flex gap-2 langs">
          {Globe}
          <span>العربية</span>
          {AltArrowDown}
        </div>
      </div>

      {TargetTab && <TargetTab name={tabName} />}
    </section>
  );
}
