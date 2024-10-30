import { categories } from "../Home/Products";
import "./index.scss";

const O = categories.is_new.map((C) => (
  <div className="d-flex flex-column" key={C.key}>
    {C.childComponent}
  </div>
));

export default (
  <>
    <section id="book-banner">
      <div className="container align-items-stretch d-flex">
        <div className="align-items-center d-flex flex-column py-5">
          <span className="h1 my-5">كيكات اليوم الوطني السعودي</span>

          <div className="text-center">
            ينتهي الحجز في
            <p className="d-grid my-3">
              {/* <CountDown until="" /> */}
              <span>دقيقة</span>:<span>ساعة</span>:<span>يوم</span>
            </p>
            خصم 15% على الحجز المبكر لكيكات اليوم الوطني
          </div>
        </div>

        <img
          className="mx-auto"
          src="/assets/home/banner/(1).png"
          alt="book-banner"
        />
      </div>
    </section>

    <section
      id="book-products"
      className="align-items-stretch container d-grid justify-content-center"
    >
      {O}
    </section>
  </>
);
