const version = "2.1.15",
  activeVer = window && window.localStorage.getItem("ver");

if (activeVer !== version && window) {
  window.localStorage.clear();
  window.localStorage.setItem("ver", version);
}
