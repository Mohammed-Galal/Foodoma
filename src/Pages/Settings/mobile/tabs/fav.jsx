/* eslint-disable import/no-anonymous-default-export */
import { useSelector } from "react-redux";
import ProductItem from "../../../../shared/productItem";
import Carousel from "../../../../shared/Carousel";

export default function () {
  const { fav } = useSelector((e) => e.Products),
    items = fav.map(ProductItem);

  return (
    <div className="fav">
      <span
        className="d-block h3 mb-3"
        style={{ cssText: " font-weight: 600; color: var(--primary)" }}
      >
        المفضلة
      </span>

      <Carousel innerItems={items} />
    </div>
  );
}
