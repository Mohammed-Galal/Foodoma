import getText from "./translation";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import call from "./icons/call.jsx";
import whatsapp from "./icons/whatsapp.jsx";

/* eslint-disable import/no-anonymous-default-export */
export default (
  <>
    <div className="container-fluid container-lg">
      <div className="align-items-stretch row">
        <div className="col-12 col-lg-3 col-md-6 d-flex flex-column">
          <img className="mb-3" src="/assets/home/logo-white.svg" alt="logo" />
          {getText("footer", 7)}
          <br />
          {getText("footer", 8)}
          <br />
          {getText("footer", 9)}
        </div>

        <div className="col-12 col-lg-3 col-md-6 d-flex flex-column">
          <span className="h5 mb-3">{getText("footer", 0)}</span>
          <a
            className="text-decoration-none mb-3 d-flex align-items-center gap-2"
            href="tel:+966920035416"
          >
            {call}
            +920035416
          </a>
          <a
            className="text-decoration-none mb-3 d-flex align-items-center gap-2"
            // href="https://api.whatsapp.com/send?phone=966502052280&text=Send20%a20%quote"
            href="https://wa.me/+966920035416"
          >
            {whatsapp}
            +920035416
          </a>
          <img
            src="/assets/footer.png"
            alt="sociel"
            style={{ maxWidth: "141px" }}
          />
        </div>

        <div className="col-12 col-lg-3 col-md-6 d-flex flex-column">
          <span className="h5 mb-3">{getText("footer", 1)}</span>
          <Link className="mb-2 text-decoration-none" to="/">
            {getText("footer", 2)}
          </Link>
          <Link className="mb-2 text-decoration-none" to="/about-us">
            {getText("footer", 3)}
          </Link>
          <Link className="mb-2 text-decoration-none" to="/faq">
            {getText("footer", 4)}
          </Link>
        </div>

        <div className="col-12 col-lg-3 col-md-6 d-flex flex-wrap">
          <span className="h5 mb-3 w-100">{getText("footer", 5)}</span>
          <Branches />
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

        {/* <form action="/" method="POST" className="col-12 col-lg-4">
          <input type="email" placeholder="ادخل بريدك الالكتروني" />
          <button type="submit">اشترك الآن</button>
        </form> */}
      </div>

      <div id="policy" className="row mt-3 d-none">
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
      <span>{getText("footer", 6)} | </span>© 2003-2024 Mon10
    </p>
  </>
);

function Branches() {
  const branches = useSelector((e) => e.Restaurant).branches;

  return (
    <ul
      className="m-0 p-0 gap-1"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
    >
      {branches.map(Branche)}
    </ul>
  );
}

function Branche({ name }) {
  return <li key={name}>{name}</li>;
}
