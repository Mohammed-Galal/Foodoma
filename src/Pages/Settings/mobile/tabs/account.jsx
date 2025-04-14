/* eslint-disable import/no-anonymous-default-export */
import getText from "../../../../translation";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const phaseComponent = [ChangeNonOTPData, ChangePhoneNumber],
  liStyle = {
    borderRadius: "inherit",
    transition: "0.3s",
  };

export default function () {
  const User = useSelector((e) => e.User).data,
    [targetAction, setTargetAction] = useState(0),
    TargetComponent = phaseComponent[targetAction];

  return (
    <div className="d-flex flex-column">
      <ul
        className="d-inline-flex gap-3 list-unstyled mb-5 px-2 py-2"
        style={{
          background: "aliceblue",
          borderRadius: "30px",
          color: "var(--primary)",
          alignSelf: "center",
        }}
      >
        <li
          onClick={() => setTargetAction(0)}
          className="py-1 px-3"
          style={{
            ...liStyle,
            backgroundColor: "#fff" + (!targetAction ? "f" : "0"),
          }}
        >
          {"الاسم وكلمة المرور"}
        </li>
        <li
          onClick={() => setTargetAction(1)}
          className="py-1 px-3"
          style={{
            ...liStyle,
            backgroundColor: "#fff" + (!!targetAction ? "f" : "0"),
          }}
        >
          {"رقم الهاتف"}
        </li>
      </ul>

      <TargetComponent userData={User} />
    </div>
  );
}

function ChangeNonOTPData({ userData }) {
  const [changePassword, setChangePassword] = useState(false),
    reqBody = useRef({
      name: "",
      phone: "",
      email: "",
      new_password: "",
      old_password: "",
    }).current;

  return (
    <div
      className="d-flex flex-column gap-3 mx-auto w-100"
      style={{
        maxWidth: "600px",
        color: "var(--primary)",
        accentColor: "var(--primary)",
      }}
    >
      <label>
        {"الاسم بالكامل"}
        <input
          type="text"
          className="form-control mt-3"
          placeholder={userData.name}
          onChange={({ target }) => (reqBody.name = target.value)}
        />
      </label>

      <label>
        <input
          type="checkbox"
          onChange={({ target }) => setChangePassword(target.checked)}
        />{" "}
        {"تغيير كلمة المرور"}
      </label>

      {changePassword && (
        <>
          <label>
            {"كلمة المرور الجديدة"}
            <input
              type="password"
              className="form-control mt-3"
              onChange={({ target }) => (reqBody.new_password = target.value)}
            />
          </label>
        </>
      )}

      <button
        type="button"
        className="btn"
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
          // fontSize: "smaller",
          width: "100%",
          // maxWidth: "480px",
          borderRadius: "24px",
        }}
      >
        {"حفظ التحديثات"}
      </button>

      <div id="confirm-password" popover="manual">
        <label>{"كلمة المرور الحالية"}</label>
        <input
          type="password"
          className="form-control"
          onChange={({ target }) => (reqBody.old_password = target.value)}
        />

        <button onClick={updateUserData}>{"تأكيد"}</button>
        <button onClick={() => {}}>{"الغاء"}</button>
      </div>
    </div>
  );

  function updateUserData() {
    fetch(process.env.REACT_APP_API_URL + "/public/api/update-user-data", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { Authorization: userData.auth_token },
    })
      .then((r) => r.json())
      .then((r) =>
        r.success || true ? window.location.reload() : alert(r.data)
      )
      .catch(() => alert("حدث خطأ، يرجى اعادة المحاولة"));
  }
}

function ChangePhoneNumber({ userData }) {
  const [newPhone, setNewPhone] = useState(""),
    phone = userData.phone;

  let OTP = null;

  return (
    <div
      className="d-flex flex-column gap-4 mx-auto w-100"
      style={{ maxWidth: "600px" }}
    >
      <div className="input-group" dir="ltr">
        <span className="input-group-text">966</span>
        <input
          type="tel"
          className="form-control"
          placeholder={phone}
          onChange={({ target }) => setNewPhone(target.value)}
        />
      </div>

      <button
        className="btn mx-auto w-100"
        disabled={newPhone.length === 0}
        onClick={openPhoneOTP}
        style={{
          background: "var(--primary)",
          color: "#fff",
          borderRadius: "30px",
        }}
      >
        {"تأكيد"}
      </button>

      <div
        id="phone-otp"
        popover="manual"
        className="w-100"
        style={{
          background: "#fff",
          borderRadius: "8px",
          border: "1px solid aliceblue",
          maxWidth: "600px",
          color: "var(--primary)",
        }}
      >
        <div className="align-items-center d-flex flex-column gap-3 px-4 py-3">
          <label>{"يرجى ادخال رمز التحقق"}</label>

          <input
            type="number"
            className="form-control"
            placeholder={"يرجى ادخال رمز التحقق"}
            onChange={({ target }) => (OTP = target.value)}
          />

          <button
            type="button"
            className="btn px-5"
            style={{
              background: "var(--primary)",
              color: "#fff",
              borderRadius: "30px",
            }}
            onClick={confirmOTP}
          >
            {"تأكيد"}
          </button>
        </div>
      </div>
    </div>
  );

  function openPhoneOTP() {
    if (newPhone.length !== 9)
      return alert("يجب أن يتكون رقم الهاتف من 9 ارقام");
    const phoneOTP = document.getElementById("phone-otp");

    fetch(process.env.REACT_APP_API_URL + "/public/api/change-mobile-otp", {
      method: "POST",
      body: JSON.stringify({ phone }),
      headers: { Authorization: window.localStorage.getItem("token") },
    })
      .then((r) => r.json())
      .then((r) =>
        r.success || true ? phoneOTP.showPopover() : alert(r.data)
      );
  }

  function confirmOTP() {
    fetch(process.env.REACT_APP_API_URL + "/public/api/change-mobile", {
      method: "POST",
      body: JSON.stringify({ phone: newPhone, otp: OTP }),
      headers: { Authorization: window.localStorage.getItem("token") },
    })
      .then((r) => r.json())
      .then((r) => r.success || (true && window.location.reload()));
  }
}
