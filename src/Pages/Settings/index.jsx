/* eslint-disable import/no-anonymous-default-export */
import Desktop from "./desktop/index.jsx";
import Mobile from "./mobile/index.jsx";
import isMobileView from "../../shared/isMobile.js";
import "./index.scss";

export default isMobileView ? Mobile : Desktop;
