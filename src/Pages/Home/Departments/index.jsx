import getText from "../../../translation";
import data from "./data.json";
import { Link } from "react-router-dom";
import "./index.scss";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */

export default ({ sectionName }) => (
  <section id="moon-sections">
    <div className="container-fluid container-lg d-flex flex-column align-items-center">
      {sectionName && (
        <p
          className="d-flex align-items-center justify-content-between"
          style={{
            width: "100%",
            color: "var(--primary)",
            marginBottom: "var(--internal-gap)",
          }}
        >
          <span className="h3">{sectionName}</span>

          <Link
            to="/all-products/"
            className="d-flex align-items-center text-decoration-none"
            style={{ color: "inherit" }}
          >
            {getText("home", 8)}
            <object
              style={{ marginRight: "0.4rem" }}
              data="/assets/home/icons/left-arrow.svg"
            ></object>
          </Link>
        </p>
      )}

      <div className="d-flex flex-wrap gap-3 justify-content-around">
        {data.map(sectionItem)}
      </div>
    </div>
  </section>
);

function sectionItem({ img, title }, I) {
  return (
    <Link
      className="align-items-center d-flex flex-column gap-2 p-4"
      to={"/all-products/" + title}
      key={I}
    >
      <img className="my-auto" src={img} alt={title} />
      {title}
    </Link>
  );
}
