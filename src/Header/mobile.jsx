import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MobileHeader() {
  const alerts = useSelector((e) => e.User).alerts.filter((e) => !e.is_read);

  return (
    <div className="container align-items-center d-grid py-2">
      <button type="button" className="btn">
        <img src="/assets/home/icons/List.svg" alt="list" />
      </button>

      <Link to="/" className="mx-auto">
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
    </div>
  );
}
