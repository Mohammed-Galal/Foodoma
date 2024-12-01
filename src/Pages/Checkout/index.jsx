import { useStore } from "react-redux";
import { useState } from "react";
import { delivery, discount } from "../Cart";

import DeleveryOptions from "./DeleveryOptions";
import LocationOptions from "./LocationOptions";
import "./index.scss";

import NXT from "../../icons/NXT";

let totalPrice;

export default (
  <section id="checkout">
    <ul className="d-flex gap-2 justify-content-center list-unstyled mb-5 mx-auto p-0">
      <li>السلة</li>
      <li>{NXT}</li>
      <li className="h5 m-0">الدفع</li>
      <li>{NXT}</li>
      <li>تأكيد الطلب</li>
    </ul>

    <div className="container d-flex flex-wrap gap-3 justify-content-center align-items-start">
      <form className="align-items-stretch col-12 col-lg-8 d-flex flex-column gap-3">
        <label>
          الاسم بالكامل
          <input
            className="input-group mt-2 p-2"
            type="text"
            placeholder="الاسم بالكامل"
          />
        </label>

        <label>
          رقم الجوال
          <input
            type="number"
            placeholder="رقم الجوال"
            className="input-group mt-2 p-2"
          />
        </label>

        <DeleveryOptions />

        <label>
          تاريخ الاستلام
          <input
            className="input-group justify-content-center mt-2 p-2"
            type="date"
            placeholder="تاريخ الاستلام"
          />
        </label>

        <textarea
          className="input-group p-2"
          rows="2"
          placeholder="ملاحظات الأوردر"
        ></textarea>

        <LocationOptions />
      </form>

      <OrderInfo />
    </div>
  </section>
);

function OrderInfo() {
  totalPrice = delivery + discount;

  const [useCreditCard, setCredit] = useState(true);

  const store = useStore().getState().Products,
    cart = store.cart,
    items = cart.map(productItem, store);

  return (
    <div className="col p-3">
      <span className="h5 title">الطلب</span>

      <hr />
      <ul className="list-unstyled m-0 p-0">{items}</ul>

      <hr />
      <div>
        <p>
          التوصيل
          <span>{delivery} ر.س</span>
        </p>
        <p>
          الخصم
          <span>{discount} ر.س</span>
        </p>
      </div>
      <hr />

      <p className="total">
        الإجمالي
        <span>{totalPrice} ر.س</span>
      </p>

      <div>
        <span className="d-block h5">طرق الدفع</span>
        <label className="d-flex gap-2 mb-2">
          <input
            type="radio"
            onClick={() => setCredit(true)}
            checked={useCreditCard}
          />
          بطاقات الائتمان
        </label>

        <label className="d-flex gap-2">
          <input
            type="radio"
            onClick={() => setCredit(false)}
            checked={!useCreditCard}
          />
          الدفع عند الاستلام
        </label>
      </div>

      <button
        type="button"
        className="btn d-flex justify-content-center mt-4 mx-auto w-100"
      >
        أكمل الدفع
      </button>
    </div>
  );
}

function productItem({ id, quantity }) {
  const itemData = this.data.find((p) => p.id === id);

  const price = itemData.price || Math.ceil(Math.random() * 10);
  totalPrice += price * quantity;

  return (
    <li
      className="align-items-center d-flex gap-3 justify-content-between"
      style={{ "font-size": "small", "font-weight": 600 }}
    >
      <span className="flex-grow-1" style={{ color: "var(--primary)" }}>
        {itemData.name}
      </span>
      <span>x {quantity}</span>
      <span>{price} ر.س</span>
    </li>
  );
}

/*<li class="" style="font-size: small;"><span style="color: var(--primary);;" class="">قالب شوكولاتة وفراولة</span><span>1 x</span><span>22.00 ر.س</span></li>
 */
