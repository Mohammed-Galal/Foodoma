import en from "./en.js";
import ar from "./ar.js";

const file = { العربية: ar, English: en };
const lang = window.localStorage.getItem("lang") || "العربية";
window.localStorage.setItem("lang", lang);

export const keys = Object.keys(file);

export default function getPage(pageName) {
  const fallback = file["العربية"][pageName];

  return function (phraseIndex) {
    try {
      // debugger;
      return file[lang][pageName][phraseIndex] || fallback[phraseIndex];
    } catch {
      return fallback;
    }
  };
}

if (window)
  window.addEventListener(
    "DOMContentLoaded",
    () => (document.body.dir = lang === "العربية" ? "rtl" : "ltr")
  );
