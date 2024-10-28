/* eslint-disable jsx-a11y/alt-text */
import "./index.scss";

/* eslint-disable import/no-anonymous-default-export */
export default ({ sectionName }) => (
  <section
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
    <div className="row m-0 mt-3">
      <div className="col-12 col-lg-6 row">
        <div className="align-items-center col-12 col-sm-6 d-flex flex-column justify-content-center py-5">
          <span className="d-block h4 mb-3">الطلبات الخاصة</span>
          صمم المنتجات الخاصة بك بنفسك.. عن طريق التحكم فى كافة الاضافات
          <a href="/design" className="mt-4 text-decoration-none">
            صمم كيكتك بنفسك
          </a>
        </div>
        <img
          className="col-12 col-sm-6"
          src="/assets/home/services/1.png"
          alt="special order"
        />
      </div>

      <div className="col-12 col-lg-6 row">
        <div className="align-items-center col-12 col-sm-6 d-flex flex-column justify-content-center py-5">
          <span className="d-block h4 mb-3">الطلبات الخاصة</span>
          نحن نسهل عليك الحصول على أفضل خدمة أينما كنت.
          <a href="/design" className="mt-4 text-decoration-none">
            صمم كيكتك بنفسك
          </a>
        </div>
        <img
          className="col-12 col-sm-6"
          src="/assets/home/services/2.png"
          alt="early order"
        />
      </div>
    </div>
  </section>
);
