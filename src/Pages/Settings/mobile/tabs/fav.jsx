<<<<<<< HEAD
/* eslint-disable import/no-anonymous-default-export */
import getPage from "../../../../translation";
import Carousel from "../../../../shared/Carousel";
import { useSelector } from "react-redux";
import productItem from "../../../../shared/productItem";

export default function () {
  const favs = useSelector((state) => state.Products.fav);

  return (
    <div className="fav" style={{ overflow: "auto" }}>
      <span
        className="d-block h3 mb-3"
        style={{ cssText: " font-weight: 600; color: var(--primary)" }}
      >
        {getPage("settings")(31)}
      </span>

      {!!favs.length && <Carousel innerItems={favs.map(productItem)} />}
    </div>
  );
}
=======
/* eslint-disable import/no-anonymous-default-export */
import getPage from "../../../../translation";
import Carousel from "../../../../shared/Carousel";
import { useSelector } from "react-redux";
import productItem from "../../../../shared/productItem";

export default function () {
  const favs = useSelector((state) => state.Products.fav);

  return (
    <div className="fav" style={{ overflow: "auto" }}>
      <span
        className="d-block h3 mb-3"
        style={{ cssText: " font-weight: 600; color: var(--primary)" }}
      >
        {getPage("settings")(31)}
      </span>

      {!!favs.length && <Carousel innerItems={favs.map(productItem)} />}
    </div>
  );
}
>>>>>>> 8828f8872f24d5af85ad0af7e8efc7f7c81bcb4c
