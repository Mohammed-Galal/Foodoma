/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import { useSelector } from "react-redux";
import productItem from "../../../shared/productItem";
import Carousel from "../../../shared/Carousel";
import "./index.scss";

export default function ({ id, title, categoryKey }) {
  const { data: items } = useSelector((e) => e.Products),
    targetItems = categoryKey
      ? items.filter((item) => !!item[categoryKey] )
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
      </p>

      <Carousel innerItems={products} />
    </section>
  );
}
