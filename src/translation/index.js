import en from "./en.js";
import ar from "./ar.js";
import fr from "./fr.js";

const file = { ar, en, fr };

const lang = window.localStorage.getItem("lang") || "ar";
export const keys = Object.keys(file);

export default function getText(pageName, phraseIndex) {
  const fallback = file.ar[pageName][phraseIndex];

  try {
    return file[lang][pageName][phraseIndex] || fallback;
  } catch {
    return fallback;
  }
}

if (window)
  window.addEventListener(
    "DOMContentLoaded",
    () => (document.body.dir = lang === "ar" ? "rtl" : "ltr")
  );
