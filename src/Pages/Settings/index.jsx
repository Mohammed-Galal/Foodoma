/* eslint-disable import/no-anonymous-default-export */
import { useParams } from "react-router-dom";
import Navigator from "./Navigator";
import isMobileView from "../../shared/isMobile.js";

import Globe from "../../icons/Globe";
import AltArrowDown from "../../icons/Arrow_Down";
import "./index.scss";

const tabs = {};
tabs.mainTab = Navigator;

export default function () {
  const tabName = useParams().tab || "mainTab",
    TargetTab = tabs[tabName];

  return isMobileView ? MobileView(tabName, TargetTab) : false;
}

function MobileView(tabName, TargetTab) {
  return (
    <section id="settings-mobile" className="position-relative">
      <div id="personal" className="align-items-center d-flex gap-3 p-3">
        <img src="/assets/settings/avatar.png" alt="avatar" />

        <div class="d-flex flex-column flex-grow-1 info overflow-hidden">
          <span>الاسم</span>
          <span>useremail@gmail.com</span>
          <span>+20123456789</span>
        </div>

        <div class="align-items-center d-flex gap-2 langs">
          {Globe}
          <span>العربية</span>
          {AltArrowDown}
        </div>
      </div>

      <TargetTab name={tabName} />
    </section>
  );
}
