/* eslint-disable import/no-anonymous-default-export */
import { useStore } from "react-redux";
import store from "../../store/index.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLayoutEffect } from "react";

const dispatch = store.dispatch,
  Base = "https://mon10.doobagency.com/public/api",
  Components = { login: Login, register: Register };

export default function () {
  const TargetPage = Components[useParams().action || "login"];
  const navigate = useNavigate();
  const authed = useStore().getState().User.loaded;

  useLayoutEffect(() => {
    authed && navigate("/");
  }, [authed]);
  return (
    <section id="user-credits" className="container">
      <TargetPage />
    </section>
  );
}

// email: "mkjj@gmail.com",
// password: "01065487118",

function Login() {
  const navigate = useNavigate();
  const reqBody = {};

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
          src="https://mon10.doobagency.com/assets/img/various/login-illustration.png"
          alt="avatar"
        />

        <div className="d-flex flex-column gap-2">
          <b className="h3 m-0" style={{ fontWeight: 700 }}>
            تسجيل الدخول
          </b>
          <span>أدخل بريدك الإلكتروني وكلمة المرور</span>
        </div>
      </div>

      <div className="my-5 row" style={{ rowGap: "1rem" }}>
        <div className="col-12 col-md-6">
          <input
            type="email"
            className="input-group-text w-100"
            style={{ outline: "none" }}
            onChange={(e) => (reqBody.email = e.target.value)}
            placeholder="البريد الإلكتروني"
          />
        </div>

        <div className="col-12 col-md-6">
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
    fetch(Base + "/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(reqBody),
    })
      .then((r) => r.json())
      .then(handleUserData)
      .then((redirect) => redirect && navigate("/"))
      .catch(console.error);
  }
}

function Register() {
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
          src="https://mon10.doobagency.com/assets/img/various/login-illustration.png"
          alt="avatar"
        />

        <div className="d-flex flex-column gap-2">
          <b className="h3 m-0" style={{ fontWeight: 700 }}>
            إنشاء حساب جديد
          </b>
          <span>أنشئ حسابك الآن مجاناً</span>
        </div>
      </div>

      <div className="my-5 row" style={{ rowGap: "1rem" }}>
        <div className="col-12 col-md-6">
          <input
            type="text"
            style={{ outline: "none" }}
            onChange={(e) => (reqBody.name = e.target.value)}
            className="input-group-text w-100"
            placeholder="الاسم"
          />
        </div>
        <div className="col-12 col-md-6">
          <input
            type="email"
            style={{ outline: "none" }}
            onChange={(e) => (reqBody.email = e.target.value)}
            className="input-group-text w-100"
            placeholder="البريد الإلكتروني"
          />
        </div>
        <div className="col-12 col-md-6">
          <input
            type="tel"
            style={{ outline: "none" }}
            onChange={(e) => (reqBody.phone = e.target.value)}
            className="input-group-text w-100"
            placeholder="الهاتف"
          />
        </div>
        <div className="col-12 col-md-6">
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
    fetch(Base + "/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(reqBody),
    })
      .then((r) => r.json())
      .then(handleUserData)
      .then((redirect) => redirect && navigate("/"))
      .catch(console.error);
  }
}

function handleUserData(r) {
  const succeded = !!r.success;

  if (succeded) {
    const token = r.data.auth_token;
    window.localStorage.setItem("token", token);

    // redux Code
    dispatch({ type: "user/init", payload: r.data });

    return true;
  }

  return succeded;
}
