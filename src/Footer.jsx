/* eslint-disable import/no-anonymous-default-export */
export default (
  <>
    <div className="container-fluid container-lg">
      <div className="align-items-stretch row">
        <div className="col-12 col-lg-3 col-md-6 d-flex flex-column">
          <img className="mb-3" src="/assets/home/logo-white.svg" alt="logo" />
          حلويات مونتانا سابقا
          <br />
          تأسست عام 1950 من
          <br />
          خبرة تزيد عن 73 عام في صناعة الحلويات
        </div>

        <div className="col-12 col-lg-3 col-md-6 d-flex flex-column">
          <span className="h4 mb-3">اتصل بنا</span>
          <a className="text-decoration-none mb-3" href="tel:+966502052280">
            +966502052280
          </a>
          <a
            className="text-decoration-none mb-3"
            href="https://api.whatsapp.com/send?phone=966502052280&text=Send20%a20%quote"
          >
            +966502052280
          </a>
          <img
            src="/assets/footer.png"
            alt="sociel"
            style={{ maxWidth: "141px" }}
          />
        </div>
        <div className="col-12 col-lg-3 col-md-6 d-flex flex-column">
          <span className="h4 mb-3">روابط مساعدة</span>
          <a className="mb-2 text-decoration-none" href="/public/mobile/">
            نبذة عن مون 10
          </a>
          <a className="mb-2 text-decoration-none" href="/public/mobile/">
            تواصل معنا
          </a>
          <a className="mb-2 text-decoration-none" href="/public/mobile/">
            الأسئلة الشائعة
          </a>
        </div>
        <div className="col-12 col-lg-3 col-md-6 d-flex flex-wrap">
          <span className="h4 mb-3 w-100">مواقع الفروع</span>
          <ul className="m-0 p-0">
            <li>حي السلامة - جدة</li>
            <li>حي الصفا - جدة</li>
            <li>حي النزهة - جدة</li>
            <li>حي السليمانية - جدة</li>
            <li>حي السامر - جدة</li>
          </ul>

          <ul className="m-0 mx-auto p-0">
            <li>حي الحمدانية</li>
            <li>حي الياقوت</li>
            <li>حي السنابل</li>
            <li>حي الرحاب</li>
            <li>حي الواحة</li>
          </ul>
        </div>
      </div>

      <div className="d-none row">
        <div className="col-5 col-lg-4">
          <span className="h4">اشترك في نشرتنا الاخبارية</span>
          كن أول من يعرف كل جديد
        </div>

        <div className="col-7 col-lg-4">
          <img src="/assets/home/footer/1.png" alt="footer img" />
        </div>

        <form action="/" method="POST" className="col-12 col-lg-4">
          <input type="email" placeholder="ادخل بريدك الالكتروني" />
          <button type="submit">اشترك الآن</button>
        </form>
      </div>

      <div id="policy" className="row mt-3">
        <a className="text-decoration-none" href="/public/mobile/">
          سياسة الخصوصية
        </a>
        <a className="text-decoration-none" href="/public/mobile/">
          سياسة الاسترجاع
        </a>
        <a className="text-decoration-none" href="/public/mobile/">
          الأحكام والشروط
        </a>

        <img src="/assets/home/footer/2.png" alt="" />
      </div>
    </div>
    <p className="mt-4 mb-0 text-center">
      <span>جميع الحقوق محفوظة | </span>© 2003-2024 Mon10
    </p>
  </>
);
