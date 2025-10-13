import moment from "moment/moment";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function ({ reqBody, isSpecial }) {
  const res = useSelector((e) => e.Restaurant),
    { now, max } = useMemo(
      () => ({ now: moment(), max: moment().add(7, "days") }),
      []
    );

  const [time, setTime] = useState("");
  // debugger;

  reqBody.is_scheduled = "";
  reqBody.schedule_date = "";
  reqBody.schedule_slot = "";

  if (!res.data.is_schedulable || !isSpecial) return null;
  if (time !== "") {
    reqBody.is_scheduled = true;
    reqBody.schedule_date = {
      date: time.format("YYYY-MM-DD"),
      day: time.format("dddd"),
    };
    reqBody.schedule_slot = {
      open: time.format("HH:mm"),
      close: moment(time).add(30, "minute").format("HH:mm"),
    };
  }

  return (
    <label
      className="d-flex flex-column gap-2"
      style={{
        color: "var(--primary)",
        fontWeight: "600",
        textAlign: "start",
        width: "fit-content",
      }}
    >
      <span style={{ textWrap: "nowrap" }}>موعد الطلب</span>
      <input
        className="form-control"
        style={{ width: "unset" }}
        onChange={handleTimeChange}
        type="datetime-local"
        value={time === "" ? "" : time.format("YYYY-MM-DDTHH:mm")}
      />
    </label>
  );

  function handleTimeChange({ target }) {
    const newVal = moment(target.value);
    if (newVal.isAfter(max)) newVal.set(max.toObject());
    else if (newVal.isBefore(now)) newVal.set(now.toObject());

    setTime(newVal);
  }
}
