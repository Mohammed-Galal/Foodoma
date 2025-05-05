import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { calcWalletCashback } from "../Cart";
import { _useCoupon } from "../Cart";
import getPage from "../../translation";

const getText = getPage("checkout"),
  isArabic = window.localStorage.getItem("lang") === "العربية",
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
      <h5 className="title m-0 text-center d-block">{getText(18)}</h5>

      <hr />
      <ul className="list-unstyled m-0 p-0">{order.map(productItem)}</ul>
      <hr />
      <div>
        {getText(19)}
        <span style={{ color: "var(--primary)", fontWeight: "600" }}>
          {subTotal} {getText(20)}
        </span>
      </div>

      <div>
        {getText(21)}
        <span>
          {discountAmount === false
            ? getText(22)
            : -(Math.abs(discountAmount) + cashbackAmount) + " " + getText(20)}
        </span>
      </div>

      <hr />
      <div>
        <span>
          {getText(23)}{" "}
          {delivery && delivery_charges === 0 && (
            <sub
              className="px-2"
              style={{
                background: "#ffc933",
                color: "#fff",
                borderRadius: "14px",
              }}
            >
              {getText(24)}
            </sub>
          )}
        </span>

        <span>
          {delivery_charges} {getText(20)}
        </span>
      </div>

      {taxes > 0 && (
        <div>
          {getText(25)}({settings.taxPercentage}%)
          <span>
            {taxes.toLocaleString()} {getText(20)}
          </span>
        </div>
      )}

      <hr />

      <div>
        {getText(26)}
        <span>
          {-wallet_balance + " "} {getText(20)}
        </span>
      </div>

      <div
        className="total h5"
        style={{ color: "var(--primary)", fontWeight: "bold" }}
      >
        {getText(27)}

        {totalBeforeDiscount > totalPrice && (
          <sub
            style={{
              color: "var(--midgray)",
              marginInlineStart: "auto",
              marginInlineEnd: "6px",
            }}
          >
            <del>
              {totalBeforeDiscount.toLocaleString()} {getText(20)}
            </del>
          </sub>
        )}
        <span>
          {Math.max(0, totalPrice + taxes).toLocaleString()} {getText(20)}
        </span>
      </div>

      <form style={{ color: "var(--black)" }}>
        <span
          className="d-block h5 text-center"
          style={{ color: "var(--primary)" }}
        >
          {getText(28)}
        </span>

        <label className="d-flex gap-2 mb-3">
          <input
            type="radio"
            name="payment"
            onClick={() => setPaymentMethod("myfatoorah")}
            checked={paymentMethod === "myfatoorah"}
          />
          {getText(29)}
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
              {getText(30)}
            </label>
          ))}
      </form>

      {(!delivery || userAddresses.length > 0) && (
        <button
          type="button"
          onClick={placeOrder}
          className="btn mt-4 mx-auto w-100"
        >
          {getText(31)}
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
        {price} {getText(20)}
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
