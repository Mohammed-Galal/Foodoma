import getText from "../../../translation";
import { Link } from "react-router-dom";
import Data from "./data.json";
import Carousel from "../../../shared/Carousel";
import "./index.scss";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */

export default () => {
  // const categories = useSelector((e) => e.Products).categories;
  // const categories = Data.map((o) => o.title);
  const items = Data.map(oItem);

  return (
    <section
      key="occasions"
      id="occasions"
      className="container-fluid container-lg d-flex flex-column"
    >
      <p className="d-flex align-items-center">
        <span className="h3">{getText("home", 9)}</span>

        <a
          href="/public/mobile/"
          className="d-flex align-items-center text-decoration-none"
        >
          {getText("home", 8)}
          {/* <object data="/assets/home/icons/left-arrow.svg"></object> */}
        </a>
      </p>

      <Carousel
        customConfig={{ loop: true, scrollbar: false }}
        innerItems={items}
      />
    </section>
  );
};

function oItem({ title, img }, indx) {
  indx++;

  // const max = 5,
  //   src = indx <= max ? indx : Math.floor(indx / max);

  return (
    <Link
      key={title}
      to={"/all-products/" + title}
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
          src={img}
          alt={title}
          style={{ width: "100%", height: "150px", objectFit: "fill" }}
        />
      </div>

      {title}
    </Link>
  );
}
