/* eslint-disable import/no-anonymous-default-export */

import { useRef, useState } from "react";

export default function () {
  const reqBody = useRef({
      name: "",
      phone: "",
      email: "",
      new_password: "",
      old_password: "",
    }),
    [changePass, setChangePass] = useState(false);

  return (
    <ul
      className="d-flex flex-column gap-3 list-unstyled m-0 p-0"
      style={{ color: "var(--primary)" }}
    >
      <li>
        <label className="d-flex flex-column gap-2">
          الاسم بالكامل
          <input
            type="text"
            style={{ outline: "none", borderColor: "#d4e8f6" }}
            onChange={({ target }) => (reqBody.current.name = target.value)}
            className="input-group-text text-end"
            placeholder="الاسم"
          />
        </label>
      </li>

      <li>
        <label className="d-flex flex-column gap-2">
          البريد الالكتروني
          <input
            type="text"
            style={{ outline: "none", borderColor: "#d4e8f6" }}
            onChange={({ target }) => (reqBody.current.email = target.value)}
            className="input-group-text text-end"
            placeholder="البريد الالكتروني"
          />
        </label>
      </li>

      <li>
        <label className="d-flex flex-column gap-2">
          رقم الهاتف
          <input
            type="text"
            style={{ outline: "none", borderColor: "#d4e8f6" }}
            onChange={({ target }) => (reqBody.current.phone = target.value)}
            className="input-group-text text-end"
            placeholder="رقم الهاتف"
          />
        </label>
      </li>

      <li>
        <label className="d-flex align-items-center gap-2">
          <input
            type="checkbox"
            checked={changePass}
            onChange={(e) => setChangePass(e.target.checked)}
          />
          تغيير كلمة المرور
        </label>
      </li>

      {changePass && (
        <li>
          <label className="d-flex flex-column gap-2">
            كلمة المرور الجديدة
            <input
              type="text"
              style={{ outline: "none", borderColor: "#d4e8f6" }}
              onChange={({ target }) =>
                (reqBody.current.new_password = target.value)
              }
              className="input-group-text text-end"
              placeholder="كلمة المرور الجديدة"
            />
          </label>
        </li>
      )}

      <li className="d-flex mt-5">
        <button
          className="btn mx-auto"
          onClick={confirmPassword}
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
            fontSize: "smaller",
            width: "100%",
            maxWidth: "480px",
            borderRadius: "24px",
          }}
        >
          حفظ التحديثات
        </button>
      </li>
    </ul>
  );

  function confirmPassword() {
    const pass = window.prompt("من فضلك اكتب كلمة المرور");
    reqBody.current.old_password = pass;
  }
}
