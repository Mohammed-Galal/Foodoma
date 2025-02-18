/* eslint-disable import/no-anonymous-default-export */
import getText from "../../translation";
import { _useCoupon } from "../Cart";
import { useDispatch, useStore } from "react-redux";
import { useLayoutEffect, useState } from "react";
import NXT from "../../icons/NXT";
import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const placeOrderApi = "https://mon10.amir-adel.com/public/api/place-order",
  basicBodyReq = {},
  addresItemStyle = {
    width: "100%",
    border: "2px solid #a8d0ec",
    borderRadius: "8px",
  },
  emptyStr = "";

export default function () {
  const { User, Restaurant, Products } = useStore().getState(),
    [delivery, setDelivery] = useState(false),
    [activeAddress, setActiveAddress] = useState(0),
    dispatch = useDispatch(),
    redirect = useNavigate();

  const customProps = {
      is_special: false,
      comment: "",
    },
    userAddresses = User.addresses;

  const deliveryCharges = +Restaurant.data.delivery_charges;
  useLayoutEffect(() => {
    User.loaded || redirect("/user/login");
    Products.cart.length || redirect("/cart");
    userAddresses.length || redirect("/settings/addresses");
  });

  let totalPrice = 0;

  const order = Products.cart.map((CI) => {
    totalPrice += +CI.totalPrice;
    CI.customProps && Object.assign(customProps, CI.customProps);
    return extractData(CI);
  });

  const items = userAddresses.map((e, i) => (
    <li
      key={i}
      style={addresItemStyle}
      value={e.id}
      data-active={activeAddress === i}
    >
      <label
        onClick={() => setActiveAddress(i)}
        className="align-items-center d-flex gap-2 h-100 justify-content-start px-3 py-1 w-100"
      >
        <img src="/assets/settings/address.png" alt="icon" />

        <div
          className="d-grid gap-2"
          style={{ cssText: "color: var(--midgray); font-weight: 600" }}
        >
          <span
            style={{
              cssText: "color: var(--primary); font-weight: bold",
            }}
            className="h5 m-0"
          >
            {e.tag}
          </span>
        </div>
      </label>
    </li>
  ));

  const calcSubtotalDelivery =
      totalPrice >= Restaurant.data.free_delivery_subtotal
        ? 0
        : deliveryCharges,
    delivery_charges = delivery ? calcSubtotalDelivery : 0;

  totalPrice += delivery_charges;

  return (
    <section id="checkout">
      <ul className="d-flex gap-2 justify-content-center list-unstyled mb-5 mx-auto p-0">
        <li>{getText("checkout", 0)}</li>
        <li>{NXT}</li>
        <li className="h5 m-0">{getText("checkout", 1)}</li>
        <li>{NXT}</li>
        <li>{getText("checkout", 2)}</li>
      </ul>

      <div className="align-items-stretch container d-flex flex-column flex-xl-row gap-3 justify-content-center">
        <fieldset
          className="d-flex flex-column gap-3 p-3 w-100"
          style={{
            border: "1px solid rgb(241, 241, 241)",
            borderRadius: "16px",
          }}
        >
          <legend
            className="float-none mx-auto px-3 mb-0"
            style={{
              alignSelf: "center",
              color: "var(--primary)",
              width: "auto",
            }}
          >
            {getText("checkout", 3)}
          </legend>

          <div
            className="d-flex flex-wrap gap-2"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-100">{getText("checkout", 4)}</span>
            <button
              className="btn d-flex align-items-center gap-2"
              data-active={!delivery}
              onClick={() => setDelivery(false)}
            >
              <img
                style={{
                  maxHeight: "25px",
                  filter: "grayscale(" + +delivery + ")",
                }}
                src="https://mon10.doobagency.com/assets/img/various/self-pickup.png"
                alt="branch"
              />
              {getText("checkout", 5)}
            </button>
            <button
              className="btn d-flex align-items-center gap-2"
              data-active={delivery}
              onClick={() => setDelivery(true)}
            >
              <img
                style={{
                  maxHeight: "25px",
                  filter: "grayscale(" + +!delivery + ")",
                }}
                src="https://mon10.doobagency.com/assets/img/various/home-delivery.png"
                alt="delivery"
              />
              {getText("checkout", 6)}
            </button>
          </div>

          <ul
            className="align-items-stretch d-flex gap-2 list-unstyled m-0 p-0 w-100"
            style={{ gridColumnStart: "span 2" }}
          >
            {delivery && items}
          </ul>

          <textarea
            placeholder={getText("checkout", 7)}
            className="input-group-text mt-auto"
            defaultValue={customProps.comment}
            onChange={({ target }) => (customProps.comment = target.value)}
            style={{
              resize: "none",
              width: "100%",
              textAlign: "right",
              borderColor: "#e9f3fa !important",
              backgroundColor: "#fbfbfb",
              outline: "none",
            }}
          ></textarea>
        </fieldset>

        <OrderInfo
          cart={Products.cart}
          products={Products}
          delivery={delivery_charges}
          restaurant_id={Restaurant.data.id}
          totalPrice={totalPrice}
          placeOrder={placeOrder}
        />
      </div>
    </section>
  );

  function placeOrder() {
    const images = customProps.images,
      formData = new FormData();

    const reqBody = {
      ...basicBodyReq,
      ...customProps,
      order,
      user: { data: { default_address: userAddresses[activeAddress] } },
      delivery_type: delivery ? "1" : "2",
      coupon: { code: window.localStorage.getItem("coupon") || emptyStr },
      method: "COD",
      order_comment: customProps.comment,
    };

    appendFormData(formData, reqBody);

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        // Append each file to the FormData object
        formData.append("images[]", images[i], images[i].name);
      }
    }

    const fetchOpts = {
      method: "POST",
      body: formData,
      headers: { Authorization: window.localStorage.getItem("token") },
    };

    fetch(placeOrderApi, fetchOpts)
      .then((r) => r.json())
      .then(handleInvoice)
      .catch((e) => alert(getText("checkout", 8)));
  }

  function handleInvoice({ data }) {
    window.localStorage.removeItem("coupon");

    const invoiceState = {
      order,
      date: data.created_at.split(" "),
      comment: data.order_comment,
      code: data.unique_order_id,
      PIN: data.delivery_pin,
      deliveryType: getText("checkout", 9),
      deliveryAddress: Restaurant.data.name,
      paymentMode: getText("checkout", 10),
      price: data.total,
      deliveryCharges: delivery_charges,
      total: data.total + delivery_charges,
      subTotal: data.sub_total,
    };

    if (delivery) {
      invoiceState.deliveryType = getText("checkout", 6);
      invoiceState.deliveryAddress = userAddresses[activeAddress].tag;
    }

    dispatch({ type: "products/clearCart" });
    redirect("/invoice", { state: invoiceState });
  }
}

function OrderInfo({ cart, delivery, restaurant_id, placeOrder, totalPrice }) {
  // const [useCreditCard, setCredit] = useState(false);
  const [discount, setDiscount] = useState(0);
  const items = cart.map(productItem);

  useLayoutEffect(() => {
    const coupon = window.localStorage.getItem("coupon");

    if (coupon) {
      setDiscount(false);

      const token = window.localStorage.getItem("token"),
        couponParams = {
          coupon,
          restaurant_id: "" + restaurant_id,
          subtotal: "" + totalPrice,
        };

      _useCoupon(couponParams, token, applyCoupon, rejectCoupon);
    }
  }, []);

  return (
    <div className="p-3">
      <span className="h5 title text-center">{getText("checkout", 11)}</span>

      <hr />
      <ul className="list-unstyled m-0 p-0">{items}</ul>

      <hr />
      <div>
        <p>
          {getText("checkout", 12)}
          <span>
            {delivery} {getText("checkout", 16)}
          </span>
        </p>
        <p>
          {getText("checkout", 13)}
          <span>
            {discount === false
              ? "جاري التحقق"
              : Math.abs(discount) + " " + getText("checkout", 16)}
          </span>
        </p>
      </div>
      <hr />

      <p className="total">
        {getText("checkout", 14)}
        <span>
          {totalPrice + +discount} {getText("checkout", 16)}
        </span>
      </p>
      {/* 
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
      </div> */}

      <button
        type="button"
        onClick={placeOrder}
        className="btn mt-4 mx-auto w-100"
      >
        {getText("checkout", 15)}
      </button>
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

function productItem({ id, quantity, price, name }) {
  return (
    <li
      key={id}
      className="align-items-center d-flex gap-3 justify-content-between"
      style={{ "font-size": "small", "font-weight": 600 }}
    >
      <span className="flex-grow-1" style={{ color: "var(--primary)" }}>
        {name}
      </span>
      <span>x {quantity}</span>
      <span>
        {price} {getText("checkout", 16)}
      </span>
    </li>
  );
}

//================ Utils
function extractData(i) {
  const { restaurant_id, id, name, price } = i;

  return {
    name,
    restaurant_id: +restaurant_id,
    id: emptyStr + id,
    price: emptyStr + price,
    quantity: emptyStr + i.quantity,
    selectedaddons: i.addons.map((a) => ({ ...a, price: emptyStr + a.price })),
  };
}

Object.assign(basicBodyReq, {
  tipAmount: "",
  cash_change_amount: "",
  pending_payment: "",
  partial_wallet: "",
  is_scheduled: "",
  schedule_date: "",
  schedule_slot: "",
  auto_acceptable: false,
  location: {
    lat: "",
    lng: "",
  },
});

function appendFormData(fd, data, parentKey = "") {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    Object.keys(data).forEach((key) => {
      appendFormData(fd, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else if (Array.isArray(data)) {
    data.forEach((item, index) => {
      appendFormData(fd, item, `${parentKey}[${index}]`);
    });
  } else {
    fd.append(parentKey, data === null ? "" : data);
  }
}
