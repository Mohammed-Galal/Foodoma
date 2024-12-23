/* eslint-disable import/no-anonymous-default-export */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function () {
  let itemsQuantity = 0;

  useSelector((e) => e.Products).cart.forEach(
    (p) => (itemsQuantity += p.quantity)
  );

  return (
    <div className="align-items-center container d-grid py-3">
      <ul className="align-items-center d-flex list-unstyled m-0 p-0">
        <li>
          <Link to="/products">منتجاتنا</Link>
        </li>
        <li>
          <Link to="/branches">الفروع</Link>
        </li>
        <li>
          <Link to="/settings/about-us">من نحن؟</Link>
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
          <Link to="/settings/addresses">
            <img
              src="/assets/home/icons/fluent_person-16-regular.svg"
              alt="account"
            />
          </Link>
        </li>
        <li>
          <Link to="/settings/fav">
            <img src="/assets/home/icons/header heart.svg" alt="favorites" />
          </Link>
        </li>
        <li>
          <Link to="/cart" className="position-relative">
            <img src="/assets/home/icons/header cart.svg" alt="cart" />
            <span className="badge">{itemsQuantity}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
