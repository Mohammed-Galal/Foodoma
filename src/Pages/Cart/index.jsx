/* eslint-disable import/no-anonymous-default-export */
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

  const delivery = +restaurant.data.delivery_charges,
    discount = 0;

  let totalPrice = 0;

  const { cart, data } = useSelector((S) => S.Products),
    items = cart.map((item, I) => {
      totalPrice += item.totalPrice;
      return ProductItem(item, I, editCartItem);
    });

  return (
    <>
      <ul
        id="cart-breadcrumb"
        className="d-flex gap-2 justify-content-center list-unstyled m-0 px-0 py-5"
      >
        <li>السلة</li>
        <li>{NXT}</li>
        <li>الدفع</li>
        <li>{NXT}</li>
        <li>تأكيد الطلب</li>
      </ul>

      <div
        className="align-items-center container d-flex flex-column gap-3 h5 my-0"
        style={{ cssText: "color: var(--primary); font-weight: 600;" }}
      >
        أضف 100 ر.س للسلة وأحصل على 10 ر.س كاش باك!
        <progress
          value={totalPrice}
          max="100"
          style={{ cssText: "max-width: 500px;" }}
        ></progress>
      </div>

      {cart.length ? (
        <section
          id="cart"
          className="align-items-baseline container d-flex flex-wrap gap-3"
        >
          <ul className="text-center d-grid g-3 gap-3 list-unstyled m-0 overflow-hidden p-3">
            <li>المنتج</li>
            <li>السعر</li>
            <li>العدد</li>
            <li>الاجمالي</li>

            <li className="seperator">
              <hr className="m-0" />
            </li>

            {items}

            <li>
              <input
                type="text"
                className="input-group-text"
                placeholder="أضف كود الخصم"
              />
              <button className="btn px-3 py-2">أضف</button>
            </li>
          </ul>

          <div className="d-grid gap-3 p-3">
            <p className="h4 m-0 pb-2">إجمالي العربة</p>

            <span>
              <samp>إجمالي المنتجات</samp>
              {totalPrice} ر.س
            </span>

            <p className="d-grid gap-3 m-0 py-2">
              <span>
                <samp>التوصيل</samp>
                {delivery} ر.س
              </span>

              <span>
                <samp>الخصم</samp>
                {Math.abs(discount)} ر.س
              </span>
            </p>

            <span className="total">
              <samp>الإجمالي</samp>
              {+delivery + totalPrice + discount} ر.س
            </span>

            <Link className="btn" to="/checkout">
              أكمل الدفع
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

function ProductItem({ id, quantity, price, name }, I, editCart) {
  return (
    <React.Fragment key={id * quantity}>
      <li className="item-name align-items-center d-flex gap-3 text-nowrap">
        <button className="btn p-0" onClick={() => editCart(I, 0)}>
          x
        </button>
        <Link className="text-decoration-none" to={"/products/" + id}>
          {name}
        </Link>
      </li>

      <li className="item-price">
        <span>{price}</span> ر.س
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
        <span>{price * quantity}</span> ر.س
      </li>
    </React.Fragment>
  );
}
