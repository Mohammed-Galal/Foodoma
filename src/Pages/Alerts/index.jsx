import { useSelector } from "react-redux";
import { getUserAlerts } from "../../store";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";

const baseUrl = "https://mon10.doobagency.com/public/api",
  fetchOptions = {
    method: "POST",
    get headers() {
      const obj = { "Content-Type": "application/json" },
        token = localStorage.getItem("token");
      return token ? { ...obj, Authorization: token } : obj;
    },
  };

export default function Alerts() {
  const redirect = useNavigate(),
    { loaded, alerts: Alerts } = useSelector((state) => state.User);

  useLayoutEffect(() => {
    loaded || redirect("/user");
  }, [loaded]);

  const unRead = [],
    read = [];

  Alerts.forEach((alert) =>
    (!!alert.is_read ? read : unRead).push(alertItem(alert))
  );

  return (
    <section className="container d-grid gap-3">
      <div
        className="overflow-hidden"
        style={{
          border: "1px solid var(--bs-primary-bg-subtle)",
          borderRadius: "8px",
        }}
      >
        <div
          className="d-flex align-items-center gap-3 justify-content-between px-2 py-1"
          style={{
            borderBottom: "1px solid var(--lightgray)",
            backgroundColor: "aliceblue",
          }}
        >
          <h5 className="m-0">{unRead.length} الاشعارات غير المقروءة</h5>
          <button
            className="btn"
            style={{ border: "none", outline: "none" }}
            onClick={markAllAsRead}
          >
            تمييز الكل كمقروء
          </button>
        </div>

        <ul className="list-unstyled m-0 p-0 w-100">{unRead}</ul>
      </div>

      <div
        className="overflow-hidden"
        style={{
          border: "1px solid var(--bs-primary-bg-subtle)",
          borderRadius: "8px",
        }}
      >
        <h5
          className="m-0 p-2"
          style={{
            borderBottom: "1px solid var(--lightgray)",
            backgroundColor: "aliceblue",
          }}
        >
          {read.length} الاشعارات المقروءة
        </h5>

        <ul className="list-unstyled m-0 p-0 w-100">{read}</ul>
      </div>
    </section>
  );
}

function alertItem({ data, id }) {
  const reqBody = { notification_id: id };

  data = JSON.parse(data);

  return (
    <li
      className="d-grid gap-2 px-3 py-2 mt-3"
      style={{
        backgroundColor: "aliceblue",
      }}
      key={id}
      onClick={markAlertAsRead}
    >
      <span className="h5 m-0">{data.title}</span>
      {data.message}
    </li>
  );

  function markAlertAsRead() {
    fetch(`${baseUrl}/mark-one-notification-read`, {
      ...fetchOptions,
      body: JSON.stringify(reqBody),
    }).then(getUserAlerts);
  }
}

function markAllAsRead() {
  console.log("mark all as read");
  fetch(`${baseUrl}/mark-all-notifications-read`, fetchOptions).then(
    getUserAlerts
  );
}
