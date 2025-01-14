/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import S, { getFavourites } from "../../store";
import "./index.scss";

const Base = "https://mon10.amir-adel.com/",
  baseUrl = Base + "public/api";

export default function (item, I) {
  const store = S.getState(),
    { fav: favs } = store.Products,
    { loaded } = store.User,
    isHearted = favs.some((e) => e.id === item.id),
    { name, image, price, is_new } = item,
    key = item.item_category_id * item.restaurant_id + I,
    cat = item.addon_categories?.length && (
      <span className="align-items-center d-flex">
        {item.addon_categories[0].name}
      </span>
    );

  const vid = (
    <video
      src="https://mon10.amir-adel.com/assets/heart.mp4"
      style={{ maxHeight: "84px", marginLeft: "-22px" }}
      onClick={toggleFav}
      ref={handleFav}
    ></video>
  );

  function toggleFav({ target }) {
    if (!loaded) return alert("يجب تسجيل الدخول اولاً");
    target.parentElement.parentElement.classList.add("loading");

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

    self.parentElement.parentElement.classList.remove("loading");

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
      className="d-flex flex-column justify-content-between product-item px-4 py-2 position-relative"
    >
      <div className="align-items-center d-flex justify-content-between">
        {is_new ? <span>جديد</span> : ""}

        {loaded && vid}
      </div>

      <Link to={"/products/" + item.id} className="text-decoration-none">
        <img src={Base + image} className="mb-2" alt={name} />

        <div className="desc d-flex flex-column gap-3">
          <span className="h5 m-0">{name}</span>

          <div className="rate align-items-center d-flex">
            <object
              data="/assets/home/icons/star.svg"
              type="image/svg+xml"
            ></object>
            {Math.ceil(Math.random() * 5)}

            {cat}
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
