/* eslint-disable import/no-anonymous-default-export */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Desktop from "./desktop/index.jsx";
import Mobile from "./mobile/index.jsx";
import isMobileView from "../../shared/isMobile.js";
import "./index.scss";

export default function () {
  const navigate = useNavigate(),
    isAuthed = useSelector((e) => e.User).loaded;

  useEffect(() => isAuthed || navigate("/user/login"), [isAuthed]);
  return isMobileView ? <Mobile /> : <Desktop />;
}
