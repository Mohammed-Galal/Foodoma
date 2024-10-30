/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import Carousel from "../../../shared/Carousel";
import data from "./data.json";
import "./index.scss";

export const categories = {
    is_new: [],
    is_popular: [],
    is_recommended: [],
  },
  categoriesKeys = Object.keys(categories);

categories.has_discount = [];

const productItems = data.map(function (item, I) {
  if (!!item.is_active) return false;
  const result = {};
  result.key = item.item_category_id * item.restaurant_id + I;
  result.childComponent = productItem(item);

  categoriesKeys.forEach((K) => !!item[K] && categories[K].push(result));

  if (item.old_price !== "0.00") categories.has_discount.push(result);

  return result;
});

export default function ({ id, title, categoryKey }) {
  const targetItems = categoryKey ? categories[categoryKey] : productItems;

  return (
    <section id={id} className="mx-auto container-fluid container-lg">
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

function productItem(item) {
  const { name, image, price, is_new } = item,
    cat = item.addon_categories[0].name;

  return (
    <>
      <div className="align-items-center d-flex">
        {is_new ? <span>جديد</span> : ""}

        <object
          data="/assets/home/icons/heart.svg"
          datatype="image/svg+xml"
        ></object>
      </div>

      <img src={image} alt={name} />

      <div className="desc d-flex flex-column">
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

        <button className="btn d-flex flex-column align-items-center p-0">
          <span className="d-flex align-items-center justify-content-center text-capitalize">
            اضافة للسلة
          </span>
          <img src="/assets/home/icons/mdi-light_cart.svg" alt="Cart" />
        </button>
      </div>
    </>
  );
}
