/* eslint-disable import/no-anonymous-default-export */
import getText from "../../translation";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import store, { getUserAlerts } from "../../store/index.js";

const dispatch = store.dispatch,
  Base = process.env.REACT_APP_API_URL + "/public/api",
  Components = {
    login: Login,
    register: Register,
    resetPassword: ResetPassword,
  };

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
  const reqBody = useRef({}).current;
  const [loading, setLoading] = useState(true);
  const [otpRequired, setOtp] = useState(false);
  const navigate = useNavigate();
  const targetAct = useParams().action;
  const authed = useSelector((e) => e.User).loaded;
  const TargetPage = otpRequired
    ? OTP
    : Components[targetAct] || Components.login;

  useLayoutEffect(() => {
    authed && navigate("/");
  });

  useEffect(() => {
    setLoading(false);
  }, [authed]);

  return (
    <section id="user-credits" className="container position-relative">
      <TargetPage sendReq={sendReq} reqBody={reqBody} />
      {loading && loader}

      <div
        id="reset-password"
        popover="manual"
        className="container"
        style={{
          borderRadius: "8px",
          borderColor: "aliceblue",
          maxWidth: "600px",
          color: "var(--primary)",
        }}
      >
        <div className="d-flex flex-column gap-3 px-5 py-4">
          <span className="h6">{"يرجى ادخال رقم الهاتف"}</span>

          <div className="input-group" dir="ltr">
            <span className="input-group-text">966</span>
            <input
              type="tel"
              className="form-control"
              onChange={({ target }) => (reqBody.email = target.value)}
              placeholder={"رقم الهاتف"}
              defaultValue={reqBody.email}
            />
          </div>

          <button
            className="btn"
            style={{ backgroundColor: "var(--primary)", color: "#fff" }}
            onClick={resetPassword}
          >
            {"تأكيد"}
          </button>
        </div>
      </div>
    </section>
  );

  function sendReq() {
    if (!("email" in reqBody && "password" in reqBody))
      return alert("يرجى ملئ جميع البيانات");

    const phone = reqBody.email === "" ? reqBody.phone : reqBody.email;
    if (phone.length !== 9) return alert("رقم الهاتف يجب ان يكون 9 ارقام");

    setLoading(true);

    fetch(Base + "/" + targetAct, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((r) => r.json())
      .then(handleUserData)
      .then((redirect) => {
        if (redirect === "OTP") setOtp(true);
        else if (redirect) navigate("/");
        setLoading(false);
      })
      .catch(console.error);
  }

  function resetPassword() {
    if (reqBody.email.length !== 9)
      return alert("رقم الهاتف يجب ان يكون 9 ارقام");
    fetch(Base + "/forgot-password", {
      method: "POST",
      body: JSON.stringify({
        phone: reqBody.email,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        // if (!r.success) return alert(r.data);
        navigate("/user/resetPassword");
      });
  }
}

function Login({ sendReq, reqBody }) {
  useEffect(() => {
    reqBody.name = "";
    reqBody.email = "";
    reqBody.phone = "";
    reqBody.password = "";
  }, []);

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
          src={
            process.env.REACT_APP_API_URL +
            "/assets/img/various/login-illustration.png"
          }
          alt="avatar"
        />

        <div className="d-flex flex-column gap-2">
          <b className="h3 m-0" style={{ fontWeight: 700 }}>
            {"تسجيل الدخول"}
          </b>
          <span>{"أدخل رقم الهاتف وكلمة المرور"}</span>
        </div>
      </div>

      <div
        className="my-5 row flex-column align-items-center"
        style={{ rowGap: "1rem", color: "var(--primary)" }}
      >
        <div className="col-12 col-md-6">
          <h6>{"رقم الهاتف"}</h6>

          <div className="flex-nowrap input-group" dir="ltr">
            <span
              className="input-group-text"
              style={{
                borderRadius: "0.375rem 0 0 0.375rem",
                color: "#495057",
              }}
            >
              +966
            </span>

            <input
              type="tel"
              className="form-control"
              style={{ outline: "none", borderRadius: "0 0.375rem 0.375rem 0" }}
              defaultValue={reqBody.email}
              onChange={(e) => (reqBody.email = e.target.value)}
              placeholder={"رقم الهاتف"}
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <h6>{"كلمة المرور"}</h6>
          <input
            type="password"
            style={{ outline: "none" }}
            className="form-control"
            defaultValue={reqBody.password}
            onChange={(e) => (reqBody.password = e.target.value)}
            placeholder={"كلمة المرور"}
          />
        </div>

        <div className="col-12 col-md-6 mx-auto">
          <button
            type="button"
            className="btn w-100"
            style={{ backgroundColor: "var(--primary)", color: "#fff" }}
            onClick={sendReq}
          >
            {"سجل دخول"}
          </button>
        </div>
      </div>

      <p className="m-0 text-center" style={{ color: "var(--midgray)" }}>
        {"ليس لديك حساب بعد؟"}

        <Link
          to="/user/register"
          className="m-2 text-decoration-none"
          style={{ color: "var(--primary)" }}
        >
          {"أنشئ حسابك الآن"}
        </Link>

        <button
          className="d-block mt-2 btn mx-auto"
          style={{ color: "var(--primary)" }}
          onClick={() =>
            document.getElementById("reset-password").showPopover()
          }
        >
          {"إعادة تعيين كلمة المرور؟"}
        </button>
      </p>
    </div>
  );
}

function Register({ sendReq, reqBody }) {
  useEffect(() => {
    reqBody.name = "";
    reqBody.email = "";
    reqBody.phone = "";
    reqBody.password = "";
  }, []);

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
          src={
            process.env.REACT_APP_API_URL +
            "/assets/img/various/login-illustration.png"
          }
          alt="avatar"
        />

        <div className="d-flex flex-column gap-2">
          <b className="h3 m-0" style={{ fontWeight: 700 }}>
            {"إنشاء حساب جديد"}
          </b>
          <span>{"أنشئ حسابك الآن مجاناً"}</span>
        </div>
      </div>

      <div
        className="my-5 row flex-column align-items-center"
        style={{ rowGap: "1rem", color: "var(--primary)" }}
      >
        <div className="col-12 col-md-6">
          <h6>{"الاسم"}</h6>
          <input
            type="text"
            style={{ outline: "none" }}
            defaultValue={reqBody.name}
            onChange={(e) => (reqBody.name = e.target.value)}
            className="form-control"
            placeholder={"الاسم"}
          />
        </div>

        <div className="col-12 col-md-6">
          <h6>{"رقم الهاتف"}</h6>
          <div className="flex-nowrap input-group" dir="ltr">
            <span
              className="input-group-text"
              style={{
                borderRadius: "0.375rem 0 0 0.375rem",
                color: "#495057",
              }}
            >
              +966
            </span>
            <input
              type="tel"
              className="form-control"
              style={{ outline: "none", borderRadius: "0 0.375rem 0.375rem 0" }}
              defaultValue={reqBody.phone}
              onChange={(e) => (reqBody.phone = e.target.value)}
              placeholder={"رقم الهاتف"}
            />
          </div>
        </div>
        <div className="col-12 col-md-6 mx-auto">
          <h6>{"كلمة المرور"}</h6>
          <input
            type="password"
            defaultValue={reqBody.password}
            onChange={(e) => (reqBody.password = e.target.value)}
            className="form-control"
            placeholder={"كلمة المرور"}
          />
        </div>
        <div className="col-12">
          <div className="col-md-6 mx-auto">
            <button
              type="button"
              className="btn w-100"
              style={{ backgroundColor: "var(--primary)", color: "#fff" }}
              onClick={sendReq}
            >
              {"أنشئ حسابك"}
            </button>
          </div>
        </div>
      </div>

      <p className="m-0 text-center" style={{ color: "var(--midgray)" }}>
        {"لديك حساب بالفعل؟"}
        <Link
          to="/user/login"
          className="m-2 text-decoration-none"
          style={{ color: "var(--primary)" }}
        >
          {"سجل دخولك"}
        </Link>
      </p>
    </div>
  );
}

function ResetPassword({ reqBody }) {
  const navigate = useNavigate(),
    otpInfo = useRef({ phone: reqBody.email, otp: "", password: "" }).current;

  useEffect(() => {
    document.getElementById("reset-password").hidePopover();
  });

  // if (!otpInfo.phone) return null;

  return (
    <div>
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
          src={
            process.env.REACT_APP_API_URL +
            "/assets/img/various/login-illustration.png"
          }
          alt="avatar"
        />

        <div className="d-flex flex-column gap-2">
          <b className="h3 m-0" style={{ fontWeight: 700 }}>
            {"اعادة تعيين كلمة المرور"}
          </b>
          <span>{"يرجى إدخال البيانات المطلوبة"}</span>
        </div>
      </div>

      <label className="h6">
        {"رمز التحقق"}
        <input
          type="number"
          className="form-control"
          onChange={({ target }) => (otpInfo.otp = target.value)}
          placeholder="رمز التحقق"
        />
      </label>

      <label className="h6">
        {"كلمة المرور الجديدة"}
        <input
          type="password"
          className="form-control"
          onChange={({ target }) => (otpInfo.password = target.value)}
          placeholder="كلمة المرور الجديدة"
        />
      </label>

      <button className="input-group-text btn" onClick={confirmOTP}>
        {"ارسال"}
      </button>
    </div>
  );

  function confirmOTP() {
    // validation
    fetch(Base + "/user/reset-password", {
      method: "POST",
      body: JSON.stringify(otpInfo),
    })
      .then((r) => r.json())
      .then(() => {
        navigate("/user/login");
      });
  }
}

function OTP({ reqBody }) {
  const navigate = useNavigate();
  const otpRef = useRef();

  return (
    <div
      className="container"
      style={{
        borderColor: "#eaf5fe",
        borderRadius: "10px",
        maxWidth: "650px",
      }}
    >
      <div
        className="d-flex flex-column gap-2 pb-2 px-3 text-center"
        style={{ color: "var(--midgray)" }}
      >
        <b className="text-danger">OTP</b>
        {"يرجى ادخال رمز التحقق"}
        <div className="d-flex gap-2">
          <input type="text" className="form-control" ref={otpRef} />
          <button className="btn btn-primary" type="button" onClick={sendOTP}>
            {"ارسال"}
          </button>
        </div>
        <Timer reqRef={reqBody} />
      </div>
    </div>
  );

  function sendOTP() {
    const phone = reqBody.email === "" ? reqBody.phone : reqBody.email,
      otpCode = otpRef.current.value;

    if (otpCode.length !== 6)
      return alert("يجب ادخال رمز التحقق المكون من 6 أرقام");

    fetch(Base + "/user/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phone: phone, otp: otpCode }),
      headers: { "content-type": "application/json" },
    })
      .then((r) => r.json())
      .then(handleUserData)
      .then((redirect) => redirect && navigate("/"))
      .catch(console.error);
  }
}

function Timer({ reqRef }) {
  const [time, setTime] = useState(10);

  useEffect(() => {
    setTimeout(() => time > 0 && setTime(time - 1), 1000);
  }, [time]);

  return (
    <div>
      {time > 0 ? (
        `يمكنك اعادة ارسال الكود بعد ${time} ثانية`
      ) : (
        <button className="btn btn-outline-secondary px-4" onClick={resendCode}>
          {"اعادة ارسال الكود"}
        </button>
      )}
    </div>
  );

  function resendCode() {
    const phone = reqRef.email === "" ? reqRef.phone : reqRef.email;

    fetch(Base + "/resend/otp", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ phone }),
    })
      .then((r) => r.json())
      .then(() => setTime(60));
  }
}

function handleUserData(r) {
  const failed = !r.success;

  if (failed) {
    if (r.msg) alert(r.msg);
    else {
      const infoEl = r.email_phone_already_used
        ? "used-account"
        : "wrong-credentials";
      document.getElementById(infoEl).showPopover();
    }
    return false;
  } else if (r.data.auth_token === "") return "OTP";

  // redux Code
  dispatch({ type: "user/init", payload: r.data });
  getUserAlerts();

  return true;
}

/**
 {
  "success": true,
  "data": {
    "id": 13,
    "auth_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL21vbjEwLmFtaXItYWRlbC5jb20vcHVibGljL2FwaS91c2VyL3ZlcmlmeS1vdHAiLCJpYXQiOjE3NDIzNDAzMzAsIm5iZiI6MTc0MjM0MDMzMCwianRpIjoiT1J1UXhoM0NCbTNtWGM1eSIsInN1YiI6MTMsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.-YA7KFKFZuvpG4D_rDl6vE7zn7b-NlyEYNxaBaPdRzQ",
    "name": "mohammed galal",
    "email": "eqwqw6546@gmail.com",
    "phone": "01010541135",
    "default_address_id": 8,
    "default_address": "",
    "wallet_balance": 100,
    "avatar": null,
    "tax_number": null,
    "can_login": false
  },
  "running_order": null
}
 */

/**
 * {
  "success": true,
  "data": {
    "id": 33,
    "auth_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FkbWluLm1vbnRhbmEuc2EvcHVibGljL2FwaS9sb2dpbiIsImlhdCI6MTc0MjM0MzUyMywibmJmIjoxNzQyMzQzNTIzLCJqdGkiOiJDem5wd0Q0S2U1c0VOY1BxIiwic3ViIjozMywicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.I4TJySwAkR8drbFxD-9zvyBx0abmUyN1AhKR-CWMzFM",
    "name": "Mohammed",
    "email": null,
    "phone": "01010541135",
    "default_address_id": 55,
    "default_address": {
      "address": "dwa",
      "house": "wa",
      "latitude": "24.247166384920202",
      "longitude": "45.62298528409703",
      "tag": "grer"
    },
    "wallet_balance": 0,
    "avatar": null,
    "tax_number": null
  },
  "running_order": null
}
 */
