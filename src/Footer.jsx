import getText from "./translation";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import call from "./icons/call.jsx";
import whatsapp from "./icons/whatsapp.jsx";

/* eslint-disable import/no-anonymous-default-export */

const banks = [
  "https://www.msegat.com/_astro/mada.Bx07ek4T_17YVYh.svg",
  "https://www.msegat.com/_astro/bank-transfer.C0oXorf9_Z2rVK1U.webp",
  "https://www.msegat.com/_astro/master-card.DOsJuDqG_Z1bPDkw.svg",
  "https://www.msegat.com/_astro/visa.fN2z271z_Z1hHDKY.webp",
  "https://www.msegat.com/_astro/apple-pay.Dg2YpybF_Z2pgIge.webp",
  "https://www.msegat.com/_astro/stc-pay.DkAsAmzl_1oFqQV.webp",
  "https://www.msegat.com/_astro/sadad.Dazq8A7k_Z1mB36r.webp",
];

export default (
  <>
    <div className="container-fluid container-lg">
      <div className="align-items-stretch row">
        <div className="col-3 d-flex flex-column">
          <img className="mb-3" src="/assets/home/logo-white.svg" alt="logo" />
          {getText("footer", 7)}
          <br />
          {getText("footer", 8)}
          <br />
          {getText("footer", 9)}
        </div>

        <div className="col-3 d-flex flex-column">
          <span className="h5 mb-3">{getText("footer", 0)}</span>
          <a
            className="text-decoration-none mb-3 d-flex align-items-center gap-2"
            href="tel:+966920035416"
          >
            {call}
            920035416
          </a>
          <a
            className="text-decoration-none mb-3 d-flex align-items-center gap-2"
            // href="https://api.whatsapp.com/send?phone=966502052280&text=Send20%a20%quote"
            href="https://wa.me/+966920035416"
          >
            {whatsapp}
            920035416
          </a>
          {/* <img
            src="/assets/footer.png"
            alt="sociel"
            style={{ maxWidth: "141px" }}
          /> */}
        </div>

        <div className="col-3 d-flex flex-column">
          <span className="h5 mb-3">{getText("footer", 1)}</span>
          {/* <Link className="mb-2 text-decoration-none" to="/">
            {getText("footer", 2)}
          </Link> */}
          <Link className="mb-2 text-decoration-none" to="/about-us">
            {getText("footer", 3)}
          </Link>
          <Link className="mb-2 text-decoration-none" to="/faq">
            {getText("footer", 4)}
          </Link>
        </div>

        <div className="col-3 d-flex flex-wrap">
          <span className="h5 mb-3 w-100">{getText("footer", 5)}</span>
          <Branches />
        </div>

        <div className="col-3 d-flex flex-column gap-1">
          <span className="h5 mb-3">حمل التطبيق الآن</span>
          <Link to="">
            <img
              style={{ width: "142px" }}
              src="https://business-egy.com/assets/googleplay-9d43d8bd.jpg"
              alt="google Play"
            />
          </Link>

          <Link to="">
            <img
              style={{ width: "142px" }}
              src="https://business-egy.com/assets/appstore-25178aee.svg"
              alt="appstore"
            />
          </Link>
        </div>

        <div className="col d-flex flex-column">
          <ul className="align-items-center d-flex flex-wrap gap-2 justify-content-between list-unstyled m-0 p-0">
            {banks.map((b) => (
              <li key={b} style={{ width: "56px" }}>
                <img src={b} alt={b} />
              </li>
            ))}
          </ul>

          <hr />

          <ul className="d-flex gap-2 list-unstyled m-0 p-0 justify-content-evenly">
            <li
              className="align-items-center d-flex gap-2"
              style={{ fontSize: "smaller" }}
            >
              <div
                style={{
                  border: "1px solid var(--lightgray)",
                  borderRadius: "4px",
                }}
              >
                <img
                  src="https://www.msegat.com/_astro/VAT.JVrP6Ajw_1FjzEl.webp"
                  alt="VAT"
                  style={{ maxWidth: "64px" }}
                />
              </div>
              الرقم الضريبي
              <br />
              311354802600003
            </li>

            <li
              className="align-items-center d-flex gap-2"
              style={{ fontSize: "smaller" }}
            >
              <div
                className="p-1"
                style={{
                  border: "1px solid var(--lightgray)",
                  borderRadius: "4px",
                }}
              >
                <img
                  src="https://www.msegat.com/_astro/ministry-of-commerce.BUFqTQXd_Z1JiWzv.webp"
                  alt="CR"
                  style={{ maxWidth: "64px" }}
                />
              </div>
              السجل التجاري
              <br />
              4030479174
            </li>
          </ul>
        </div>

        <div className="col-3"></div>
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
