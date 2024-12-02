/* eslint-disable import/no-anonymous-default-export */
import { Link } from "react-router-dom";

export default function () {
  return (
    <ul className="d-flex flex-column gap-3 list-unstyled m-0 p-0">
      <li
        className="pb-2"
        style={{ cssText: "border-bottom: 1px solid #BDBDBD;" }}
      >
        <Link
          className="text-decoration-none"
          style={{ color: "var(--midgray)" }}
          to="/"
        >
          تحديث البيانات الشخصية
        </Link>
      </li>

      <li
        className="pb-2"
        style={{ cssText: "border-bottom: 1px solid #BDBDBD;" }}
      >
        <Link
          className="text-decoration-none"
          style={{ color: "var(--midgray)" }}
          to="/"
        >
          البطاقات المحفوظة
        </Link>
      </li>
    </ul>
  );
}
