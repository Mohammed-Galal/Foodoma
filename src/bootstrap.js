const version = "11.1.20",
  activeVer = window && window.localStorage.getItem("ver");

window.priceTypes = {
  piece: "للقطعة",
  quarter_kilo: "للربع كيلو",
  half_kilo: "للنصف كيلو",
  one_kilo: "للكيلو",
};

if (activeVer !== version && window) {
  window.localStorage.clear();
  window.localStorage.setItem("ver", version);
}
