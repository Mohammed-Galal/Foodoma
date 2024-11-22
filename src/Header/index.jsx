/* eslint-disable import/no-anonymous-default-export */
import desktop from "./desktop";
import mobile from "./mobile";
import "./index.scss";

export default function (isMobileDevice) {
  const Target = isMobileDevice ? mobile : desktop;

  return <Target />;
}
