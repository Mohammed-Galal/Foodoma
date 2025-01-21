import "./index.scss";
import data from "./data.json";
import { Link } from "react-router-dom";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */

export default ({ sectionName }) => (
  <section
    key="moon-sections"
    id="moon-sections"
    className="container-fluid container-lg d-flex flex-column align-items-center"
  >
    {sectionName && (
      <p className="d-flex align-items-center">
        <span className="h3">{sectionName}</span>

        <Link
          to="/all-products/"
          className="d-flex align-items-center text-decoration-none"
        >
          جميع المنتجات{" "}
          <object data="/assets/home/icons/left-arrow.svg"></object>
        </Link>
      </p>
    )}

    <div className="d-flex flex-wrap gap-3 justify-content-around">
      {data.map(sectionItem)}
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
