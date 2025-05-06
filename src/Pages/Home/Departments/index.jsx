import { Link } from "react-router-dom";
import "./index.scss";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */

export default ({ sectionName, data }) => (
  <section id="moon-sections">
    <div className="container-fluid container-lg d-flex flex-column align-items-center">
      {sectionName && (
        <h2
          className="d-flex align-items-center justify-content-between"
          style={{
            width: "100%",
            color: "var(--primary)",
            marginBottom: "var(--internal-gap)",
          }}
        >
          {sectionName}
        </h2>
      )}

      <div className="d-flex flex-wrap gap-3 justify-content-around">
        {data.map(sectionItem)}
      </div>
    </div>
  </section>
);

function sectionItem({ image_url, name }) {
  return (
    <Link
      className="align-items-center d-flex flex-column gap-2 p-4"
      to={"/all-products/" + name}
      key={name}
    >
      <img className="my-auto" src={image_url} alt={name} />
      <h3 className="m-0 h5">{name}</h3>
    </Link>
  );
}
