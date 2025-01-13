/* eslint-disable import/no-anonymous-default-export */
import { useDispatch, useStore } from "react-redux";
import { useLayoutEffect, useState } from "react";
import NXT from "../../icons/NXT";
import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const discount = 0;

const placeOrderApi = "https://mon10.amir-adel.com/public/api/place-order",
  opts = { user: { data: {} } },
  emptyStr = "";

export default function () {
  const [delivery, setDelivery] = useState(false),
    [activeAddress, setActiveAddress] = useState(0),
    store = useStore().getState(),
    dispatch = useDispatch(),
    redirect = useNavigate();

  const userAddresses = store.User.addresses,
    delivery_charges = store.Restaurant.data.delivery_charges,
    products = store.Products;

  useLayoutEffect(() => {
    store.User.loaded || redirect("/user/login");
    userAddresses.length || redirect("/settings/addresses");
  });

  let totalPrice = +delivery_charges;

  opts.user.data.default_address = userAddresses[activeAddress];
  opts.order = store.Products.cart.map((CI) => {
    totalPrice += +CI.totalPrice;
    return extractData(CI);
  });

  const items = userAddresses.map((e, i) => {
    const style = {
      width: "100%",
      border: "2px solid #a8d0ec",
      borderRadius: "8px",
    };

    return (
      <li key={i} style={style} value={e.id} data-active={activeAddress === i}>
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
    );
  });

  return (
    <section id="checkout">
      <ul className="d-flex gap-2 justify-content-center list-unstyled mb-5 mx-auto p-0">
        <li>السلة</li>
        <li>{NXT}</li>
        <li className="h5 m-0">الدفع</li>
        <li>{NXT}</li>
        <li>تأكيد الطلب</li>
      </ul>

      <div className="container d-flex flex-wrap flex-lg-nowrap gap-3 justify-content-center">
        <fieldset
          className="d-flex flex-column gap-3 p-3 w-100"
          style={{
            border: "1px solid rgb(241, 241, 241)",
            borderRadius: "16px",
            gridTemplateColumns: "auto 1fr",
            alignContent: "start",
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
            طريقة الاستلام
          </legend>

          <div className="d-flex gap-2">
            <button
              className="btn d-flex align-items-center gap-2"
              data-active={!delivery}
              onClick={() => setDelivery(false)}
            >
              <img
                style={{
                  maxHeight: "30px",
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
                  maxHeight: "30px",
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
        </fieldset>

        <OrderInfo
          cart={products.cart}
          products={products}
          delivery={delivery_charges}
          totalPrice={totalPrice}
          placeOrder={placeOrder}
        />
      </div>
    </section>
  );

  function placeOrder() {
    opts.delivery_type = emptyStr + +delivery;

    const fetchOpts = {
      method: "POST",
      body: JSON.stringify(opts),
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    };

    fetch(placeOrderApi, fetchOpts)
      .then((r) => r.json())
      .then((r) => {
        dispatch({ type: "products/clearCart" });
        redirect("/invoice", { state: r });
      });
  }
}

function OrderInfo({ cart, delivery, products, placeOrder, totalPrice }) {
  const [useCreditCard, setCredit] = useState(false);
  const items = cart.map(productItem, products);

  return (
    <div className="p-3 flex-shrink-0">
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
        className="btn d-flex justify-content-center mt-4 mx-auto w-100"
      >
        أكمل الدفع
      </button>
    </div>
  );
}

function productItem({ id, quantity }) {
  const itemData = this.data.find((p) => p.id === id);
  const price = +itemData.price;

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

Object.assign(opts, {
  coupon: {
    code: "",
  },
  tipAmount: "",
  cash_change_amount: "",
  pending_payment: "",
  method: "COD",
  partial_wallet: "",
  order_comment: "comment",
  is_scheduled: "",
  schedule_date: "",
  schedule_slot: "",
  auto_acceptable: false,
  // delivery_type: "",
  location: {
    lat: "",
    lng: "",
  },
});

/*
{
    "order":[
        {
            "restaurant_id":2,
            "id":"1",
            "name":"test item",
            "price":"100",
            "quantity":"1",
            "selectedaddons":[
                {
                    "addon_id":1,
                    "addon_category_name":"addon category name",
                    "addon_name":"addon Name",
                    "price":"20"
                }
            ]
        }
        
    ],
    "user":{
        "data":{
            "default_address":{
                "house":"9 street",
                "address":"cairo nasrcity",
                "latitude":"",
                "longitude":""
            }
        }

    },
    "coupon":{
        "code":""
    },
    "tipAmount":"",
    "cash_change_amount":"",
    "pending_payment":"",
    "method":"COD",
    "partial_wallet":"",
    "order_comment":"comment",
    "is_scheduled":"",
    "schedule_date":"",
    "schedule_slot":"",
    "auto_acceptable":false,
    "delivery_type":"",
    "location":""
}
 */
