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
      className="d-flex flex-column justify-content-between product-item px-4 py-2"
    >
      <div className="align-items-center d-flex">
        {is_new ? <span>جديد</span> : ""}

        <img
          onClick={toggleFav}
          src={"/assets/home/icons/heart" + (isHearted ? "ed" : "") + ".svg"}
          alt="fav"
        />
      </div>

      <Link to={"/products/" + item.id} className="text-decoration-none">
        <img src={image} className="mb-2" alt={name} />

        <div className="desc d-flex flex-column gap-3">
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
        </div>
      </Link>
    </div>
  );
}
