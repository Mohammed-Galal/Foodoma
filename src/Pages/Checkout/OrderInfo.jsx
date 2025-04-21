import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { calcWalletCashback } from "../Cart";
import { _useCoupon } from "../Cart";

const isArabic = window.localStorage.getItem("lang") === "العربية",
  nameTarget = isArabic ? "name_ar" : "name",
  emptyStr = "";

export default function (props) {
  const {
      reqBody,
      placeOrder,
      cartItems,
      deliveryState,
      clues,
      resId,
      payment,
    } = props,
    { userAddresses, isExceptionalCart, cashback } = clues;

  const store = useStore().getState(),
    settings = store.settings.data,
    currRes = store.Restaurant.data,
    freeDeliverySubtotal = currRes.free_delivery_subtotal,
    wallet_balance = store.User.data.wallet_balance,
    [delivery] = deliveryState,
    [paymentMethod, setPaymentMethod] = payment,
    [discountAmount, setDiscount] = useState(0);

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

  const subTotal = totalPrice,
    cashbackAmount = +calcWalletCashback(totalPrice, cashback),
    calcSubtotalDelivery =
      freeDeliverySubtotal > 0 && totalPrice >= freeDeliverySubtotal
        ? 0
        : clues.deliveryCharges,
    delivery_charges = delivery ? +calcSubtotalDelivery : 0;

  reqBody.order = order;
  reqBody.method = paymentMethod;
  reqBody.cashback = cashbackAmount;
  coupon && (reqBody.coupon.code = coupon);

  clues.discount = cashbackAmount;
  discountAmount && (clues.discount += Math.abs(discountAmount));
  totalPrice += delivery_charges;

  const taxes =
    settings.taxApplicable === "true"
      ? calcTaxes(totalPrice - clues.discount, +settings.taxPercentage)
      : 0;

  clues.discount += wallet_balance;
  totalPrice -= clues.discount;

  const totalBeforeDiscount = subTotal + taxes + delivery_charges;
  const deliveryTargetOption = delivery ? "enCODonDelivery" : "enCODonSF";

  return (
    <div className="p-3" style={{ color: "var(--midgray)" }}>
      <span className="h5 title text-center d-block">{"الطلب"}</span>

      <hr />
      <ul className="list-unstyled m-0 p-0">{order.map(productItem)}</ul>
      <hr />
      <p>
        {"المجموع"}
        <span style={{ color: "var(--primary)", fontWeight: "600" }}>
          {subTotal} {"ر.س"}
        </span>
      </p>

      <p>
        {"الخصم"}
        <span>
          {discountAmount === false
            ? "جاري التحقق"
            : -(Math.abs(discountAmount) + cashbackAmount) + " " + "ر.س"}
        </span>
      </p>

      <hr />
      <p>
        <span>
          {"رسوم التوصيل"}{" "}
          {delivery && delivery_charges === 0 && (
            <sub
              className="px-2"
              style={{
                background: "#ffc933",
                color: "#fff",
                borderRadius: "14px",
              }}
            >
              {"توصيل مجاني"}
            </sub>
          )}
        </span>

        <span>
          {delivery_charges} {"ر.س"}
        </span>
      </p>

      {taxes > 0 && (
        <p>
          {"ضرائب "}({settings.taxPercentage}%)
          <span>
            {taxes.toLocaleString()} {"رس"}
          </span>
        </p>
      )}

      <hr />

      <p>
        {"رصيد المحفظة"}
        <span>
          {-wallet_balance + " "} {"رس"}
        </span>
      </p>

      <p
        className="total h5"
        style={{ color: "var(--primary)", fontWeight: "bold" }}
      >
        {"الإجمالي"}

        {totalBeforeDiscount > totalPrice && (
          <sub
            style={{
              color: "var(--midgray)",
              marginInlineStart: "auto",
              marginInlineEnd: "6px",
            }}
          >
            <del>
              {totalBeforeDiscount.toLocaleString()} {"ر.س"}
            </del>
          </sub>
        )}
        <span>
          {Math.max(0, totalPrice + taxes).toLocaleString()} {"ر.س"}
        </span>
      </p>

      <form style={{ color: "var(--black)" }}>
        <span
          className="d-block h5 text-center"
          style={{ color: "var(--primary)" }}
        >
          {"طرق الدفع"}
        </span>

        <label className="d-flex gap-2 mb-3">
          <input
            type="radio"
            name="payment"
            onClick={() => setPaymentMethod("myfatoorah")}
            checked={paymentMethod === "myfatoorah"}
          />
          {"ادفع الآن"}
        </label>

        {isExceptionalCart ||
          (settings[deliveryTargetOption] === "true" && (
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

function calcTaxes(price, percentage) {
  return (percentage / 100) * price;
}
