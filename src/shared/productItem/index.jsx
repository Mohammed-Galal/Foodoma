/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import S from "../../store";
import "./index.scss";

const dispatch = S.dispatch;
// console.log(S.getState());

export default function (item, I) {
  const { fav: favs } = S.getState().Products,
    isHearted = favs.indexOf(item) > -1,
    { name, image, price, is_new } = item,
    key = item.item_category_id * item.restaurant_id + I,
    cat = item.addon_categories[0].name;

  function toggleFav() {
    dispatch({
      type: "products/" + (isHearted ? "removeFromFav" : "addToFav"),
      payload: item,
    });
  }

  return (
    <div
      key={key}
      className="product-item d-flex flex-column p-2 justify-content-between"
    >
      <div className="align-items-center d-flex">
        {is_new ? <span>جديد</span> : ""}

        <img
          onClick={toggleFav}
          src={"/assets/home/icons/heart" + (isHearted ? "ed" : "") + ".svg"}
          alt="fav"
        />
      </div>

      <img src={image} alt={name} />

      <Link
        to={"/products/" + item.id}
        // state={item}
        className="desc text-decoration-none d-flex flex-column"
      >
        <span className="h5 m-0">{name}</span>

        <div className="rate align-items-center d-flex">
          <object
            data="/assets/home/icons/star.svg"
            type="image/svg+xml"
          ></object>
          {Math.ceil(Math.random() * 5)}

          <span className="align-items-center d-flex">{cat}</span>
        </div>

        <div className="align-items-center d-flex price">
          <span>{price + "ر.س"}</span>/للقطعة
        </div>

        <button
          type="button"
          className="btn d-flex flex-column align-items-center p-0"
        >
          <span className="d-flex align-items-center justify-content-center text-capitalize">
            اضافة للسلة
          </span>
          <img src="/assets/home/icons/mdi-light_cart.svg" alt="Cart" />
        </button>
      </Link>
    </div>
  );
}
