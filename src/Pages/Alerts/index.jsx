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
    <section>
      <div>
        <h1>{unRead.length} unread alerts</h1>
        <button onClick={markAllAsRead}>Mark all as read</button>
        <ul className="unread">{unRead}</ul>
      </div>

      <ul className="read">{read}</ul>
    </section>
  );
}

function alertItem({ data, id }) {
  const reqBody = { notification_id: id };

  data = JSON.parse(data);

  return (
    <li key={id} onClick={markAlertAsRead}>
      <h3>{data.title}</h3>
      <p>{data.message}</p>
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
