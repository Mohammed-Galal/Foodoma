/* eslint-disable import/no-anonymous-default-export */
import getText from "../../translation";
import React from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { Link } from "react-router-dom";
import NXT from "../../icons/NXT";
import Recommended from "./Recommended";
import "./index.scss";

const baseUrl = "https://mon10.amir-adel.com";

export default function () {
  const store = useStore().getState(),
    dispatch = useDispatch(),
    restaurant = store.Restaurant;

  const delivery = +restaurant.data.delivery_charges;

  let discount = 0,
    totalPrice = 0;

  const { cart, data } = useSelector((S) => S.Products),
    items = cart.map((item, I) => {
      totalPrice += item.totalPrice;
      return ProductItem(item, I, editCartItem);
    });

  const discountValue = Math.floor(totalPrice / 100);
  discountValue && (discount = -(discountValue * 10));

  return (
    <>
      <ul
        id="cart-breadcrumb"
        className="d-flex gap-2 justify-content-center list-unstyled m-0 px-0 py-5"
      >
        <li>{getText("cart", 0)}</li>
        <li>{NXT}</li>
        <li>{getText("cart", 1)}</li>
        <li>{NXT}</li>
        <li>{getText("cart", 2)}</li>
      </ul>

      <div
        className="align-items-center container d-flex flex-column gap-3 h5 my-0"
        style={{ cssText: "color: var(--primary); font-weight: 600;" }}
      >
        {getText("cart", 3)}
        <progress
          value={totalPrice}
          max="100"
          style={{ cssText: "max-width: 500px;" }}
        ></progress>
      </div>

      {cart.length ? (
        <section
          id="cart"
          className="align-items-center align-items-stretch container d-flex flex-column flex-xl-row gap-3"
        >
          <ul className="text-center d-grid gap-1 list-unstyled m-0 overflow-hidden p-3">
            <li>{getText("cart", 4)}</li>
            <li>{getText("cart", 5)}</li>
            <li>{getText("cart", 6)}</li>
            <li>{getText("cart", 7)}</li>
            <li>{getText("cart", 8)}</li>

            <li className="seperator mb-3">
              <hr className="m-0" />
            </li>

            {items}

            <li className="mt-3">
              <input
                type="text"
                className="input-group-text"
                placeholder="أضف كود الخصم"
              />
              <button className="btn px-3 py-2">{getText("cart", 9)}</button>
            </li>
          </ul>

          <div className="d-grid gap-3 p-3">
            <p className="h4 m-0 pb-2 text-center">{getText("cart", 17)}</p>

            <span>
              <samp>{getText("cart", 10)}</samp>
              {totalPrice} {getText("cart", 16)}
            </span>

            <p className="d-grid gap-3 m-0 py-2">
              <span>
                <samp>{getText("cart", 11)}</samp>
                {delivery} {getText("cart", 16)}
              </span>

              <span>
                <samp>{getText("cart", 12)}</samp>
                {Math.abs(discount)} {getText("cart", 16)}
              </span>
            </p>

            <span className="total">
              <samp>{getText("cart", 13)}</samp>
              {+delivery + totalPrice + discount} {getText("cart", 16)}
            </span>

            <Link className="btn" to="/checkout">
              {getText("cart", 15)}
            </Link>
          </div>
        </section>
      ) : (
        <div className="container d-flex justify-content-center my-3 overflow-hidden">
          <img
            className="animate-shake"
            src={baseUrl + "/assets/img/various/cart-empty.png"}
            style={{ maxHeight: 450 + "px" }}
            alt="no items"
          />
        </div>
      )}
      <Recommended items={data} />
    </>
  );

  function editCartItem(index, quantity) {
    dispatch({
      type: "products/updateCartItem",
      payload: { index, quantity },
    });
  }
}

function ProductItem({ id, quantity, name, addons, price }, I, editCart) {
  const Addons =
    addons.length === 0 ? (
      <li>{getText("cart", 14)}</li>
    ) : (
      addons.map((a) => {
        price += a.price;
        return (
          <li key={a.addon_id} className="d-flex justify-content-center">
            {a.addon_name} -
            <span>
              {a.price} {getText("cart", 16)}
            </span>
          </li>
        );
      })
    );

  return (
    <React.Fragment key={id * price}>
      <li className="item-name align-items-center d-flex gap-1">
        <button className="btn p-0" onClick={() => editCart(I, 0)}>
          x
        </button>
        <Link className="text-decoration-none" to={"/products/" + id}>
          {name}
        </Link>
      </li>

      <li>
        <ul
          className="d-flex flex-column list-unstyled m-0 p-0 gap-1"
          style={{ fontSize: "smaller", color: "var(--midgray)" }}
        >
          {Addons}
        </ul>
      </li>

      <li className="item-price">
        <span>{price}</span> {getText("cart", 16)}
      </li>

      <li className="align-items-center d-flex gap-2 item-quantity justify-content-center">
        <button className="btn p-0" onClick={() => editCart(I, quantity + 1)}>
          +
        </button>
        {quantity}
        <button className="btn p-0" onClick={() => editCart(I, quantity - 1)}>
          -
        </button>
      </li>

      <li className="item-total">
        <span>{price * quantity}</span> {getText("cart", 16)}
      </li>
    </React.Fragment>
  );
}
