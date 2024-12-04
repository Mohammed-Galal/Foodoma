/* eslint-disable jsx-a11y/alt-text */
import "./index.scss";

/* eslint-disable import/no-anonymous-default-export */
export default ({ sectionName }) => (
  <section
    key="services"
    id="services"
    className="container-fluid container-lg d-flex flex-column text-center container-fluid container-lg"
  >
    {sectionName && (
      <p className="d-flex align-items-center">
        <span className="h3">{sectionName}</span>

        <a href="/" className="d-flex align-items-center text-decoration-none">
          جميع المنتجات
          <object data="/assets/home/icons/left-arrow.svg"></object>
        </a>
      </p>
    )}
    {/* نحن نسهل عليك الحصول على أفضل خدمة أينما كنت. اطلب الآن للشحن على مستوى
    البلاد، أو قدم طلبًا للاستلام من متجرك المحلي، أو تواصل مع فريقنا لترتيب
    خدمة تقديم الطعام المخصصة لمناسبتك القادمة. */}
    <div className="align-items-stretch d-flex flex-wrap flex-lg-nowrap gap-3">
      <div className="align-items-stretch d-grid">
        <p className="align-items-center d-flex flex-column h-100 justify-content-evenly m-0">
          <span className="d-block h4">الطلبات الخاصة</span>
          صمم المنتجات الخاصة بك بنفسك.. <br />
          عن طريق التحكم فى كافة الاضافات
          <a href="/design" className="text-decoration-none">
            اطلب الآن
          </a>
        </p>
        <img src="/assets/home/services/1.png" alt="special order" />
      </div>

      <div className="align-items-stretch d-grid">
        <p className="align-items-center d-flex flex-column h-100 justify-content-evenly m-0">
          <span className="d-block h4">الحجز المبكر</span>
          خصم -15% على الحجز المبكر <br />
          لكيكات اليوم الوطني السعودي
          <a href="/design" className="text-decoration-none">
            احجز الآن
          </a>
        </p>
        <img src="/assets/home/services/2.png" alt="early order" />
      </div>
    </div>
  </section>
);

/*
<div class=><div style="
   
" class=><p class=><span class="d-block h4">الطلبات الخاصة</span>صمم المنتجات الخاصة بك بنفسك.. عن طريق التحكم فى كافة الاضافات<a href="/design" class="text-decoration-none">صمم كيكتك بنفسك</a></p><img src="/assets/home/services/1.png" alt="special order" style="
    max-height: 210px;
"></div><div style="
    flex-grow: 1;
"><p><span class="d-block h4">الطلبات الخاصة</span>نحن نسهل عليك الحصول على أفضل خدمة أينما كنت.<a href="/design" class="text-decoration-none">صمم كيكتك بنفسك</a></p><img src="/assets/home/services/2.png" alt="early order"></div></div>
*/
