import { useEffect, useLayoutEffect, useState } from "react";
import { useStore } from "react-redux";
import { calcCashback } from "../Cart";
import { _useCoupon } from "../Cart";

const isArabic = window.localStorage.getItem("lang") === "العربية",
  nameTarget = isArabic ? "name_ar" : "name",
  emptyStr = "";

export default function (props) {
  const { reqBody, placeOrder, cartItems, deliveryState, clues, resId } = props,
    { userAddresses, isExceptionalCart, cashback } = clues;

  const store = useStore().getState(),
    currRes = store.Restaurant.data,
    freeDeliverySubtotal = currRes.free_delivery_subtotal,
    wallet_balance = store.User.data.wallet_balance,
    [delivery] = deliveryState,
    [paymentMethod, setPaymentMethod] = useState("myfatoorah"),
    [discountAmount, setDiscount] = useState(0);

  useLayoutEffect(
    function () {
      delivery && setPaymentMethod("myfatoorah");
    },
    [delivery, isExceptionalCart]
  );

  let totalPrice = 0;

  const coupon = window.localStorage.getItem("coupon"),
    order = cartItems.map((CI) => {
      totalPrice += +CI.price * CI.quantity;
      CI.customProps && Object.assign(reqBody, CI.customProps);
      return extractData(CI, resId);
    });

  useEffect(
    function () {
      if (coupon) {
        setDiscount(false);
        const token = window.localStorage.getItem("token"),
          couponParams = {
            coupon,
            restaurant_id: "" + currRes.id,
            subtotal: "" + totalPrice,
          };
        _useCoupon(couponParams, token, applyCoupon, rejectCoupon);
      }
    },
    [coupon]
  );

  const cashbackAmount = +calcCashback(totalPrice, cashback),
    calcSubtotalDelivery =
      freeDeliverySubtotal > 0 && totalPrice >= freeDeliverySubtotal
        ? 0
        : clues.deliveryCharges,
    delivery_charges = delivery ? calcSubtotalDelivery : 0;

  reqBody.order = order;
  reqBody.method = paymentMethod;
  reqBody.cashback = cashbackAmount;
  coupon && (reqBody.coupon.code = coupon);

  totalPrice -= cashbackAmount;
  totalPrice += +delivery_charges;

  clues.discount = cashbackAmount + wallet_balance;
  discountAmount && (clues.discount += Math.abs(discountAmount));

  return (
    <div className="p-3" style={{ color: "var(--midgray)" }}>
      <span className="h5 title text-center d-block">{"الطلب"}</span>

      <hr />
      <ul className="list-unstyled m-0 p-0">{order.map(productItem)}</ul>
      <hr />

      <p>
        {"رسوم التوصيل"}
        <span>
          {delivery ? clues.deliveryCharges : 0} {"ر.س"}
        </span>
      </p>

      <hr />

      <div>
        <p>
          {"رصيد المحفظة"}
          <span>
            {wallet_balance + " "} {"رس"}
          </span>
        </p>
        <p>
          {"الخصم"}
          <span>
            {discountAmount === false
              ? "جاري التحقق"
              : Math.abs(discountAmount) + cashbackAmount + " " + "ر.س"}
          </span>
        </p>
      </div>

      <hr />
      <p>
        {"الضرائب"}
        <span>
          {0 + " "} {"رس"}
        </span>
      </p>

      <hr />

      <p className="total" style={{ color: "var(--black)" }}>
        {"الإجمالي"}
        <span>
          {totalPrice - wallet_balance + +discountAmount} {"ر.س"}
        </span>
      </p>

      <form style={{ color: "var(--black)" }}>
        <span className="d-block h5">{"طرق الدفع"}</span>

        <label className="d-flex gap-2 mb-2">
          <input
            type="radio"
            name="payment"
            onClick={() => setPaymentMethod("myfatoorah")}
            checked={paymentMethod === "myfatoorah"}
          />
          {"بطاقات الائتمان"}
        </label>

        {isExceptionalCart ||
          (!delivery && (
            <label className="d-flex gap-2">
              <input
                type="radio"
                name="payment"
                onClick={() => setPaymentMethod("COD")}
                checked={paymentMethod === "COD"}
              />
              {"الدفع عند الاستلام"}
            </label>
          ))}
      </form>

      {(!delivery || userAddresses.length > 0) && (
        <button
          type="button"
          onClick={placeOrder}
          className="btn mt-4 mx-auto w-100"
        >
          {"أكمل الدفع"}
        </button>
      )}
    </div>
  );

  function applyCoupon(res) {
    const { discount_type, discount } = res,
      value =
        discount_type === "PERCENTAGE"
          ? (totalPrice / 100) * +discount
          : +discount;

    setDiscount(-Math.floor(value));
  }

  function rejectCoupon() {
    setDiscount(0);
    window.localStorage.removeItem("coupon");
  }
}

function productItem(item) {
  const { id, quantity, price, name } = item;
  return (
    <li
      key={id}
      className="align-items-center d-flex gap-3 justify-content-between"
      style={{
        "font-size": "small",
        "font-weight": 600,
      }}
    >
      <span className="flex-grow-1" style={{ color: "var(--primary)" }}>
        {item[nameTarget] || name}
      </span>
      <span>x {quantity}</span>
      <span>
        {price} {"ر.س"}
      </span>
    </li>
  );
}

function extractData(i, restaurant_id) {
  const { id, name, price } = i;

  return {
    name: i[nameTarget] || name,
    restaurant_id: +restaurant_id,
    id: emptyStr + id,
    price: emptyStr + price,
    quantity: emptyStr + i.quantity,
    selectedaddons: i.addons.map((a) => ({ ...a, price: emptyStr + a.price })),
  };
}
