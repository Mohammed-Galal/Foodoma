/* eslint-disable import/no-anonymous-default-export */
import getText from "../../translation";
import { _useCoupon, calcCashback } from "../Cart";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect, useState } from "react";
import NXT from "../../icons/NXT";
import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const placeOrderApi = "https://admin.montana.sa/public/api/place-order",
  basicBodyReq = {},
  defaultLoc = {
    lat: "",
    lng: "",
  },
  addresItemStyle = {
    width: "100%",
    border: "2px solid #a8d0ec",
    borderRadius: "8px",
  },
  emptyStr = "";

let closestRes = null;

export default function () {
  const { User, Restaurant, Products } = useSelector((e) => e),
    [delivery, setDelivery] = useState(false),
    [activeAddress, setActiveAddress] = useState(0),
    dispatch = useDispatch(),
    redirect = useNavigate();

  closestRes = null;

  const customProps = {
      is_special: false,
      comment: "",
    },
    userAddresses = User.addresses;

  if (delivery) {
    basicBodyReq.location.lat = userAddresses[activeAddress]?.latitude;
    basicBodyReq.location.lng = userAddresses[activeAddress]?.longitude;
  } else basicBodyReq.location = defaultLoc;

  const deliveryCharges = +Restaurant.data.delivery_charges;
  useLayoutEffect(() => {
    User.loaded || redirect("/user/login");
    Products.cart.length || redirect("/cart");
    if (delivery && userAddresses.length) {
      fetch("https://admin.montana.sa/public/api/get-delivery-restaurants", {
        method: "POST",
        body: JSON.stringify(userAddresses[activeAddress]),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((r) => (closestRes = r[0] || false));
    }
  }, [delivery, activeAddress]);

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
      <div
        id="closest-res"
        popover="manual"
        className="px-5 py-3 text-center"
        style={{
          color: "var(--midgray)",
          borderColor: "#c9e2f4",
          borderRadius: "8px",
        }}
      >
        <b className="text-danger" style={{ fontSize: "larger" }}>
          تنبيه
        </b>

        <p className="my-3">
          تبين أن العنوان الذي قمت باختياره خارج نطاق تغطية الفرع الحالي
        </p>

        <div className="d-flex gap-2 justify-content-evenly">
          <button
            type="button"
            className="btn flex-grow-1"
            style={{
              backgroundColor: "var(--primary)",
              color: "#fff",
              maxWidth: "50%",
            }}
            onClick={() => {
              document.getElementById("closest-res").hidePopover();
              setDelivery(false);
            }}
          >
            الاستلام من الفرع
          </button>

          <button
            type="button"
            className="btn flex-grow-1"
            style={{
              backgroundColor: "var(--primary)",
              color: "#fff",
              maxWidth: "50%",
            }}
            onClick={() => {
              if (closestRes) {
                debugger;
                fetch(
                  "https://admin.montana.sa/get-restaurant-items/" +
                    closestRes.slug,
                  { headers: { "Content-type": "application/json" } }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    dispatch({ type: "restaurant/init", payload: closestRes });
                    dispatch({ type: "products/init", payload: data });
                    // Redirect to the restaurant page
                    redirect("/");
                  });
              } else alert("لا يوجد فرع قريب");
            }}
          >
            اختيار اقرب فرع
          </button>
        </div>
      </div>

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

          {delivery &&
            (userAddresses.length ? (
              <ul
                className="align-items-stretch d-flex gap-2 list-unstyled m-0 p-0 w-100"
                style={{ gridColumnStart: "span 2" }}
              >
                {items}
              </ul>
            ) : (
              <p className="my-2" style={{ color: "var(--midgray)" }}>
                <b className="d-block text-danger">تنبيه</b>
                يرجى اضافة عنوان اولاً حتى تتمكن من اكمال الدفع
                <button
                  type="button"
                  className="btn d-block mt-2 mx-auto px-5"
                  style={{ background: "var(--primary)", color: "#fff" }}
                  onClick={() => redirect("/settings/addresses")}
                >
                  اضافة عنوان
                </button>
              </p>
            ))}

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
          renderBtn={!delivery || !!userAddresses.length}
          cart={Products.cart}
          products={Products}
          cashback={Products.cashback}
          delivery={delivery_charges}
          restaurant_id={Restaurant.data.id}
          totalPrice={totalPrice}
          placeOrder={placeOrder}
        />
      </div>
    </section>
  );

  function placeOrder(cashbackVal) {
    if (delivery && !checkResCoverage(Restaurant.data)) return;

    const images = customProps.images,
      formData = new FormData();

    const reqBody = {
      ...basicBodyReq,
      ...customProps,
      order,
      cashback: cashbackVal,
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

function OrderInfo({
  renderBtn,
  cart,
  cashback,
  delivery,
  restaurant_id,
  placeOrder,
  totalPrice,
}) {
  // const [useCreditCard, setCredit] = useState(false);

  const items = cart.map(productItem);
  const cashbackVal = +calcCashback(totalPrice, cashback),
    [discount, setDiscount] = useState(0);

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

  totalPrice -= cashbackVal;

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
              : Math.abs(discount) +
                cashbackVal +
                " " +
                getText("checkout", 16)}
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

      {renderBtn && (
        <button
          type="button"
          onClick={() => placeOrder(cashbackVal)}
          className="btn mt-4 mx-auto w-100"
        >
          {getText("checkout", 15)}
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

function checkResCoverage(currRes) {
  // if the closest restaurant is not loaded yet
  if (closestRes === null) return false;
  // if there's no closest restaurant
  // or if the closest restaurant  is not the same as the current Restaurant
  else if (closestRes === false || closestRes.id !== currRes.id) {
    document.getElementById("closest-res").showPopover();
    return false;
  }
}
