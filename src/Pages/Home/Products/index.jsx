/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import categories, { productItems } from "../../../shared/productItem";
import Carousel from "../../../shared/Carousel";
import "./index.scss";

export default function ({ id, title, categoryKey }) {
  const targetItems = categoryKey ? categories[categoryKey] : productItems;

  return (
    <section
      key={"__products__" + categoryKey}
      id={id}
      className="mx-auto container-fluid container-lg"
    >
      <p className="d-flex align-items-center">
        <span className="h3">{title}</span>

        <a href="/" className="d-flex align-items-center text-decoration-none">
          جميع المنتجات
          <object data="/assets/home/icons/left-arrow.svg"></object>
        </a>
      </p>

      <Carousel innerItems={targetItems} />
    </section>
  );
}
