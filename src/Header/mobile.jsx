import { keys } from "../translation";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MobileHeader() {
  const alerts = useSelector((e) => e.User).alerts.filter((e) => !e.is_read);

  return (
    <div className="container align-items-center d-flex gap-2 py-2">
      <Link to="/settings" className="btn">
        <img
          src="/assets/home/icons/fluent_person-16-regular.svg"
          alt="account"
        />
      </Link>

      <Link to="/" className="mx-auto flex-grow-1 text-center">
        <img src="/assets/home/logo.svg" alt="logo" />
      </Link>

      <Link to="/alerts" className="btn text-decoration-none position-relative">
        <img src="/assets/home/icons/Bell Bing.svg" alt="notifications" />
        <span
          className="badge position-absolute"
          style={{
            background: "#ffcd00",
            clipPath: "circle()",
            right: "0",
            top: "0",
          }}
        >
          {alerts.length}
        </span>
      </Link>

      <button type="button" className="btn DD">
        <img
          src="/assets/global.png"
          alt="translate"
          style={{ maxWidth: "24px", filter: "contrast(0.7)" }}
        />

        <ul
          className="m-0 p-0 list-unstyled d-flex flex-column"
          style={{ color: "var(--primary)", minWidth: "70px" }}
        >
          {keys.map((k) => (
            <li
              key={k}
              className="p-2 text-center"
              onClick={() => changeLang(k)}
            >
              {k}
            </li>
          ))}
        </ul>
      </button>
    </div>
  );
}

function changeLang(lang) {
  window.localStorage.setItem("lang", lang);
  window.location.reload();
}
