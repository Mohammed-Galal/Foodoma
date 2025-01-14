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
    <section className="container">
      <img src="/assets/check.gif" alt="success" />

      <ul>
        <li>بيانات الطلب</li>
        <li>
          تاريخ الطلب <span>{state.date}</span>
        </li>
        <li>
          الملاحظات <span>{state.comment}</span>
        </li>
        <li>
          كود الطلب <span>{state.code}</span>
        </li>
        <li>
          PIN <span>{state.PIN}</span>
        </li>
        <li>
          طريقة الاستلام <span>{state.deliveryType}</span>
        </li>
        <li>
          عنوان الاستلام <span>{state.deliveryAddress}</span>
        </li>
        <li>
          طريقة الدفع <span>{state.paymentMode}</span>
        </li>
        <li>
          ثمن الطلب <span>{state.price}</span>
        </li>
        <li>
          رسوم التوصيل <span>{state.deliveryCharges}</span>
        </li>
        <li>
          اجمالي سعر الطلب <span>{state.total}</span>
        </li>
      </ul>
    </section>
  );
};
