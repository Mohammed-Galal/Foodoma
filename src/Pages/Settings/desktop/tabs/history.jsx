/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { Link } from "react-router-dom";
import getPage, { observeLang } from "../../../../translation";
import { useSelector } from "react-redux";

const getText = getPage("settings"),
  orderState = [false];

observeLang(() => {
  orderState.push(
    getText(9),
    getText(10),
    getText(11),
    getText(12),
    getText(13),
    getText(14),
    getText(15),
    getText(16),
    getText(17),
    getText(18),
    getText(19)
  );
});

const base = process.env.REACT_APP_API_URL;

let restaurantId;

export default () => {
  const { User, Restaurant, Products } = useSelector((e) => e),
    items = User.prevOrders;

  restaurantId = Restaurant.data.id;

  return (
    <ul className="d-flex flex-column gap-3 history list-unstyled m-0 p-0">
      {items.map(orderItem, Products.data)}
    </ul>
  );
};

function orderItem(order) {
  if (order.restaurant_id !== restaurantId) return false;

  const Products = this,
    { updated_at, total, delivery_charge, orderstatus_id } = order,
    orderStatus = orderState[orderstatus_id] || orderstatus_id,
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
          {price} {getText(20)}/ {quantity} {getText(21)}
        </p>
        {orderstatus_id === 8 ? (
          <a className="btn" href={order.payment.InvoiceURL}>
            {"أكمل الدفع"}
          </a>
        ) : (
          <Link className="btn" to={"/invoice?orderId=" + order.id}>
            {getText(22)}
          </Link>
        )}
      </div>

      <div className="overflow-hidden px-2">{images}</div>

      <div
        className="px-3 py-2"
        style={{
          cssText: "color: var(--midgray); background-color: #e6f0f7",
        }}
      >
        <span>{orderStatus}</span>
      </div>
    </li>
  );
}
