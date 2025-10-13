import { Link } from "react-router-dom";

export default () => (
  <section
    className="align-items-center container d-flex flex-column gap-4 justify-content-center"
    style={{ height: "55vh" }}
  >
    <div style={{ color: "var(--primary)", textAlign: "center" }}>
      <h2 className="m-0" style={{ fontSize: "5rem" }}>
        404
      </h2>
      <p className="m-0" style={{ fontWeight: "600", color: "var(--bs-gray)" }}>
        هذه الصفحة غير موجودة
      </p>
    </div>

    <Link
      to="/"
      className="btn px-4"
      style={{
        color: "var(--primary)",
        textDecoration: "none",
        backgroundColor: "#0b43680f",
      }}
    >
      الصفحة الرئيسية
    </Link>
  </section>
);
