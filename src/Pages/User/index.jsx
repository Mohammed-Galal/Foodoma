/* eslint-disable import/no-anonymous-default-export */
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { getUserAlerts } from "../../store/index.js";

const dispatch = store.dispatch,
  Base = "https://mon10.amir-adel.com/public/api",
  Components = { login: Login, register: Register };

const loader = (
  <div
    id="ftco-loader"
    style={{
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgb(180 210 237 / 23%)",
      color: "var(--primary)",
      zIndex: "1",
      pointerEvents: "all",
    }}
  >
    <svg className="circular" width="48px" height="48px">
      <circle
        className="path-bg"
        cx="24"
        cy="24"
        r="22"
        fill="none"
        stroke-width="4"
        stroke="currentColor"
        style={{ opacity: 0.2 }}
      ></circle>
      <circle
        className="path"
        cx="24"
        cy="24"
        r="22"
        fill="none"
        stroke-width="4"
        stroke-miterlimit="10"
        stroke="currentColor"
      ></circle>
    </svg>
  </div>
);

export default function () {
  const [loading, setLoading] = useState(true);
  const TargetPage = Components[useParams().action || "login"];
  const navigate = useNavigate();
  const authed = useSelector((e) => e.User).loaded;

  useLayoutEffect(() => {
    authed && navigate("/");
  });

  useEffect(
    function () {
      setLoading(false);
    },
    [authed]
  );

  return (
    <section id="user-credits" className="container position-relative">
      <TargetPage setLoading={setLoading} />
      {loading && loader}
    </section>
  );
}

function Login({ setLoading }) {
  const navigate = useNavigate();
  const reqBody = {
    // email: "mkjj@gmail.com",
    // password: "01065487118",
  };

  return (
    <div className="container">
      <div
        className="d-flex justify-content-center align-items-center gap-2 py-5 px-3"
        style={{
          borderRadius: "16px",
          backgroundColor: "aliceblue",
          color: "var(--black)",
        }}
      >
        <img
          className="animate-reveal"
          src="https://mon10.amir-adel.com/assets/img/various/login-illustration.png"
          alt="avatar"
        />

        <div className="d-flex flex-column gap-2">
          <b className="h3 m-0" style={{ fontWeight: 700 }}>
            تسجيل الدخول
          </b>
          <span>أدخل بريدك الإلكتروني وكلمة المرور</span>
        </div>
      </div>

      <div
        className="my-5 row"
        style={{ rowGap: "1rem", color: "var(--primary)" }}
      >
        <div className="col-12 col-md-6">
          <h6>رقم الهاتف أو البريد الالكتروني</h6>
          <input
            type="email"
            className="input-group-text w-100"
            style={{ outline: "none" }}
            onChange={(e) => (reqBody.email = e.target.value)}
            placeholder="البريد الإلكتروني"
          />
        </div>

        <div className="col-12 col-md-6">
          <h6>كلمة المرور</h6>
          <input
            type="password"
            style={{ outline: "none" }}
            className="input-group-text w-100"
            onChange={(e) => (reqBody.password = e.target.value)}
            placeholder="كلمة المرور"
          />
        </div>

        <div className="col-12 col-md-6 mx-auto">
          <button
            type="button"
            className="btn w-100"
            style={{ backgroundColor: "var(--primary)", color: "#fff" }}
            onClick={registerUser}
          >
            سجل دخول
          </button>
        </div>
      </div>

      <p className="m-0 text-center" style={{ color: "var(--midgray)" }}>
        ليس لديك حساب بعد؟
        <Link
          to="/user/register"
          className="m-2 text-decoration-none"
          style={{ color: "var(--primary)" }}
        >
          أنشئ حسابك الآن
        </Link>
      </p>
    </div>
  );

  function registerUser() {
    if (!("email" in reqBody && "password" in reqBody))
      return alert("يرجى ملئ جميع البيانات");

    setLoading(true);

    fetch(Base + "/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((r) => r.json())
      .then(handleUserData)
      .then((redirect) => {
        redirect && navigate("/");
        setLoading(false);
      })
      .catch(console.error);
  }
}

function Register({ setLoading }) {
  const navigate = useNavigate();

  const reqBody = {
    address: {
      lat: null,
      lng: null,
      address: null,
      house: null,
      tag: "tag",
    },
  };

  return (
    <div className="container">
      <div
        className="d-flex justify-content-center align-items-center gap-2 py-5 px-3"
        style={{
          borderRadius: "16px",
          backgroundColor: "aliceblue",
          color: "var(--black)",
        }}
      >
        <img
          className="animate-reveal"
          src="https://mon10.amir-adel.com/assets/img/various/login-illustration.png"
          alt="avatar"
        />

        <div className="d-flex flex-column gap-2">
          <b className="h3 m-0" style={{ fontWeight: 700 }}>
            إنشاء حساب جديد
          </b>
          <span>أنشئ حسابك الآن مجاناً</span>
        </div>
      </div>

      <div
        className="my-5 row"
        style={{ rowGap: "1rem", color: "var(--primary)" }}
      >
        <div className="col-12 col-md-6">
          <h6>الاسم</h6>
          <input
            type="text"
            style={{ outline: "none" }}
            onChange={(e) => (reqBody.name = e.target.value)}
            className="input-group-text w-100"
            placeholder="الاسم"
          />
        </div>
        <div className="col-12 col-md-6">
          <h6>البريد الالكتروني</h6>
          <input
            type="email"
            style={{ outline: "none" }}
            onChange={(e) => (reqBody.email = e.target.value)}
            className="input-group-text w-100"
            placeholder="البريد الإلكتروني"
          />
        </div>
        <div className="col-12 col-md-6">
          <h6>رقم الهاتف</h6>
          <input
            type="tel"
            style={{ outline: "none" }}
            onChange={(e) => (reqBody.phone = e.target.value)}
            className="input-group-text w-100"
            placeholder="الهاتف"
          />
        </div>
        <div className="col-12 col-md-6">
          <h6>كلمة المرور</h6>
          <input
            type="password"
            onChange={(e) => (reqBody.password = e.target.value)}
            className="input-group-text w-100"
            placeholder="كلمة المرور"
          />
        </div>
        <div className="col-12 col-md-6 mx-auto">
          <button
            type="button"
            className="btn w-100"
            style={{ backgroundColor: "var(--primary)", color: "#fff" }}
            onClick={registerUser}
          >
            أنشئ حسابك
          </button>
        </div>
      </div>

      <p className="m-0 text-center" style={{ color: "var(--midgray)" }}>
        لديك حساب بالفعل؟
        <Link
          to="/user/login"
          className="m-2 text-decoration-none"
          style={{ color: "var(--primary)" }}
        >
          سجل دخولك
        </Link>
      </p>
    </div>
  );

  function registerUser() {
    setLoading(true);

    fetch(Base + "/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((r) => r.json())
      .then(handleUserData)
      .then((redirect) => {
        redirect && navigate("/");
        setLoading(false);
      })
      .catch(console.error);
  }
}

function handleUserData(r) {
  const succeded = !!r.success;

  if (succeded) {
    // redux Code
    dispatch({ type: "user/init", payload: r.data });
    getUserAlerts();
    return true;
  }

  alert("يرجى التحقق من البيانات المطلوبة");

  return succeded;
}
