import getPage from "../translation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

let errMsg = "";

const getText = getPage("invoice");

export default () => {
  const params = useParams(),
    [query] = useSearchParams(),
    LOC = useLocation(),
    dispatch = useDispatch(),
    [state, setState] = useState(LOC.state);

  useEffect(function () {
    if (state === null && params.id !== undefined) {
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

  window.localStorage.removeItem("coupon");
  window.localStorage.removeItem("invoiceData");
  dispatch({ type: "products/clearCart" });
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
              <th>{getText(16)}</th>
              <th>{getText(17)}</th>
              <th>{getText(18)}</th>
            </tr>
          </thead>

          <tbody>{state.order.map(ProductItem)}</tbody>

          <tfoot className="fw-bold text-center">
            <tr>
              <td>{getText(19)}</td>
              <td>{state.subTotal}</td>

              <td colSpan="2">{getText(20)}</td>
              <td>{state.deliveryCharges}</td>
            </tr>

            <tr>
              <td>{getText(21)}</td>
              <td>{state.restaurant_charge}</td>

              <td colSpan="2">{getText(22)}</td>
              <td>{state.discount}</td>
            </tr>

            <tr>
              <td colSpan="4">{getText(23)}</td>
              <td>{state.tax_amount.toFixed(2)}</td>
            </tr>

            <tr>
              <td colSpan="4">{getText(24)}</td>
              <td>{state.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <p
          className="m-0 text-center"
          style={{ color: "var(--midgray)", lineHeight: "1.6" }}
        >
          {getText(25)}
        </p>
      </fieldset>
    </section>
  );
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
