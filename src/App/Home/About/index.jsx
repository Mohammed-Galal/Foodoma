import "./index.scss";
import { useState } from "react";

/* eslint-disable import/no-anonymous-default-export */

export default () => {
  const [count, setCount] = useState(1);

  // setTimeout(function () {
  //   count === 3000 || setCount(count * 2);
  // }, 50);

  return (
    <section
      id="about-us"
      className="container-fluid container-lg d-flex flex-column text-center"
    >
      <span className="h3">أرقام نفتخر بها</span>
      نحن نسهل عليك الحصول على أفضل خدمة أينما كنت. اطلب الآن للشحن على مستوى
      البلاد، أو قدم طلبًا للاستلام من متجرك المحلي، أو تواصل مع فريقنا لترتيب
      خدمة تقديم الطعام المخصصة لمناسبتك القادمة.
      <div className="d-flex flex-wrap text-center w-100">
        <div className="d-flex flex-column">
          <img src="/assets/home/icons/ph_stamp-light.svg" alt="LIGHT" />
          <Inc curr={count} until={73} />
          سنة خبرة
        </div>
        <div className="d-flex flex-column">
          <img src="/assets/home/icons/hugeicons_happy.svg" alt="HAPPY FACE" />
          <Inc curr={count} until={1000} />
          عميل سعيد
        </div>
        <div className="d-flex flex-column">
          <img src="/assets/home/icons/bi_cake.svg" alt="CAKE" />
          <Inc curr={count} until={3000} />
          عمل طلب
        </div>
      </div>
    </section>
  );
};

function Inc({ curr, until }) {
  const max = Math.min(curr, until);
  return <span className="h3 my-2">{max} +</span>;
}
