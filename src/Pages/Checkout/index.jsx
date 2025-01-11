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
  const store = useStore().getState(),
    dispatch = useDispatch(),
    redirect = useNavigate();

  const delivery_charges = store.Restaurant.data.delivery_charges,
    products = store.Products;

  let totalPrice = +delivery_charges;

  const userAddresses = store.User.addresses,
    [delivery, setDelivery] = useState(emptyStr);

  opts.order = store.Products.cart.map((CI) => {
    totalPrice += +CI.totalPrice;
    return extractData(CI);
  });
  opts.user.data.default_address =
    delivery === emptyStr
      ? userAddresses[0]
      : userAddresses.find((a) => a.id === +delivery);

  useLayoutEffect(() => {
    store.User.loaded || redirect("/user/login");
    userAddresses.length || redirect("/settings/addresses");
  });

  const items = userAddresses.map((e, i) => {
    return (
      <option key={i} value={e.id}>
        {e.tag}
      </option>
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
        <div
          className="d-flex flex-column gap-2 p-3 w-100"
          style={{ border: "1px solid #f1f1f1", borderRadius: "16px" }}
        >
          <span className="title" style={{ color: "var(--primary)" }}>
            طريقة الاستلام
          </span>

          <select
            className="input-group-text text-end"
            style={{
              outline: "none",
              borderColor: "#ecf5ff",
              cursor: "pointer",
            }}
            value={delivery}
            onChange={({ target }) => setDelivery(target.value)}
          >
            <option value={emptyStr}>الاستلام من الفرع</option>
            {items}
          </select>
        </div>

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
    opts.delivery_type = delivery !== emptyStr ? "1" : "2";

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
        redirect("/");
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
