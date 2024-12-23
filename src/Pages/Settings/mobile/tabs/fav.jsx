/* eslint-disable import/no-anonymous-default-export */
import Carousel from "../../../../shared/Carousel";
import { useSelector } from "react-redux";
import productItem from "../../../../shared/productItem";

export default function () {
  const favs = useSelector((state) => state.Products.fav).map(productItem);

  return (
    <div className="fav">
      <span
        className="d-block h3 mb-3"
        style={{ cssText: " font-weight: 600; color: var(--primary)" }}
      >
        المفضلة
      </span>

      {favs && <Carousel innerItems={favs} />}
    </div>
  );
}
