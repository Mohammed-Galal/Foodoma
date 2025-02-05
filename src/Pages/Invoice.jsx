/* eslint-disable import/no-anonymous-default-export */

import getText from "../translation";
import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default () => {
  const redirect = useNavigate(),
    { state } = useLocation();

  useLayoutEffect(
    function () {
      state || redirect("/public/mobile");
    },
    [state]
  );

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
          {getText("invoice", 0)}
        </legend>

        <p
          className="m-0 text-center"
          style={{ color: "var(--midgray)", lineHeight: "1.6" }}
        >
          {getText("invoice", 1)}
          {" " + state.date[0] + " "}
          {getText("invoice", 2)}
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
                {getText("invoice", 3)}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{getText("invoice", 4)}</td>
              <td>{state.code}</td>
            </tr>
            <tr>
              <td>PIN</td>
              <td>{state.PIN}</td>
            </tr>
            <tr>
              <td>{getText("invoice", 5)}</td>
              <td>{state.deliveryType}</td>
            </tr>
            <tr>
              <td>{getText("invoice", 6)}</td>
              <td>{state.deliveryAddress}</td>
            </tr>
            <tr>
              <td>{getText("invoice", 7)}</td>
              <td>{state.paymentMode}</td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td>{getText("invoice", 8)}</td>
              <td>{state.comment || getText("invoice", 9)}</td>
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

          <tbody>{state.order.map(ProductItem)}</tbody>

          <tfoot className="fw-bold text-center">
            <tr>
              <td colSpan="4">{getText("invoice", 16)}</td>
              <td>{state.price}</td>
            </tr>
            <tr>
              <td colSpan="4">{getText("invoice", 17)}</td>
              <td>{state.deliveryCharges}</td>
            </tr>
            <tr>
              <td colSpan="4">{getText("invoice", 18)}</td>
              <td>{state.total}</td>
            </tr>
          </tfoot>
        </table>

        <p
          className="m-0 text-center"
          style={{ color: "var(--midgray)", lineHeight: "1.6" }}
        >
          {getText("invoice", 19)}
        </p>
      </fieldset>
    </section>
  );
};

function ProductItem({ id, name, price, selectedaddons, quantity }) {
  let total = 0;

  const Addons =
    selectedaddons.length === 0 ? (
      getText("invoice", 20)
    ) : (
      <ul className="list-unstyled m-0 p-0">
        {selectedaddons.map((a) => {
          total += +a.price;
          return (
            <li key={a.addon_id} className="d-flex justify-content-center">
              {a.addon_name} - <span>{a.price} ر.س</span>
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
