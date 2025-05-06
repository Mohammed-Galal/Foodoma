import getPage from "../translation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

let errMsg = "";

const getText = getPage("invoice");

export default () => {
  const params = useParams(),
    [query] = useSearchParams(),
    LOC = useLocation(),
    prevOrders = useSelector((e) => e.User.prevOrders),
    dispatch = useDispatch(),
    [state, setState] = useState(LOC.state);

  const orderId = query.get("orderId");

  useEffect(function () {
    if (state === null) {
      if (params.id) instantPaymentInvoice();
      else if (orderId) {
        const data = getOrderData(+orderId, prevOrders);
        setState(data);
      }
    }
  }, []);

  if (state === null) return null;
  else if (state === false) {
    return (
      <div className="container">
        <div
          className="text-center"
          style={{
            color: "var(--midgray)",
            fontSize: "larger",
            fontWeight: "400",
          }}
        >
          <span className="d-block h3 text-danger">{getText(0)}</span>
          {errMsg}
        </div>
      </div>
    );
  }

  if (!orderId) {
    window.localStorage.removeItem("coupon");
    window.localStorage.removeItem("invoiceData");
    dispatch({ type: "products/clearCart" });
  }

  return (
    <section id="invoice" className="container">
      <img className="d-block mx-auto" src="/assets/check.gif" alt="success" />

      <fieldset
        className="gap-3 m-0 row"
        style={{ borderTop: "1px solid var(--primary)" }}
      >
        <legend
          className="mx-auto px-3"
          style={{ float: "none", width: "auto", color: "var(--primary)" }}
        >
          {getText(1)}
        </legend>

        <p
          className="m-0 text-center"
          style={{ color: "var(--midgray)", lineHeight: "1.6" }}
        >
          {getText(2)}
          {" " + state.date[0] + " "}
          {getText(3)}
          {" " + state.date[1] + " "}
        </p>

        <table
          className="px-3 py-1"
          style={{
            tableLayout: "auto",
            border: "1px solid var(--lightgray)",
          }}
        >
          <thead>
            <tr>
              <th colSpan="2" className="text-center">
                {getText(4)}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{getText(5)}</td>
              <td>{state.code}</td>
            </tr>
            <tr>
              <td>PIN</td>
              <td>{state.PIN}</td>
            </tr>
            <tr>
              <td>{getText(6)}</td>
              <td>{state.deliveryType}</td>
            </tr>
            <tr>
              <td>{getText(7)}</td>
              <td>{state.deliveryAddress}</td>
            </tr>
            <tr>
              <td>{getText(8)}</td>
              <td>{state.paymentMode}</td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td>{getText(9)}</td>
              <td>{state.comment || getText(10)}</td>
            </tr>
          </tfoot>
        </table>

        <table
          className="px-3 py-1"
          style={{
            tableLayout: "auto",
            border: "1px solid var(--lightgray)",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ borderBottom: "1px solid var(--lightgray)" }}
                colSpan="5"
                className="text-center"
              >
                {getText(11)}
              </th>
            </tr>

            <tr className="text-center">
              <th>{getText(12)}</th>
              <th>{getText(13)}</th>
              <th>{getText(14)}</th>
              <th>{getText(15)}</th>
              <th>{getText(16)}</th>
            </tr>
          </thead>

          <tbody>{state.order.map(ProductItem)}</tbody>

          <tfoot className="fw-bold text-center">
            <tr>
              <td>{getText(17)}</td>
              <td>{state.subTotal}</td>

              <td colSpan="2">{getText(18)}</td>
              <td>{state.deliveryCharges}</td>
            </tr>

            <tr>
              <td>{getText(19)}</td>
              <td>{state.restaurant_charge}</td>

              <td colSpan="2">{getText(20)}</td>
              <td>{state.discount}</td>
            </tr>

            <tr>
              <td colSpan="4">{getText(21)}</td>
              <td>{state.tax_amount.toFixed(2)}</td>
            </tr>

            <tr>
              <td colSpan="4">{getText(22)}</td>
              <td>{state.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <p
          className="m-0 text-center"
          style={{ color: "var(--midgray)", lineHeight: "1.6" }}
        >
          {getText(23)}
        </p>
      </fieldset>
    </section>
  );

  function instantPaymentInvoice() {
    fetch(process.env.REACT_APP_API_URL + "/public/api/payment-callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        order_id: params.id,
        paymentId: query.get("paymentId"),
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          const basicOrderData = JSON.parse(
              window.localStorage.getItem("invoiceData")
            ),
            { data } = res,
            invoiceState = {
              ...basicOrderData,
              date: data.created_at.split(" "),
              comment: data.order_comment,
              code: data.unique_order_id,
              PIN: data.delivery_pin,
              price: data.payable,
              total: data.total,
              subTotal: data.sub_total,
            };

          setState(invoiceState);
        } else {
          errMsg = res.message;
          setState(false);
        }
      });
  }
};

function ProductItem({ id, name, price, selectedaddons, quantity }) {
  let total = 0;

  const Addons =
    selectedaddons.length === 0 ? (
      getText(26)
    ) : (
      <ul className="list-unstyled m-0 p-0">
        {selectedaddons.map((a) => {
          total += +a.price;
          return (
            <li key={a.addon_id} className="d-flex justify-content-center">
              {a.addon_name} -{" "}
              <span>
                {a.price} {getText(27)}
              </span>
            </li>
          );
        })}
      </ul>
    );

  total = (total + +price) * +quantity;

  return (
    <tr
      key={id}
      className="text-center"
      style={{
        fontSize: "smaller",
        fontWeight: "600",
        color: "var(--midgray)",
      }}
    >
      <td className="fs-6 fw-bolder" style={{ color: "var(--black)" }}>
        {name}
      </td>
      <td>
        {price} {getText(27)}
      </td>
      <td>{Addons}</td>
      <td>{quantity}</td>
      <td>
        {total} {getText(27)}
      </td>
    </tr>
  );
}

function getOrderData(orderId, prevOrders) {
  const orderData = prevOrders.find(({ id }) => id === orderId);

  if (!orderData) return null;

  const isDelivery = orderData.delivery_type === 2,
    result = {};

  // debugger;
  result.order = orderData.orderitems.map((item) => ({
    ...item,
    selectedaddons: item.order_item_addons,
  }));

  result.code = orderData.unique_order_id;
  result.deliveryType = isDelivery ? "من الفرع" : "توصيل";
  result.deliveryAddress = isDelivery
    ? orderData.address
    : orderData.restaurant.name;
  result.deliveryCharges = orderData.delivery_charge;
  result.restaurant_charge = orderData.restaurant_charge;
  result.paymentMode =
    orderData.payment_mode === "COD" ? "عند الاستلام" : orderData.payment_mode;

  result.comment = orderData.order_comment;
  result.PIN = orderData.delivery_pin;
  result.tax_amount = orderData.tax_amount;
  result.date = orderData.updated_at.split(" ");
  result.subTotal = orderData.sub_total;
  result.discount = 0;
  result.total = orderData.total;
  result.price = orderData.payable;

  return result;
  //  {
  //   // code: "OD-05-06-9HAU-72KZLER4Q",
  //   // deliveryType: "From Branch",
  //   // deliveryAddress: "حي الرحاب",
  //   // order: [
  //   //   {
  //   //     name: "Hijazi Maamoul",
  //   //     restaurant_id: 10,
  //   //     id: "133",
  //   //     price: "30",
  //   //     quantity: "1",
  //   //     selectedaddons: [],
  //   //   },
  //   // ],
  //   discount: 0,
  //   // deliveryCharges: 0,
  //   // restaurant_charge: "0.00",
  //   // date: ["2025-05-06", "00:52:12"],
  //   // paymentMode: "On Receipt",
  //   // comment: null,
  //   // PIN: "16548",
  //   // tax_amount: 4.2,
  //   total: 34.2,
  //   price: 34.2,
  //   subTotal: 30,
  // };

  /**
 {
  "id": 130,
  "unique_order_id": "OD-03-15-VJAH-N03DG4KVY",
  "orderstatus_id": 1,
  "user_id": 30,
  "coupon_name": null,
  "location": "{\"lat\":null,\"lng\":null}",
  "address": "NA",
  "tax": null,
  "restaurant_charge": 0,
  "delivery_charge": "0.00",
  "actual_delivery_charge": "0.00",
  "total": 49,
  "created_at": "2025-03-15 20:11:19",
  "updated_at": "2025-03-15 20:11:19",
  "payment_mode": "COD",
  "order_comment": null,
  "restaurant_id": 3,
  "transaction_id": null,
  "delivery_type": 2,
  "payable": 49,
  "wallet_amount": null,
  "tip_amount": null,
  "tax_amount": 0,
  "coupon_amount": null,
  "sub_total": 49,
  "cash_change_amount": null,
  "is_scheduled": 0,
  "schedule_date": null,
  "schedule_slot": null,
  "distance": null,
  "delivery_pin": "28915",
  "zone_id": 2,
  "phrase": "",
  "is_special": 0,
  "shipping_id": null,
  "is_ratable": false,
  "orderitems": [
    {
      "id": 135,
      "order_id": 130,
      "item_id": 56,
      "name": "تورتة سويسرول ردفلفت",
      "quantity": 1,
      "price": "49.00",
      "created_at": "2025-03-15 20:11:19",
      "updated_at": "2025-03-15 20:11:19",
      "order_item_addons": []
    }
  ],
  "restaurant": {
    "id": 3,
    "name": "حي الصفا",
    "description": "حي الصفا",
    "location_id": null,
    "image": "/assets/img/restaurants/1726660032Z6XCBebMoy.jpg",
    "rating": "5",
    "delivery_time": "15",
    "price_range": "15",
    "is_pureveg": 1,
    "slug": "hy-alsfa-jd-vb7fv2cx4hvumed",
    "placeholder_image": null,
    "latitude": "21.580441782632928",
    "longitude": "39.19873833083975",
    "certificate": null,
    "restaurant_charges": "0.00",
    "delivery_charges": "19.00",
    "address": "حي الصفا",
    "pincode": null,
    "landmark": "حي الصفا",
    "sku": "17266600320foo0rHznW",
    "is_active": 1,
    "is_accepted": 1,
    "is_featured": 1,
    "commission_rate": "0.00",
    "delivery_type": 3,
    "delivery_radius": 10,
    "delivery_charge_type": "FIXED",
    "base_delivery_charge": null,
    "base_delivery_distance": null,
    "extra_delivery_charge": null,
    "extra_delivery_distance": null,
    "min_order_price": "0.00",
    "is_notifiable": 0,
    "auto_acceptable": 0,
    "schedule_data": null,
    "is_schedulable": 0,
    "order_column": 2,
    "custom_message": null,
    "is_orderscheduling": false,
    "custom_featured_name": null,
    "accept_scheduled_orders": 0,
    "schedule_slot_buffer": 30,
    "zone_id": 2,
    "free_delivery_subtotal": 70,
    "custom_message_on_list": null,
    "deleted_at": null
  },
  "rating": null,
  "shipment": null,
  "payment": null
}
 */
}
