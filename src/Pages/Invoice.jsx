/* eslint-disable import/no-anonymous-default-export */
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
              <td>{state.comment}</td>
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
                colSpan="4"
                className="text-center"
              >
                بيانات الطلب
              </th>
            </tr>

            <tr>
              <th>اسم المنتج</th>
              <th>الاضافات</th>
              <th>العدد</th>
              <th>السعر</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="3" className="fw-bold">
                ثمن الطلب
              </td>
              <td>{state.price}</td>
            </tr>
            <tr>
              <td colSpan="3" className="fw-bold">
                رسوم التوصيل
              </td>
              <td>{state.deliveryCharges}</td>
            </tr>
            <tr>
              <td colSpan="3" className="fw-bold">
                الاجمالي
              </td>
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
