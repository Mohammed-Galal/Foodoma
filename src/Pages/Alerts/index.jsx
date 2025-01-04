import { useSelector } from "react-redux";
import { getUserAlerts } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";

const base = "https://mon10.doobagency.com",
  baseUrl = base + "/public/api",
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
    User = useSelector((state) => state.User),
    loaded = User.loaded,
    alerts = User.alerts.map(alertItem);

  useLayoutEffect(() => {
    loaded || redirect("/user");
  }, [loaded]);

  return (
    <section className="align-items-start container d-flex flex-column gap-3">
      <button
        className="btn"
        style={{ border: "none", outline: "none" }}
        onClick={markAllAsRead}
      >
        تمييز الكل كمقروء
      </button>

      <ul className="list-unstyled m-0 p-0 w-100" style={{ maxWidth: "992px" }}>
        {alerts}
      </ul>
    </section>
  );
}

function alertItem({ data, id, is_read, created_at }) {
  data = JSON.parse(data);

  const reqBody = { notification_id: id },
    img = data.custom_image ? (
      <img
        src={base + data.custom_image}
        className="mx-auto"
        style={{ maxHeight: 150 + "px" }}
        alt="custom"
      />
    ) : null,
    outletChildren = (
      <>
        <span className="float-start">{created_at.split(" ")[0]}</span>
        <span className="h5 d-block h5 m-0">{data.title}</span>
        {data.message}
      </>
    ),
    outlet = data.click_action ? (
      <Link
        to={data.click_action}
        className="px-3 py-2 text-decoration-none"
        style={{ color: "currentColor" }}
      >
        {outletChildren}
      </Link>
    ) : (
      <div className="px-3 py-2">{outletChildren}</div>
    );

  return (
    <li
      className="d-grid gap-3 mt-3"
      style={{
        backgroundColor: "aliceblue",
        borderRadius: "0.5rem",
        opacity: is_read ? 0.5 : 1,
      }}
      key={id}
      onClick={markAlertAsRead}
    >
      {img}
      {outlet}
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
