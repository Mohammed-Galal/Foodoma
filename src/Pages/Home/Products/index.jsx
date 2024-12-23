/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import { useSelector } from "react-redux";
import productItem from "../../../shared/productItem";
import Carousel from "../../../shared/Carousel";
import "./index.scss";

export default function ({ id, title, categoryKey }) {
  const { data: items, fav } = useSelector((e) => e.Products),
    targetItems = categoryKey
      ? items.filter((item) => !!item[categoryKey])
      : items,
    products = targetItems.map(productItem);

  return (
    <section
      key={"__products__" + id}
      id={id}
      className="mx-auto container-fluid container-lg"
    >
      <p className="d-flex align-items-center">
        <span className="h3">{title}</span>

        <a
          href="/public/mobile/"
          className="d-flex align-items-center text-decoration-none"
        >
          جميع المنتجات
          <object data="/assets/home/icons/left-arrow.svg"></object>
        </a>
      </p>

      <Carousel innerItems={products} />
    </section>
  );
}
