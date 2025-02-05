/* eslint-disable import/no-anonymous-default-export */
import getText from "../translation";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store";

export default function () {
  const redirect = useNavigate(),
    { alerts: Alerts, loaded } = useSelector((e) => e.User),
    alerts = Alerts.filter((e) => !e.is_read),
    Products = useSelector((e) => e.Products);

  let itemsQuantity = 0;

  Products.cart.forEach((p) => (itemsQuantity += p.quantity));

  return (
    <div className="align-items-center container d-grid py-3">
      <ul className="align-items-center d-flex list-unstyled m-0 p-0">
        <li>
          <Link to="/all-products">{getText("header", 0)}</Link>
        </li>
        <li>
          <Link to="/restaurant">{getText("header", 1)}</Link>
        </li>
        <li>
          <button type="button" className="btn px-3 py-2">
            {getText("header", 2)}
          </button>
        </li>
      </ul>

      <Link to="/" className="mx-auto">
        <img src="/assets/home/logo.svg" alt="logo" />
      </Link>

      <ul className="align-items-center d-flex list-unstyled m-0 p-0">
        <li>
          <Link to="/alerts">
            <img src="/assets/home/icons/Bell Bing.svg" alt="alerts" />
            <span className="badge">{alerts.length}</span>
          </Link>
        </li>

        <li className="DD" onClick={() => redirect("/settings/addresses")}>
          <img
            src="/assets/home/icons/fluent_person-16-regular.svg"
            alt="account"
          />

          {loaded && (
            <ul className="d-flex flex-column list-unstyled m-0 p-0">
              <li className="p-2">
                <Link to="/settings/addresses">{getText("header", 3)}</Link>
              </li>

              <li className="p-2 text-danger" onClick={logout}>
                {getText("header", 4)}
              </li>
            </ul>
          )}
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
