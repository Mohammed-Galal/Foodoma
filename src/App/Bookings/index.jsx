import "./index.scss";

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

        <img src="/assets/home/banner/(1).png" alt="book-banner" />
      </div>
    </section>
  </>
);
