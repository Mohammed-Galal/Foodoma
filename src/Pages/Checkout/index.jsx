import { useStore } from "react-redux";
import { useState } from "react";
import { delivery, discount } from "../Cart";

import DeleveryOptions from "./DeleveryOptions";
import LocationOptions from "./LocationOptions";

import NXT from "../../icons/NXT";

let totalPrice;

export default (
  <section id="checkout">
    <ul>
      <li>السلة</li>
      <li>{NXT}</li>
      <li>الدفع</li>
      <li>{NXT}</li>
      <li>تأكيد الطلب</li>
    </ul>

    <div className="container">
      <form>
        <label>
          الاسم بالكامل
          <input type="text" placeholder="الاسم بالكامل" />
        </label>

        <label>
          رقم الجوال
          <input type="tel" placeholder="رقم الجوال" />
        </label>

        <DeleveryOptions />

        <label>
          تاريخ الاستلام
          <input type="date" placeholder="تاريخ الاستلام" />
        </label>

        <textarea rows="2" placeholder="ملاحظات الأوردر"></textarea>

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
    <div>
      <span className="title">الطلب</span>
      <hr />
      <ul>{items}</ul>
      <hr />
      <div>
        <p>
          <span>التوصيل</span>
          {delivery} ر.س
        </p>
        <p>
          <span>الخصم</span>
          {discount} ر.س
        </p>
      </div>
      <hr />
      <p className="total">
        <span>الإجمالي</span>
        {totalPrice} ر.س
      </p>

      <div>
        <span>طرق الدفع</span>
        <label>
          <input
            type="radio"
            onClick={() => setCredit(true)}
            checked={useCreditCard}
          />
          بطاقات الائتمان
        </label>

        <label>
          <input
            type="radio"
            onClick={() => setCredit(false)}
            checked={!useCreditCard}
          />
          الدفع عند الاستلام
        </label>
      </div>

      <button type="button" className="btn">
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
    <li>
      <span>{itemData.name}</span>
      {quantity} x {price} ر.س
    </li>
  );
}
