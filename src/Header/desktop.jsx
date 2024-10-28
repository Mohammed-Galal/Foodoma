import { Link } from "react-router-dom";

export default (
  <div className="align-items-center container d-grid py-3">
    <ul className="align-items-center d-flex list-unstyled m-0 p-0">
      <li>
        <Link to="/products">منتجاتنا</Link>
      </li>
      <li>
        <Link to="/branches">الفروع</Link>
      </li>
      <li>
        <Link to="/about-us">من نحن؟</Link>
      </li>
    </ul>

    <Link to="/" className="mx-auto">
      <img src="/assets/home/logo.svg" alt="logo" />
    </Link>

    <button type="button" className="btn px-3 py-2">
      اطلب الآن
    </button>

    <ul className="align-items-center d-flex list-unstyled m-0 p-0">
      <li>
        <Link to="/account">
          <img
            src="/assets/home/icons/fluent_person-16-regular.svg"
            alt="account"
          />
        </Link>
      </li>
      <li>
        <Link to="/fav">
          <img src="/assets/home/icons/header heart.svg" alt="favorites" />
        </Link>
      </li>
      <li>
        <Link to="/cart">
          <img src="/assets/home/icons/header cart.svg" alt="cart" />
        </Link>
      </li>
    </ul>
  </div>
);
