import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import { _useCoupon } from "../Cart";
import { updateUserInfo } from "../../store";

import NXT from "../../icons/NXT";
import OrderOptions from "./OrderOptions";
import OrderInfo from "./OrderInfo";
import "./index.scss";

const complimentaryData = {},
  placeOrderApi = process.env.REACT_APP_API_URL + "/public/api/place-order",
  days = [/^sun/i, /^mon/i, /^tue/i, /^wed/i, /^thu/i, /^fri/i, /^sat/i],
  exceptionalCategories = [undefined, "الحجز المبكر"],
  emptyStr = "";

export default function () {
  const redirect = useNavigate(),
    store = useStore().getState(),
    dispatch = useDispatch(),
    deliveryState = useState(true),
    resIdState = useState(null);

  const reqBody = useRef({
      is_special: false,
      images: [],
      phrase: "",
      order_comment: "",
      comment: "",
      location: {},
      coupon: { code: emptyStr },
      user: { data: { default_address: {} } },
    }).current,
    clues = useRef({}).current;

  const currRes = store.Restaurant.data,
    resId = currRes.id,
    userAuthientcated = store.User.loaded,
    cartItems = store.Products.cart;

  clues.isExceptionalCart = checkForExceptionalItems(cartItems);
  clues.userAddresses = store.User.addresses;
  clues.closestRes = null;
  clues.cashback = store.Products.cashback;
  clues.deliveryCharges = store.Restaurant.data.delivery_charges;

  useEffect(function () {
    userAuthientcated || redirect("/user/login");
    cartItems.length || redirect("/cart");
  });

  useLayoutEffect(
    function () {
      resIdState[1](clues.isExceptionalCart ? resId : null);
    },
    [resId, clues.isExceptionalCart]
  );

  if (cartItems.length === 0) return "جاري اعادة التوجيه";

  return (
    <section id="checkout">
      <ul className="d-flex gap-2 justify-content-center list-unstyled mb-5 mx-auto p-0">
        <li>{"السلة"}</li>
        <li>{NXT}</li>
        <li className="h5 m-0">{"الدفع"}</li>
        <li>{NXT}</li>
        <li>{"تأكيد الطلب"}</li>
      </ul>

      <div className="align-items-start container d-flex flex-column flex-xl-row gap-3 justify-content-center">
        <OrderOptions
          reqBody={reqBody}
          clues={clues}
          resIdState={resIdState}
          deliveryState={deliveryState}
        />
        <OrderInfo
          reqBody={reqBody}
          clues={clues}
          resId={resIdState[0] || resId}
          cartItems={cartItems}
          deliveryState={deliveryState}
          placeOrder={placeOrder}
        />
      </div>

      <TimeWarning placeOrder={placeOrder} />
      <ClosestResPopup
        setDelivery={deliveryState[1]}
        closestRes={clues.closestRes}
        dispatch={dispatch}
        redirect={redirect}
      />
    </section>
  );

  function placeOrder(ignoreWorkingHours) {
    if (deliveryState[0] && !checkResCoverage(currRes, clues.closestRes))
      return;

    if (!isWithinWorkingHours(currRes) && !ignoreWorkingHours)
      return document.getElementById("time-warning").showPopover();

    const images = reqBody.images || [],
      formData = new FormData();

    Object.assign(reqBody, complimentaryData);
    appendFormData(formData, reqBody);

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++)
        formData.append("images[]", images[i], images[i].name);
    }

    const fetchOpts = {
      method: "POST",
      body: formData,
      headers: { Authorization: window.localStorage.getItem("token") },
    };

    fetch(placeOrderApi, fetchOpts)
      .then((r) => r.json())
      .then(handleInvoice)
      .catch(console.log);
  }

  function handleInvoice(res) {
    if (res.success === false) return alert("حدث خطأ");

    updateUserInfo();

    window.localStorage.removeItem("coupon");
    dispatch({ type: "products/clearCart" });

    const paymentMode = res.data.payment_mode,
      basicOrderData = {
        order: reqBody.order,
        discount: clues.discount,
        deliveryType: "من الفرع",
        deliveryAddress: currRes.name,
        deliveryCharges: deliveryState[0] ? currRes.delivery_charges : 0,
        restaurant_charge: currRes.restaurant_charges,
        paymentMode: paymentMode === "COD" ? "عند الاستلام" : paymentMode,
      };

    if (deliveryState[0]) {
      basicOrderData.deliveryType = "توصيل";
      basicOrderData.deliveryAddress =
        clues.userAddresses[store.User.activeAddressIndex].tag;
    }

    if (paymentMode !== "COD") {
      window.localStorage.setItem(
        "invoiceData",
        JSON.stringify(basicOrderData)
      );
      return (window.location.href = res.data.link);
    }

    const { data } = res,
      invoiceState = {
        ...basicOrderData,
        date: data.created_at.split(" "),
        comment: data.order_comment,
        code: data.unique_order_id,
        PIN: data.delivery_pin,
        tax_amount: data.tax_amount,
        total: data.total,
        price: data.payable,
        subTotal: data.sub_total,
      };

    redirect("/invoice", { state: invoiceState });
  }
}

function ClosestResPopup({ setDelivery, closestRes, dispatch, redirect }) {
  return (
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
        {"تنبيه"}
      </b>

      <p className="my-3">
        {"تبين أن العنوان الذي قمت باختياره خارج نطاق تغطية الفرع الحالي"}
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
          {"الاستلام من الفرع"}
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
              fetch(
                process.env.REACT_APP_API_URL +
                  "/public/api/get-restaurant-items/" +
                  closestRes.slug,
                {
                  method: "POST",
                  headers: { "Content-type": "application/json" },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  dispatch({ type: "restaurant/init", payload: closestRes });
                  dispatch({ type: "products/init", payload: data });
                  // Redirect to the home page
                  redirect("/");
                });
            } else alert("لا يوجد فرع قريب");

            document.getElementById("closest-res").hidePopover();
          }}
        >
          {"اختيار اقرب فرع"}
        </button>
      </div>
    </div>
  );
}

function TimeWarning({ placeOrder }) {
  return (
    <div
      id="time-warning"
      popover="manual"
      style={{
        borderColor: "aliceblue",
        borderRadius: "8px",
      }}
    >
      <div
        className="d-flex flex-wrap gap-3 px-5 py-3 text-center justify-content-center"
        style={{
          color: "var(--midgray)",
        }}
      >
        <b className="text-danger w-100">{"اشعار بالمواعيد"}</b>
        {
          "هذا الفرع مغلق الآن، يرجى العلم أن الفرع لن تمكن من قبول طلبكم قبل بدأ ساعات العمل الرسمية"
        }
        <br />
        {"هل مازلت تريد متابعة تقديم الطلب؟"}
        <button
          type="button"
          className="btn"
          style={{
            flex: "1 0 45%",
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
          onClick={() => placeOrder(true)}
        >
          {"المتابعة"}
        </button>
        <button
          type="button"
          className="btn"
          style={{
            flex: "1 0 45%",
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
          onClick={() => document.getElementById("time-warning").hidePopover()}
        >
          {"الغاء"}
        </button>
      </div>
    </div>
  );
}

// =======================  UTILS  =============================
function checkResCoverage(currRes, closestRes) {
  // if the closest restaurant is not loaded yet
  if (closestRes === null) return false;
  // if there's no closest restaurant
  // or if the closest restaurant  is not the same as the current Restaurant
  else if (closestRes === false || closestRes.id !== currRes.id) {
    document.getElementById("closest-res").showPopover();
    return false;
  }

  return true;
}

function isWithinWorkingHours({ workingHours }) {
  if (workingHours) {
    const currTime = new Date(),
      day = days[currTime.getDay()];

    const targetDay = Object.keys(workingHours).find((d) => day.test(d));

    if (targetDay) {
      const resData = workingHours[targetDay],
        hours = currTime.getHours();

      return (
        Math.max(hours, +resData.open.slice(0, 2)) === hours &&
        Math.min(hours, +resData.close.slice(0, 2)) === hours
      );
    }
  }

  return true;
}

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

function checkForExceptionalItems(cartItems) {
  return cartItems.some((item) => {
    const category = item.category_name,
      exceptional = exceptionalCategories.includes(category);
    return exceptional;
  });
}

Object.assign(complimentaryData, {
  tipAmount: "",
  cash_change_amount: "",
  pending_payment: "",
  // partial_wallet: "",
  is_scheduled: "",
  schedule_date: "",
  schedule_slot: "",
  auto_acceptable: false,
  CallBackUrl: window.location.origin + "/invoice/",
});
