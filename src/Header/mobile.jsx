import { Link } from "react-router-dom";

export default function MobileHeader() {
  return (
    <div className="container align-items-center d-grid py-2">
      <button type="button" className="btn">
        <img src="/assets/home/icons/List.svg" alt="list" />
      </button>

      <Link to="/" className="mx-auto">
        <img src="/assets/home/logo.svg" alt="logo" />
      </Link>

      <Link to="/alerts" className="btn text-decoration-none">
        <img src="/assets/home/icons/Bell Bing.svg" alt="notifications" />
      </Link>
    </div>
  );
}
