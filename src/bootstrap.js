<<<<<<< HEAD
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
=======
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
>>>>>>> 8828f8872f24d5af85ad0af7e8efc7f7c81bcb4c
