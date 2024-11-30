/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NXT from "../../icons/NXT";
import Recommended from "./Recommended";
import "./index.scss";

let totalPrice;

export const delivery = Math.ceil(Math.random() * 15),
  discount = Math.ceil(Math.random() * 5);

export default function () {
  totalPrice = 0;

  const store = useSelector((S) => S.Products),
    cart = store.cart,
    items = cart.map(ProductItem, store);

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
              {discount} ر.س
            </span>
          </p>

          <span className="total">
            <samp>الإجمالي</samp>
            {totalPrice + delivery + discount} ر.س
          </span>

          <Link className="btn" to="/checkout">
            أكمل الدفع
          </Link>
        </div>
      </section>

      <Recommended items={store.data} />
    </>
  );
}

function ProductItem({ id, quantity }) {
  const dispatch = useDispatch(),
    itemData = this.data.find((p) => p.id === id);

  const price = itemData.price || Math.ceil(Math.random() * 10);
  totalPrice += price * quantity;

  return (
    <React.Fragment key={id * quantity}>
      <li className="item-name align-items-center d-flex gap-3 text-nowrap">
        <button className="btn p-0" onClick={removeItem}>
          x
        </button>
        <Link className="text-decoration-none" to={"/products/" + itemData.id}>
          {itemData.name}
        </Link>
      </li>

      <li className="item-price">
        <span>{price}</span> ر.س
      </li>

      <li className="align-items-center d-flex gap-2 item-quantity justify-content-center">
        <button className="btn p-0" onClick={increaseItem}>
          +
        </button>
        {quantity}
        <button className="btn p-0" onClick={decrement}>
          -
        </button>
      </li>

      <li className="item-total">
        <span>{price * quantity}</span> ر.س
      </li>
    </React.Fragment>
  );

  function increaseItem() {
    quantity++;

    dispatch({
      type: "products/addToCart",
      payload: { id, quantity },
    });
  }

  function removeItem() {
    dispatch({
      type: "products/remove_cart_item",
      payload: id,
    });
  }

  function decrement() {
    dispatch({
      type: "products/reduce_cart_item",
      payload: { id, quantity },
    });
  }
}
