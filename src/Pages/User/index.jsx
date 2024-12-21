/* eslint-disable import/no-anonymous-default-export */
import { useStore } from "react-redux";
import store from "../../store/index.js";
import { Link, useNavigate, useParams } from "react-router-dom";

const dispatch = store.dispatch,
  Base = "https://mon10.doobagency.com/public/api",
  Components = { login: Login, register: Register };

export default function () {
  const TargetPage = Components[useParams().action || "login"];
  const navigate = useNavigate();
  const authed = useStore().getState().User.loaded;

  if (authed) navigate("/");
  else
    return (
      <section id="user-credits" className="container">
        <TargetPage />
      </section>
    );
}

function Login() {
  const navigate = useNavigate();
  const reqBody = {
    email: "mkjj@gmail.com",
    password: "01065487118",
  };

  return (
    <div className="container">
      <b className="h3">Login</b>
      <span>Enter your email and password</span>

      <div className="row">
        <input
          type="email"
          onChange={(e) => (reqBody.email = e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          onChange={(e) => (reqBody.password = e.target.value)}
          placeholder="password"
        />

        <button type="button" className="btn" onClick={registerUser}>
          Login
        </button>
      </div>

      <p className="m-0">
        Don't have an account yet?
        <Link to="/user/register">Register</Link>
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
      .finally((redirect) => redirect && navigate("/"))
      .catch(console.error);
  }
}

function Register() {
  const navigate = useNavigate();

  const reqBody = {
    name: "mohammed GH",
    email: "mkjj@gmail.com",
    phone: "01069987118",
    password: "01065487118",
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
      <b className="h3">Register</b>
      <span>Regsiter now for free</span>

      <div className="row">
        <input
          type="text"
          onChange={(e) => (reqBody.name = e.target.value)}
          placeholder="name"
        />

        <input
          type="email"
          onChange={(e) => (reqBody.email = e.target.value)}
          placeholder="email"
        />

        <input
          type="tel"
          onChange={(e) => (reqBody.phone = e.target.value)}
          placeholder="phone"
        />

        <input
          type="password"
          onChange={(e) => (reqBody.password = e.target.value)}
          placeholder="password"
        />

        <button type="button" className="btn" onClick={registerUser}>
          Register
        </button>
      </div>

      <p className="m-0">
        Already have an account?
        <Link to="/user/login">Login</Link>
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
      .finally((redirect) => redirect && navigate("/"))
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
