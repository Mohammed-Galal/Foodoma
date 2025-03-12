const version = "1.1.6",
  activeVer = window && window.localStorage.getItem("ver");

if (activeVer !== version && window) {
  window.localStorage.clear();
  window.localStorage.setItem("ver", version);
}
