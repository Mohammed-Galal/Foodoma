/* eslint-disable import/no-anonymous-default-export */
import getText from "../../translation";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import store, { getUserAlerts } from "../../store/index.js";

const dispatch = store.dispatch,
  Base = "https://admin.montana.sa/public/api",
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
  const reqBody = useRef({
    // email: "mkjj@gmail.com",
    // password: "01065487118",
  }).current;

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
          src="https://admin.montana.sa/assets/img/various/login-illustration.png"
          alt="avatar"
        />

        <div className="d-flex flex-column gap-2">
          <b className="h3 m-0" style={{ fontWeight: 700 }}>
            {getText("user", 0)}
          </b>
          <span>{getText("user", 1)}</span>
        </div>
      </div>

      <div
        className="my-5 row"
        style={{ rowGap: "1rem", color: "var(--primary)" }}
      >
        <div className="col-12 col-md-6">
          <h6>{getText("user", 2)}</h6>
          <input
            type="tel"
            className="input-group-text w-100"
            style={{ outline: "none" }}
            onChange={(e) => (reqBody.email = e.target.value)}
            placeholder={getText("user", 2)}
          />
        </div>

        <div className="col-12 col-md-6">
          <h6>{getText("user", 3)}</h6>
          <input
            type="password"
            style={{ outline: "none" }}
            className="input-group-text w-100"
            onChange={(e) => (reqBody.password = e.target.value)}
            placeholder={getText("user", 3)}
          />
        </div>

        <div className="col-12 col-md-6 mx-auto">
          <button
            type="button"
            className="btn w-100"
            style={{ backgroundColor: "var(--primary)", color: "#fff" }}
            onClick={registerUser}
          >
            {getText("user", 4)}
          </button>
        </div>
      </div>

      <p className="m-0 text-center" style={{ color: "var(--midgray)" }}>
        {getText("user", 5)}
        <Link
          to="/user/register"
          className="m-2 text-decoration-none"
          style={{ color: "var(--primary)" }}
        >
          {getText("user", 6)}
        </Link>
      </p>
    </div>
  );

  function registerUser() {
    if (!("email" in reqBody && "password" in reqBody))
      return alert(getText("user", 7));

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
    email: "",
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
          src="https://admin.montana.sa/assets/img/various/login-illustration.png"
          alt="avatar"
        />

        <div className="d-flex flex-column gap-2">
          <b className="h3 m-0" style={{ fontWeight: 700 }}>
            {getText("user", 8)}
          </b>
          <span>{getText("user", 9)}</span>
        </div>
      </div>

      <div
        className="my-5 row"
        style={{ rowGap: "1rem", color: "var(--primary)" }}
      >
        <div className="col-12 col-md-6">
          <h6>{getText("user", 10)}</h6>
          <input
            type="text"
            style={{ outline: "none" }}
            ref={(el) => el && (reqBody.name = el.value)}
            onChange={(e) => (reqBody.name = e.target.value)}
            className="input-group-text w-100"
            placeholder={getText("user", 10)}
          />
        </div>
        {/* <div className="col-12 col-md-6">
          <h6>{getText("user", 11)}</h6>
          <input
            type="email"
            style={{ outline: "none" }}
            onChange={(e) => (reqBody.email = e.target.value)}
            className="input-group-text w-100"
            placeholder={getText("user", 11)}
          />
        </div> */}
        <div className="col-12 col-md-6">
          <h6>{getText("user", 12)}</h6>
          <input
            type="tel"
            style={{ outline: "none" }}
            ref={(el) => el && (reqBody.phone = el.value)}
            onChange={(e) => (reqBody.phone = e.target.value)}
            className="input-group-text w-100"
            placeholder={getText("user", 12)}
          />
        </div>
        <div className="col-12 col-md-6 mx-auto">
          <h6>{getText("user", 13)}</h6>
          <input
            type="password"
            ref={(el) => el && (reqBody.password = el.value)}
            onChange={(e) => (reqBody.password = e.target.value)}
            className="input-group-text w-100"
            placeholder={getText("user", 13)}
          />
        </div>
        <div className="col-12">
          <div className="col-md-6 mx-auto">
            <button
              type="button"
              className="btn w-100"
              style={{ backgroundColor: "var(--primary)", color: "#fff" }}
              onClick={registerUser}
            >
              {getText("user", 14)}
            </button>
          </div>
        </div>
      </div>

      <p className="m-0 text-center" style={{ color: "var(--midgray)" }}>
        {getText("user", 15)}
        <Link
          to="/user/login"
          className="m-2 text-decoration-none"
          style={{ color: "var(--primary)" }}
        >
          {getText("user", 16)}
        </Link>
      </p>
    </div>
  );

  function registerUser() {
    setLoading(true);

    fetch(Base + "/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
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

  const infoEl = r.email_phone_already_used
    ? "used-account"
    : "wrong-credentials";
  document.getElementById(infoEl).showPopover();

  return succeded;
}
