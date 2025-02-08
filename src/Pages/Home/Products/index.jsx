/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import getText from "../../../translation";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import productItem from "../../../shared/productItem";
import Carousel from "../../../shared/Carousel";
import "./index.scss";

export default function ({ id, title, categoryKey }) {
  const { data: items } = useSelector((e) => e.Products),
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

        <Link
          to="/all-products"
          className="d-flex align-items-center text-decoration-none"
        >
          {getText("home", 8)}
          {/* <object data="/assets/home/icons/left-arrow.svg"></object> */}
        </Link>
      </p>

      <Carousel innerItems={products} />
    </section>
  );
}
