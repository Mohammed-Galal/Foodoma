import { Link } from "react-router-dom";

export default function () {
  return (
    <div className="container align-items-center d-grid py-2">
      <button type="button" className="btn">
        <img src="/assets/home/icons/List.svg" alt="list" />
      </button>

      <Link to="/" className="mx-auto">
        <img src="/assets/home/logo.svg" alt="logo" />
      </Link>

      <div></div>

      <button type="button" className="btn">
        <img src="/assets/home/icons/Bell Bing.svg" alt="notifications" />
      </button>
    </div>
  );
}
