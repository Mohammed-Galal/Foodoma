/* eslint-disable import/no-anonymous-default-export */
import { Toast } from "bootstrap";
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
          شكراً لاختياركم Moon10
        </legend>

        <p
          className="m-0 text-center"
          style={{ color: "var(--midgray)", lineHeight: "1.6" }}
        >
          يسرنا أن نُبلغكم أنه تم تقديم طلبكم بنجاح بتاريخ
          {" " + state.date[0] + " "}
          في تمام الساعة
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
                بيانات الاستلام
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>كود الطلب</td>
              <td>{state.code}</td>
            </tr>
            <tr>
              <td>PIN</td>
              <td>{state.PIN}</td>
            </tr>
            <tr>
              <td>طريقة الاستلام</td>
              <td>{state.deliveryType}</td>
            </tr>
            <tr>
              <td>عنوان الاستلام</td>
              <td>{state.deliveryAddress}</td>
            </tr>
            <tr>
              <td>طريقة الدفع</td>
              <td>{state.paymentMode}</td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td>الملاحظات والتوصيات</td>
              <td>{state.comment || "لا يوجد"}</td>
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
                بيانات الطلب
              </th>
            </tr>

            <tr className="text-center">
              <th>اسم المنتج</th>
              <th>السعر</th>
              <th>الاضافات</th>
              <th>العدد</th>
              <th>الاجمالي</th>
            </tr>
          </thead>

          <tbody>{state.order.map(ProductItem)}</tbody>

          <tfoot className="fw-bold text-center">
            <tr>
              <td colSpan="4">ثمن الطلب</td>
              <td>{state.price}</td>
            </tr>
            <tr>
              <td colSpan="4">رسوم التوصيل</td>
              <td>{state.deliveryCharges}</td>
            </tr>
            <tr>
              <td colSpan="4">الاجمالي</td>
              <td>{state.total}</td>
            </tr>
          </tfoot>
        </table>

        <p
          className="m-0 text-center"
          style={{ color: "var(--midgray)", lineHeight: "1.6" }}
        >
          Moon10 تتمنى لكم يوماً سعيداً!
        </p>
      </fieldset>
    </section>
  );
};

function ProductItem({ id, name, price, selectedaddons, quantity }) {
  let total = 0;

  const Addons =
    selectedaddons.length === 0 ? (
      "بدون اضافات"
    ) : (
      <ul className="list-unstyled m-0 p-0">
        {selectedaddons.map((a) => {
          total += +a.price;
          return (
            <li key={a.addon_id} className="d-flex justify-content-center">
              {a.addon_category_name} - <span>{a.price} ر.س</span>
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
      <td>{price} ر.س</td>
      <td>{Addons}</td>
      <td>{quantity}</td>
      <td>{total} ر.س</td>
    </tr>
  );
}
