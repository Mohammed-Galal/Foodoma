/* eslint-disable import/no-anonymous-default-export */
import getText from "../../translation";
import React, { useLayoutEffect, useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { Link } from "react-router-dom";
import NXT from "../../icons/NXT";
import Recommended from "./Recommended";
import "./index.scss";

const isArabic = window.localStorage.getItem("lang") === "العربية",
  nameTarget = isArabic ? "name_ar" : "name";

const baseUrl = process.env.REACT_APP_API_URL;
let couponData = null;

export default function () {
  const { cashback } = useSelector((S) => S.Products),
    [discount, setDiscount] = useState(0),
    store = useStore().getState(),
    dispatch = useDispatch(),
    restaurant = store.Restaurant;

  const deliveryCharges = +restaurant.data.delivery_charges;

  let coupon = window.localStorage.getItem("coupon") || "",
    totalPrice = 0;

  coupon === "" && (couponData = null);

  const { cart, data } = useSelector((S) => S.Products),
    items = cart.map((item, I) => {
      totalPrice += item.totalPrice;
      return ProductItem(item, I, editCartItem);
    });

  const delivery =
    totalPrice >= restaurant.data.free_delivery_subtotal ? 0 : deliveryCharges;

  useLayoutEffect(() => {
    const token = window.localStorage.getItem("token");
    if (coupon !== "" && restaurant.loaded && items.length) {
      const couponParams = {
        coupon,
        restaurant_id: "" + restaurant.data.id,
        subtotal: "" + totalPrice,
      };
      _useCoupon(couponParams, token, applyCoupon, rejectCoupon);
    } else if (token === undefined) alert("يجب تسجيل الدخول أولا");
    else couponData = null;
  }, [coupon, totalPrice, discount]);

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

      {cashback && (
        <div
          className="align-items-center container d-flex flex-column gap-3 h5 my-0"
          style={{ cssText: "color: var(--primary); font-weight: 600;" }}
        >
          أضف {cashback.max} واحصل على {cashback.min} ر.س
          <progress
            value={totalPrice}
            max={+cashback.max}
            style={{ cssText: "max-width: 500px;" }}
          ></progress>
        </div>
      )}

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

            {couponData ? (
              <li
                className="d-flex justify-content-between mt-3 py-2"
                style={{
                  backgroundColor: "aliceblue",
                  borderRadius: "16px",
                  fontWeight: "300",
                  paddingInlineStart: "12px",
                }}
              >
                <p
                  className="d-flex flex-column gap-1 m-0"
                  style={{ textAlign: "start" }}
                >
                  <h5 className="align-items-center d-flex gap-1 m-0">
                    {couponData.name}
                    <hr
                      className="m-0"
                      style={{
                        border: "none",
                        backgroundColor: "var(--primary)",
                        width: "6px",
                        height: "6px",
                        borderRadius: "100%",
                      }}
                    />
                    <sub style={{ color: "var(--primary)" }}>
                      {couponData.count} مرات
                    </sub>
                  </h5>
                  {couponData.description}
                </p>

                <button
                  className="btn"
                  onClick={rejectCoupon}
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--primary)",
                    fontWeight: "bold",
                    borderRadius: "0",
                  }}
                >
                  X
                </button>
              </li>
            ) : (
              <li className="mt-3">
                <input
                  type="text"
                  ref={(e) => e && (e.value = coupon)}
                  className="input-group-text"
                  onChange={({ target }) => (coupon = target.value)}
                  placeholder={getText("cart", 18)}
                />
                <button
                  type="button"
                  className="btn px-3 py-2"
                  onClick={addCoupon}
                >
                  {getText("cart", 9)}
                </button>
              </li>
            )}
          </ul>

          <div className="d-grid gap-3 p-3">
            <p className="h4 m-0 pb-2 text-center">{getText("cart", 10)}</p>

            <span>
              <samp>{getText("cart", 11)}</samp>
              {totalPrice} {getText("cart", 16)}
            </span>

            <p className="d-grid gap-3 m-0 py-2">
              <span>
                <samp className="flex-grow-1">
                  {getText("cart", 17)}{" "}
                  {delivery === 0 && (
                    <sub
                      className="px-2"
                      style={{
                        backgroundColor: "#ffcd00",
                        color: "#fff",
                        borderRadius: "12px",
                      }}
                    >
                      توصيل مجاني
                    </sub>
                  )}
                </samp>
                {delivery === 0 ? (
                  <del>{delivery + " " + getText("cart", 16)}</del>
                ) : (
                  delivery + " " + getText("cart", 16)
                )}
              </span>

              <span>
                <samp>{getText("cart", 12)}</samp>
                {discount === false
                  ? "جاري التحقق"
                  : calcCashback(totalPrice, cashback) +
                    Math.abs(discount) +
                    " " +
                    getText("cart", 16)}
              </span>
            </p>

            <span className="total">
              <samp>{getText("cart", 13)}</samp>
              {+delivery +
                -calcCashback(totalPrice, cashback) +
                totalPrice +
                +discount}
              {getText("cart", 16)}
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

  function addCoupon() {
    if (coupon === "") return false;
    window.localStorage.setItem("coupon", coupon);
    setDiscount(false);
  }

  function rejectCoupon() {
    window.localStorage.removeItem("coupon");
    couponData = null;
    setDiscount(0);
  }

  function applyCoupon(res) {
    const { discount_type, discount } = res,
      value =
        discount_type === "PERCENTAGE"
          ? (totalPrice / 100) * +discount
          : +discount;

    // count / max_count

    setDiscount(-Math.floor(value));
    couponData = res;
  }
}

export function _useCoupon(params, auth, callback, rejectCallback) {
  fetch(baseUrl + "/public/api/apply-coupon", {
    method: "POST",
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json", Authorization: auth },
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.success && r.max_count >= r.count) return callback(r);
      const minReached =
        r.type === "MINSUBTOTAL"
          ? "لم تتخطى قيمة العربة الحد الأدنى"
          : "كوبون غير صالح";
      rejectCallback();
      alert(minReached);
    });
}

function ProductItem(item, I, editCart) {
  const { id, quantity, name, addons } = item;
  let price = item.price;

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
          {item[nameTarget] || name}
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

export function calcCashback(totalPrice, cashback) {
  return cashback && totalPrice > +cashback.max ? +cashback.min : 0;
}
