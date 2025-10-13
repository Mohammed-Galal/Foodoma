/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import S, { getFavourites } from "../../store";
import "./index.scss";
import getPage from "../../translation";

const getText = getPage("productItem"),
  dispatch = S.dispatch,
  isArabic = window.localStorage.getItem("lang") === "العربية",
  nameTarget = isArabic ? "name_ar" : "name";

const priceTypes = window.priceTypes,
  Base = process.env.REACT_APP_API_URL + "/",
  baseUrl = Base + "public/api";

const titleClassName =
  window.innerWidth > 768 ? "h5 d-none d-md-block m-0" : "h6 d-md-none m-0";

export default function (item, I) {
  // if (item.is_active === 0) return false;

  let product;

  const priceType = isArabic
      ? priceTypes[item.price_type]
      : item.price_type.replace(/_/g, " ").toUpperCase(),
    store = S.getState(),
    { fav: favs } = store.Products,
    { loaded } = store.User,
    isHearted = favs.some((e) => e.id === item.id),
    { image, is_new } = item,
    price = +item.price,
    old_price = +item.old_price,
    discount = old_price > price && (
      <span>
        {parseInt(100 - (price / old_price) * 100)}% <sub>{getText(0)}</sub>
      </span>
    ),
    key = item.item_category_id * item.restaurant_id + I;

  const vid = (
    <div
      onClick={toggleFav}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        maxWidth: "45px",
        height: "34px",
      }}
    >
      <video
        src={process.env.REACT_APP_API_URL + "/assets/heart.mp4"}
        style={{ maxHeight: "84px", marginLeft: "-17px" }}
        ref={handleFav}
      ></video>
    </div>
  );

  function toggleFav() {
    product && product.classList.add("loading");

    fetch(baseUrl + "/toggle-favorite-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: item.id }),
    })
      .then((res) => res.json())
      .then(getFavourites);
  }

  function handleFav(self) {
    if (self === null) return;
    let timeout;

    (isHearted ? play : reverse)();

    function play() {
      if (self.currentTime > 2.605639) return clearTimeout(timeout);
      self.currentTime += 0.1;
      timeout = setTimeout(play, 30);
    }

    function reverse() {
      if (self.currentTime > 0) {
        self.currentTime -= 0.1;
        timeout = setTimeout(reverse, 30);
      } else return clearTimeout(timeout);
    }
  }

  const href =
    "/products/" +
    item.slug +
    "?id=" +
    item.id +
    "&isCustom=" +
    +(item.category_name === getText(1));

  return (
    <div
      key={key}
      ref={(e) => {
        product = e;
        e && e.classList.remove("loading");
      }}
      className="d-flex flex-column justify-content-between position-relative product-item px-4 py-3"
    >
      <div className="align-items-center d-flex justify-content-between">
        <div className="d-flex gap-1">
          {is_new ? <span>{getText(2)}</span> : ""}
          {discount}
        </div>

        {loaded && vid}
      </div>

      <Link to={href}>
        <img
          src={Base + image}
          className="mb-3 mx-auto"
          alt={item[nameTarget]}
        />
      </Link>

      <div className="desc">
        <Link
          to={href}
          className="text-decoration-none d-flex flex-column gap-3 py-3"
        >
          <h3 className={titleClassName}>{item[nameTarget] || item.name}</h3>

          <div className="align-items-center d-grid gap-1 rate">
            <object
              data="/assets/home/icons/star.svg"
              type="image/svg+xml"
            ></object>

            {4.7}

            {item.category_name && (
              <span className="align-items-center d-flex">
                {item.category_name}
              </span>
            )}
          </div>

          <div className="align-items-center d-flex price">
            {old_price > 0 && (
              <sub style={{ marginInlineEnd: "4px" }}>
                <del>{old_price}</del>
              </sub>
            )}
            <span>{price + " " + getText(3)}</span> /{priceType}
          </div>
        </Link>

        <button
          type="button"
          className="btn d-flex flex-column align-items-center p-0 w-100"
          onClick={addSingle}
        >
          <span className="d-flex align-items-center justify-content-center text-capitalize">
            {getText(4)}
          </span>
          <img src="/assets/home/icons/mdi-light_cart.svg" alt="Cart" />
        </button>
      </div>
    </div>
  );

  function addSingle() {
    dispatch({ type: "products/addSingleItemToCart", item });
  }
}
