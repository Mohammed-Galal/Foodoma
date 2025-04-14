import getText from "../../translation";
import faqs from "./data.json";
import "./index.scss";

export default function () {
  return (
    <section id="faq" className="container" style={{ color: "var(--primary)" }}>
      <h3 className="mb-5 text-center" style={{ cursor: "pointer" }}>
        {"الأسئلة الشائعة"}
      </h3>
      <ul className="d-grid gap-3 list-unstyled m-0 p-0">{faqs.map(tab)}</ul>
    </section>
  );
}

function tab({ q, a }, i) {
  let view;

  return (
    <li key={i} className="d-grid gap-2">
      <h5
        className="m-0 px-3 py-2"
        style={{ border: "1px solid currentColor", borderRadius: "16px" }}
        onClick={toggleView}
      >
        {q}
      </h5>

      <p className="mb-0 px-3" ref={handleRef}>
        {a}
      </p>
    </li>
  );

  function toggleView() {
    view && view.classList.toggle("active");
  }

  function handleRef(el) {
    if (el) {
      el.style = `--H: ${el.scrollHeight}px;`;
      view = el;
    }
  }
}
