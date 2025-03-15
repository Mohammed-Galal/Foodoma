/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import getText from "../../../../translation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const orderState = [
  false,
  getText("settings", 8),
  getText("settings", 9),
  getText("settings", 10),
  getText("settings", 10),
  getText("settings", 11),
  getText("settings", 12),
  "الطلب جاهز للاستلام",
  "بانتظار تأكيد الدفع",
  "فشل الدفع",
  "طلب مجدول",
  "طلب مقبول",
];

const base = process.env.REACT_APP_API_URL;

let restaurantId,
  items = [];

export default () => {
  const store = useSelector((e) => e),
    [loaded, setLoaded] = useState(false);

  restaurantId = store.Restaurant.data.id;

  useEffect(getOrders, [loaded]);

  return (
    <ul className="d-flex flex-column gap-3 history list-unstyled m-0 p-0">
      {loaded && items.map(orderItem, store.Products.data)}
    </ul>
  );

  function getOrders() {
    fetch(base + "/public/api/get-orders", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then((r) => r.json())
      .then((r) => {
        items = r.data;
        setLoaded(true);
      });
  }
};

function orderItem(order) {
  if (order.restaurant_id !== restaurantId) return false;

  const Products = this,
    { updated_at, total, delivery_charge, orderstatus_id } = order,
    isDelevered = orderState[orderstatus_id] || orderstatus_id,
    date = updated_at.split(" ")[0].replace(/-/g, "."),
    price = +total + +delivery_charge,
    quantity = order.orderitems.length;

  const images = order.orderitems.map((p) => {
    const targetProduct = Products.find((e) => e.id === p.item_id);
    if (targetProduct === undefined) return false;
    const src = targetProduct.image ? base + targetProduct.image : "";
    return (
      <img
        key={src}
        src={src}
        style={{ "max-height": "72px", "align-self": "flex-start" }}
        alt="img"
      />
    );
  });

  return (
    <li
      key={order.id}
      className="d-flex flex-column"
      style={{
        cssText:
          "background-color: #fbfbfb; border-radius: 16px; overflow: hidden",
      }}
    >
      <div className="align-items-center d-flex justify-content-between px-3 py-2">
        <p
          className="d-flex flex-column m-0"
          style={{ cssText: "color: var(--midgray); font-size: smaller" }}
        >
          <span className="h6 m-0 mb-1">{date}</span>
          {price} {getText("settings", 14)}/ {quantity}{" "}
          {getText("settings", 13)}
        </p>

        <button
          type="button"
          className="btn"
          popovertarget={"popover-" + order.id}
        >
          عرض بيانات الطلب
        </button>
      </div>

      <div className="overflow-hidden px-2">{images}</div>

      <div
        className="px-3 py-2"
        style={{
          cssText: "color: var(--midgray); background-color: #e6f0f7",
        }}
      >
        <span>{isDelevered}</span>
      </div>

      <Popover order={order} />
    </li>
  );
}

function Popover({ order }) {
  order.address === "NA" && (order.address = order.restaurant.address);
  
  console.log(order);

  return (
    <div
      id={"popover-" + order.id}
      popover="auto"
      className="container px-4 py-5"
      style={{ borderRadius: "8px", borderColor: "aliceblue" }}
    >
      <div className="d-flex flex-wrap gap-3">
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
                {getText("invoice", 3)}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{getText("invoice", 4)}</td>
              <td>{order.unique_order_id}</td>
            </tr>
            <tr>
              <td>PIN</td>
              <td>{order.delivery_pin}</td>
            </tr>
            <tr>
              <td>{getText("invoice", 5)}</td>
              <td>{order.delivery_type - 1 ? "من الفرع" : "توصيل"}</td>
            </tr>
            <tr>
              <td>{getText("invoice", 6)}</td>
              <td>{order.address}</td>
            </tr>
            <tr>
              <td>{getText("invoice", 7)}</td>
              <td>
                {order.payment_mode === "COD"
                  ? "عند الاستلام"
                  : order.payment_mode}
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td>{getText("invoice", 8)}</td>
              <td>{order.order_comment || getText("invoice", 9)}</td>
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
                {getText("invoice", 10)}
              </th>
            </tr>

            <tr className="text-center">
              <th>{getText("invoice", 11)}</th>
              <th>{getText("invoice", 12)}</th>
              <th>{getText("invoice", 13)}</th>
              <th>{getText("invoice", 14)}</th>
              <th>{getText("invoice", 15)}</th>
            </tr>
          </thead>

          <tbody>{order.orderitems.map(ProductItem)}</tbody>

          <tfoot className="fw-bold text-center">
            <tr>
              <td colSpan="4">{getText("invoice", 16)}</td>
              <td>{order.sub_total}</td>
            </tr>
            <tr>
              <td colSpan="4">{getText("invoice", 17)}</td>
              <td>{order.delivery_charge}</td>
            </tr>
            <tr>
              <td colSpan="4">{getText("invoice", 18)}</td>
              <td>{order.total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

function ProductItem({ id, name, price, order_item_addons, quantity }) {
  let total = 0;

  const Addons =
    order_item_addons.length === 0 ? (
      getText("invoice", 20)
    ) : (
      <ul className="list-unstyled m-0 p-0">
        {order_item_addons.map((a) => {
          total += +a.addon_price;
          return (
            <li key={a.addon_id} className="d-flex justify-content-center">
              {a.addon_name} - <span>{a.addon_price} ر.س</span>
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
        {price} {getText("invoice", 21)}
      </td>
      <td>{Addons}</td>
      <td>{quantity}</td>
      <td>
        {total} {getText("invoice", 21)}
      </td>
    </tr>
  );
}

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
