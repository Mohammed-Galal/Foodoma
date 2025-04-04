/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import S, { getFavourites } from "../../store";
import "./index.scss";
import getText from "../../translation";

const isArabic = window.localStorage.getItem("lang") === "العربية",
  nameTarget = isArabic ? "name_ar" : "name";

const Base = process.env.REACT_APP_API_URL + "/",
  baseUrl = Base + "public/api";

export default function (item, I) {
  if (item.is_active === 0) return false;

  let product;

  const store = S.getState(),
    { fav: favs } = store.Products,
    { loaded } = store.User,
    isHearted = favs.some((e) => e.id === item.id),
    { image, is_new } = item,
    price = +item.price,
    old_price = +item.old_price,
    discount = old_price > price && (
      <span>
        {100 - (price / old_price) * 100}%{" "}
        <sub>{getText("productItem", 0)}</sub>
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
          {is_new ? <span>{getText("productItem", 1)}</span> : ""}
          {discount}
        </div>

        {loaded && vid}
      </div>

      <Link to={"/products/" + item.id} className="text-decoration-none">
        <img
          src={Base + image}
          className="mb-3 mx-auto"
          alt={item[nameTarget]}
        />

        <div className="desc d-flex flex-column gap-3 py-1">
          <span className="h5 d-none d-md-block m-0">
            {item[nameTarget] || item.name}
          </span>
          <span className="h6 d-md-none m-0">
            {item[nameTarget] || item.name}
          </span>

          <div className="align-items-center d-grid gap-1 rate">
            <object
              data="/assets/home/icons/star.svg"
              type="image/svg+xml"
            ></object>
            {Math.max(3, Math.ceil(Math.random() * 5))}

            {item.category_name && (
              <span className="align-items-center d-flex">
                {item.category_name}
              </span>
            )}
          </div>

          <div className="align-items-center d-flex price">
            <span>{price + " " + getText("settings", 14)}</span> /
            {getText("productItem", 2)}
          </div>

          <button
            type="button"
            className="btn d-flex flex-column align-items-center p-0"
          >
            <span className="d-flex align-items-center justify-content-center text-capitalize">
              {getText("productItem", 3)}
            </span>
            <img src="/assets/home/icons/mdi-light_cart.svg" alt="Cart" />
          </button>
        </div>
      </Link>
    </div>
  );
}
