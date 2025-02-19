/* eslint-disable import/no-anonymous-default-export */
import getText from "../../../../translation";
import { useRef, useState } from "react";
import { useStore } from "react-redux";

export default function () {
  const popover = useRef(),
    store = useStore(),
    { User } = store.getState(),
    reqBody = useRef({
      name: "",
      phone: "",
      email: "",
      new_password: "",
      old_password: "",
    }),
    [changePass, setChangePass] = useState(false);

  return (
    <>
      <ul
        className="d-flex flex-column gap-3 list-unstyled m-0 p-0"
        style={{ color: "var(--primary)" }}
      >
        <li>
          <label className="d-flex flex-column gap-2">
            {getText("settings", 15)}
            <input
              type="text"
              style={{ outline: "none", borderColor: "#d4e8f6" }}
              onChange={({ target }) => (reqBody.current.name = target.value)}
              className="input-group-text text-end"
              placeholder={getText("settings", 15)}
            />
          </label>
        </li>

        <li>
          <label className="d-flex flex-column gap-2">
            {getText("settings", 16)}
            <input
              type="text"
              style={{ outline: "none", borderColor: "#d4e8f6" }}
              onChange={({ target }) => (reqBody.current.email = target.value)}
              className="input-group-text text-end"
              placeholder={getText("settings", 16)}
            />
          </label>
        </li>

        <li>
          <label className="d-flex flex-column gap-2">
            {getText("settings", 17)}
            <input
              type="text"
              style={{ outline: "none", borderColor: "#d4e8f6" }}
              onChange={({ target }) => (reqBody.current.phone = target.value)}
              className="input-group-text text-end"
              placeholder={getText("settings", 17)}
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
            {getText("settings", 18)}
          </label>
        </li>

        {changePass && (
          <li>
            <label className="d-flex flex-column gap-2">
              {getText("settings", 19)}
              <input
                type="text"
                style={{ outline: "none", borderColor: "#d4e8f6" }}
                onChange={({ target }) =>
                  (reqBody.current.new_password = target.value)
                }
                className="input-group-text text-end"
                placeholder={getText("settings", 19)}
              />
            </label>
          </li>
        )}

        <li className="d-flex mt-5">
          <button
            className="btn mx-auto"
            popovertarget="user-account-msg"
            style={{
              backgroundColor: "var(--primary)",
              color: "#fff",
              fontSize: "smaller",
              width: "100%",
              maxWidth: "480px",
              borderRadius: "24px",
            }}
          >
            {getText("settings", 20)}
          </button>
        </li>
      </ul>

      <div
        popover="auto"
        id="user-account-msg"
        ref={popover}
        style={{
          width: "70%",
          maxWidth: "500px",
          border: "1px solid #d4e8f6",
          borderRadius: "24px",
        }}
      >
        <div
          className="d-grid gap-4 px-3 py-4"
          style={{ backgroundColor: "#fff" }}
        >
          <span className="text-center" style={{ color: "var(--primary)" }}>
            {getText("settings", 21)}
          </span>

          <input
            type="password"
            className="input-group-text"
            placeholder={getText("settings", 21)}
            onChange={({ target }) =>
              (reqBody.current.old_password = target.value)
            }
          />

          <button
            type="button"
            className="btn"
            style={{ backgroundColor: "var(--primary)", color: "#fff" }}
            onClick={confirmPassword}
          >
            {getText("settings", 22)}
          </button>
        </div>
      </div>
    </>
  );

  function confirmPassword() {
    popover.current.hidePopover && popover.current.hidePopover();

    fetch("https://admin.montana.sa/public/api/update-user-data", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { Authorization: User.data.auth_token },
    })
      .then((r) => r.json())
      .then((r) => {})
      .catch(() => alert(getText("settings", 23)));
  }
}
