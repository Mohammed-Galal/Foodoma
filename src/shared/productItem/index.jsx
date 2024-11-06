/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import data from "./data.json";
import "./index.scss";

const categories = {
    is_new: [],
    is_popular: [],
    is_recommended: [],
  },
  categoriesKeys = Object.keys(categories);

categories.has_discount = [];

export default categories;

export const productItems = data.map(function (item, I) {
  if (!!item.is_active) return false;
  const result = productItem(item, I);
  categoriesKeys.forEach((K) => !!item[K] && categories[K].push(result));
  if (item.old_price !== "0.00") categories.has_discount.push(result);
  return result;
});

function productItem(item, I) {
  const { name, image, price, is_new } = item,
    key = item.item_category_id * item.restaurant_id + I,
    cat = item.addon_categories[0].name;

  return (
    <div
      key={key}
      className="product-item d-flex flex-column p-2 justify-content-between"
    >
      <div className="align-items-center d-flex">
        {is_new ? <span>جديد</span> : ""}

        <object
          data="/assets/home/icons/heart.svg"
          datatype="image/svg+xml"
        ></object>
      </div>

      <img src={image} alt={name} />

      <Link
        to="/product-item"
        state={item}
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
