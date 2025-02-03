import getText from "../../translation";
// eslint-disable-next-line react-hooks/exhaustive-deps
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Link, useParams } from "react-router-dom";
import productItem from "../../shared/productItem";
import Carousel from "../../shared/Carousel";
import NXT from "../../icons/NXT";
import Cart from "../../icons/Cart";
import Minus from "../../icons/Minus";
import Plus from "../../icons/Plus";
import "./index.scss";

const hiddenAlert = { opacity: 0, transform: "translateY(100%)" },
  activeAlert = { opacity: 1, transform: "translateY(0)" },
  fallbackStr = `كعكة الفانيليا ذات الطراز القديم هي قلب وروح ماجنوليا بيكري. هنا، نأخذ نفس الخليط الذي نستخدمه لصنع الكعك الشهير الخاص بنا لصنع كعكة غنية بالزبدة مع فتات خفيفة، ونضعها في طبقة من كريمة زبدة الفانيليا أو الشوكولاتة.
المكونات: دقيق - زبدة -`,
  baseUrl = "https://mon10.amir-adel.com",
  docFrag = document.createElement("div");

export default function () {
  const Products = useSelector(($) => $.Products),
    items = Products.data,
    productId = Number(useParams().id),
    state = items.find((e) => e.id === productId);

  return (
    <>
      {ProductInfo(state)}
      <Related items={items} />
    </>
  );
}

function ProductInfo(state) {
  const dispatch = useDispatch(),
    resId = useStore().getState().Restaurant.data.id,
    [Alert, setAlert] = useState(false),
    [currCategoryName, setAddonCat] = useState(""),
    [load, update] = useState(false),
    [quantity, setQuntity] = useState(1),
    selectedAddons = useRef(new Set()).current;

  useEffect(() => {
    Alert &&
      setTimeout(() => {
        selectedAddons.clear();
        setQuntity(1);
        setAddonCat("");
        setAlert(false);
      }, 3000);
  }, [Alert]);

  if (state === undefined) return false;

  const alertState = Alert ? activeAlert : hiddenAlert,
    old_price = +state.old_price,
    discountFlag = old_price > 0 && (
      <span
        className="flag"
        style={{ "--bg": "#e4f4ff", "--color": "var(--primary)" }}
      >
        {100 - (+state.price / old_price) * 100}%{" "}
        <sub>{getText("product", 0)}</sub>
      </span>
    );

  // ============================
  let lastAddon,
    totalPrice = +state.price;

  const categories = state.addon_categories,
    currCategory = categories.find((c) => c.name === currCategoryName),
    isSingular = currCategory?.type === "SINGLE",
    addonItems = currCategory?.addons.map((addon) => {
      if (selectedAddons.has(addon)) lastAddon = addon;
      return AddonItem(addon, toggleAddon, selectedAddons.has(addon));
    });

  selectedAddons.forEach((a) => (totalPrice += +a.price));
  totalPrice = totalPrice * quantity;

  function toggleAddon(targetMethod, addon) {
    isSingular && lastAddon && selectedAddons.delete(lastAddon);
    selectedAddons[targetMethod](addon);
    update(!load);
  }

  const imageSrc = baseUrl + (state.image || "");
  docFrag.innerHTML = state.desc || fallbackStr;

  return (
    <section
      id="product"
      className="container-fluid container-lg d-flex flex-wrap"
    >
      <div
        className="d-flex flex-column justify-content-between py-2"
        style={{ flex: "1 0 39%" }}
      >
        <img src={imageSrc} alt="product" />
        <div className="d-flex justify-content-around">
          <img src={imageSrc} alt="product" />
          <img src={imageSrc} alt="product" />
          <img src={imageSrc} alt="product" />
          <img src={imageSrc} alt="product" />
        </div>
      </div>

      <div
        className="alert m-0"
        style={{
          ...alertState,
          width: "100%",
          background: "aliceblue",
          color: "var(--primary)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          order: "1",
          position: "sticky",
          bottom: "60px",
          transition: "150ms ease-out",
        }}
      >
        {getText("product", 1)}
        <img
          src={baseUrl + "/assets/animation.gif"}
          style={{ maxHeight: "40px" }}
          alt="loader"
        />
      </div>

      <div
        className="align-items-start d-flex flex-column flex-grow-1 position-relative"
        style={{ flex: "1 0 59%" }}
      >
        <ul className="d-flex gap-1 list-unstyled m-0 p-0">
          <li>mon10</li>
          <li>{NXT}</li>
          <li>الصنف</li>
          <li>{NXT}</li>
          <li>{state.name}</li>
        </ul>

        <p className="title h2">{state.name}</p>

        <p className="state text-center d-flex align-items-center gap-2">
          <span className="flag">
            {!!state.is_active ? getText("product", 2) : getText("product", 3)}
          </span>
          {discountFlag}
        </p>

        {state.desc && (
          <p
            className="desc w-100"
            dangerouslySetInnerHTML={{ __html: docFrag.textContent }}
          ></p>
        )}

        {old_price > 0 && (
          <p>
            <del>
              {state.old_price} {getText("product", 10)}
            </del>
          </p>
        )}

        <p className="price">
          <span>
            {state.price} {getText("product", 10)}
          </span>
          /{getText("product", 4)}
        </p>
        <p className="align-items-center d-flex rate">
          <img src="/assets/home/icons/star.svg" alt="star" /> 5
          <Link to="/rate">{getText("product", 5)}</Link>
        </p>
        {!!categories.length && (
          <div className="addons d-flex flex-wrap w-100">
            <span className="h5 m-0">{getText("product", 6)}</span>

            <select
              className="input-group-text my-2 text-end w-100"
              style={{ borderColor: "#e9f3fa", outline: "none" }}
              value={currCategoryName}
              onChange={({ target }) => setAddonCat(target.value)}
            >
              <option value="" onClick={() => setAddonCat("")}>
                {getText("product", 7)}
              </option>

              {categories.map((C, I) => (
                <option key={currCategoryName + I} value={C.name}>
                  {C.name}
                </option>
              ))}
            </select>

            <ul className="d-flex flex-wrap gap-2 m-0 p-0 w-100">
              {addonItems}
            </ul>
          </div>
        )}

        <div className="mt-auto align-items-center checkout d-flex gap-1 gap-md-3 justify-content-between justify-content-md-start text-nowrap w-100">
          <button
            type="button"
            className="align-items-center btn d-flex justify-content-center"
            onClick={() => Alert || setQuntity(quantity + 1)}
          >
            {Plus}
          </button>
          {quantity}
          <button
            type="button"
            className="align-items-center btn d-flex justify-content-center"
            onClick={() => Alert || setQuntity(Math.max(1, quantity - 1))}
          >
            {Minus}
          </button>

          <div className="btn" onClick={addItemToCart}>
            {getText("product", 8)}
            {Cart}
          </div>

          <span
            className="h5 m-0"
            style={{ fontWeight: "600", color: "var(--primary)" }}
          >
            {totalPrice} {getText("product", 10)}
          </span>
        </div>

        <div
          className="position-absolute d-flex align-items-center justify-content-center"
          style={{
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: "#fff5",
            pointerEvents: "all",
            touchAction: "auto",
            zIndex: "1",
            opacity: Alert ? 0.6 : 1,
            visibility: Alert ? "visible" : "hidden",
            transition: "150ms",
          }}
        >
          <img src={baseUrl + "/assets/img/order-placed.gif"} alt="animation" />
        </div>
      </div>
    </section>
  );

  function addItemToCart() {
    if (Alert) return;
    // register addons category_name
    const addonsFilter = [...selectedAddons].map(
      ({ id, price, name, addon_category_id }) => {
        const addon_category_name = categories.find(
          (c) => c.id === addon_category_id
        ).name;

        return {
          addon_id: id,
          addon_category_name,
          addon_name: name,
          price: +price,
        };
      }
    );

    //
    dispatch({
      type: "products/addToCart",
      payload: {
        id: state.id,
        name: state.name,
        price: +state.price,
        restaurant_id: +resId,
        quantity,
        addons: addonsFilter,
        totalPrice,
      },
    });

    setAlert(true);
  }
}

function AddonItem(ADD, toggleAddon, isAdded) {
  if (!ADD.is_active) return false;

  const targetMethod = isAdded ? "delete" : "add",
    { name, price } = ADD;

  return (
    <li
      onClick={() => toggleAddon(targetMethod, ADD)}
      key={name}
      data-active={isAdded}
      className="d-flex align-items-center justify-content-between gap-2"
    >
      <b>{name}</b>
      {price}
      <span>{isAdded ? Minus : Plus}</span>
    </li>
  );
}

function Related({ items }) {
  return (
    <section id="related" className="container">
      <p className="h3">
        <span>{getText("product", 9)}</span>
      </p>

      <Carousel
        customConfig={{ autoplay: false, scrollbar: false }}
        innerItems={items.map(productItem)}
      />
    </section>
  );
}
