import en from "./en.js";
import ar from "./ar.js";

const file = { العربية: ar, English: en };
const lang = window.localStorage.getItem("lang") || "العربية";
export const keys = Object.keys(file);

export default function getText(pageName, phraseIndex) {
  const fallback = file["العربية"][pageName][phraseIndex];

  try {
    return file[lang][pageName][phraseIndex] || fallback;
  } catch {
    return fallback;
  }
}

if (window)
  window.addEventListener(
    "DOMContentLoaded",
    () => (document.body.dir = lang === "العربية" ? "rtl" : "ltr")
  );
