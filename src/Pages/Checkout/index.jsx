/* eslint-disable import/no-anonymous-default-export */
import { useDispatch, useStore } from "react-redux";
import { useLayoutEffect, useState } from "react";
import NXT from "../../icons/NXT";
import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const discount = 0;

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
    userAddresses = User.addresses,
    delivery_charges = delivery ? +Restaurant.data.delivery_charges : 0;

  useLayoutEffect(() => {
    User.loaded || redirect("/user/login");
    Products.cart.length || redirect("/cart");
    userAddresses.length || redirect("/settings/addresses");
  });

  let totalPrice = delivery_charges;

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
            class="h5 m-0"
          >
            {e.tag}
          </span>
        </div>
      </label>
    </li>
  ));

  return (
    <section id="checkout">
      <ul className="d-flex gap-2 justify-content-center list-unstyled mb-5 mx-auto p-0">
        <li>السلة</li>
        <li>{NXT}</li>
        <li className="h5 m-0">الدفع</li>
        <li>{NXT}</li>
        <li>تأكيد الطلب</li>
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
            بيانات الاستلام
          </legend>

          <div
            className="d-flex flex-wrap gap-2"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-100">طريقة الاستلام</span>
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
              الاستلام من الفرع
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
              توصيل
            </button>
          </div>

          <ul
            className="align-items-stretch d-flex gap-2 list-unstyled m-0 p-0 w-100"
            style={{ gridColumnStart: "span 2" }}
          >
            {delivery && items}
          </ul>

          <textarea
            placeholder="ملاحظات"
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
      coupon: { code: "" },
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
      .catch((e) => alert("حدث خطأ"));
  }

  function handleInvoice({ data }) {
    const invoiceState = {
      order,
      date: data.created_at.split(" "),
      comment: data.order_comment,
      code: data.unique_order_id,
      PIN: data.delivery_pin,
      deliveryType: "من الفرع",
      deliveryAddress: Restaurant.data.name,
      paymentMode: "عند الاستلام",
      price: totalPrice - delivery_charges,
      deliveryCharges: delivery_charges,
      total: totalPrice,
    };

    if (delivery) {
      invoiceState.deliveryType = "توصيل";
      invoiceState.deliveryAddress = userAddresses[activeAddress].tag;
    }

    dispatch({ type: "products/clearCart" });
    redirect("/invoice", { state: invoiceState });
  }
}

function OrderInfo({ cart, delivery, products, placeOrder, totalPrice }) {
  // const [useCreditCard, setCredit] = useState(false);
  const items = cart.map(productItem);

  return (
    <div className="p-3">
      <span className="h5 title text-center">الطلب</span>

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
          <span>{Math.abs(discount)} ر.س</span>
        </p>
      </div>
      <hr />

      <p className="total">
        الإجمالي
        <span>{totalPrice} ر.س</span>
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
        أكمل الدفع
      </button>
    </div>
  );
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
      <span>{price} ر.س</span>
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
