import getText from "../../../translation";
import { Link } from "react-router-dom";
import Carousel from "../../../shared/Carousel";
import "./index.scss";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */

export default ({ data }) => {
  const items = data.map(oItem);

  return (
    <section
      key="occasions"
      id="occasions"
      className="container-fluid container-lg d-flex flex-column"
    >
      <p className="d-flex align-items-center">
        <h3>{"تصاميم جاهزة لكل مناسبة"}</h3>
      </p>

      <Carousel
        innerItems={items}
        customConfig={{ loop: true, scrollbar: false }}
      />
    </section>
  );
};

function oItem({ name, image_url }) {
  return (
    <Link
      key={name}
      to={"/all-products/" + name + "?occasions=1"}
      className="d-flex flex-column gap-2 text-center text-decoration-none"
      style={{ color: "var(--primary)" }}
    >
      <div
        style={{
          border: "1px solid #ffcd00",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <img
          src={image_url}
          alt={name}
          style={{ width: "100%", height: "150px", objectFit: "fill" }}
        />
      </div>

      {name}
    </Link>
  );
}
