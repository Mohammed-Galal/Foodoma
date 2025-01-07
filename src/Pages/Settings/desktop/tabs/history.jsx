/* eslint-disable import/no-anonymous-default-export */
import { useLayoutEffect, useState } from "react";
import { useStore } from "react-redux";

const base = "https://mon10.amir-adel.com";

let restaurantId,
  items = [];

export default () => {
  const store = useStore().getState(),
    [loaded, setLoaded] = useState(false);

  restaurantId = store.Restaurant.data.id;

  useLayoutEffect(getOrders, [loaded]);

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
        Authorization: "Bearer " + store.User.data.auth_token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        items = r.data;
        setLoaded(true);
      });
  }
};

function orderItem(item) {
  if (item.restaurant_id !== restaurantId) return false;

  const Products = this,
    { updated_at, total, delivery_charge, orderstatus_id } = item,
    isDelevered = orderstatus_id > 1 ? "تم التوصيل" : "لم يتم التوصيل",
    date = updated_at.split(" ")[0].replace(/-/g, "."),
    price = total + delivery_charge,
    quantity = item.orderitems.length;

  const images = item.orderitems.map((p) => {
    const targetProduct = Products.find((e) => e.id === p.item_id);
    if (targetProduct === undefined) return false;
    const src = targetProduct.image ? base + targetProduct.image : "";
    return (
      <img
        src={src}
        style={{ cssText: "max-height: 72px; align-self: flex-start" }}
        alt="img"
      />
    );
  });

  return (
    <li
      key={item.id}
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
          {price} ر.س/ {quantity} منتج
        </p>

        {/* <button
            type="button"
            className="btn px-4"
            style={{
              cssText:
                "background-color: var(--primary); border-radius: 24px; color: #fff; scale: 0.9;",
            }}
          >
            اعادة طلب
          </button> */}
      </div>

      {images}

      <div
        className="px-3 py-2"
        style={{
          cssText: "color: var(--midgray); background-color: #e6f0f7",
        }}
      >
        <span>{isDelevered}</span>
      </div>
    </li>
  );
}

/**
 {
  "id": 17,
  "user_id": 12,
  "orderstatus_id": 1,
  "restaurant_id": 13,
  "unique_order_id": "OD-01-07-THHF-VEJ3MGLM7",

  "updated_at": "2025-01-07 16:28:26",
  "delivery_type": 2,
  "total": 20,
  "delivery_charge": "0.00",
  =======================================
  "coupon_name": null,
  "location": "null",
  "address": "55, utt",
  "tax": null,
  "restaurant_charge": null,
  "actual_delivery_charge": "0.00",
  "created_at": "2025-01-07 16:28:26",
  "payment_mode": "COD",
  "order_comment": "comment",
  "transaction_id": null,
  "payable": 20,
  "wallet_amount": null,
  "tip_amount": null,
  "tax_amount": 0,
  "coupon_amount": null,
  "sub_total": 20,
  "cash_change_amount": null,
  "is_scheduled": 0,
  "schedule_date": null,
  "schedule_slot": null,
  "distance": null,
  "delivery_pin": "83692",
  "zone_id": 1,
  "is_ratable": false,
  "orderitems": [
      {
          "id": 16,
          "order_id": 17,
          "item_id": 6,
          "name": "Milk Torte 20 cm",
          "quantity": 2,
          "price": "10.00",
          "created_at": "2025-01-07 16:28:26",
          "updated_at": "2025-01-07 16:28:26",
          "order_item_addons": []
      }
  ],
  "restaurant": {
      "id": 13,
      "name": "new store",
      "description": "new store",
      "location_id": null,
      "image": "/assets/img/restaurants/17271015637EdFi4yIih.jpg",
      "rating": "5",
      "delivery_time": "15",
      "price_range": "15",
      "is_pureveg": 1,
      "slug": "new-store-uqhah7souj1sxaa",
      "placeholder_image": null,
      "latitude": "40.6976701",
      "longitude": "-74.2598672",
      "certificate": null,
      "restaurant_charges": null,
      "delivery_charges": null,
      "address": "District 12 adjacent the first Building 30 B Apartment 4",
      "pincode": "02",
      "landmark": null,
      "sku": "17271015633oSXQU1Jph",
      "is_active": 1,
      "is_accepted": 1,
      "is_featured": 0,
      "commission_rate": "0.00",
      "delivery_type": 1,
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
      "order_column": 12,
      "custom_message": null,
      "is_orderscheduling": false,
      "custom_featured_name": null,
      "accept_scheduled_orders": 0,
      "schedule_slot_buffer": 30,
      "zone_id": 1,
      "free_delivery_subtotal": 0,
      "custom_message_on_list": null,
      "deleted_at": null
  },
  "rating": null
}
 */
