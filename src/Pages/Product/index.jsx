/* eslint-disable import/no-anonymous-default-export */
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import productItem from "../../shared/productItem";
import Carousel from "../../shared/Carousel";
import NXT from "../../icons/NXT";
import Cart from "../../icons/Cart";
import Minus from "../../icons/Minus";
import Plus from "../../icons/Plus";
import "./index.scss";

const fallbackStr = `كعكة الفانيليا ذات الطراز القديم هي قلب وروح ماجنوليا بيكري. هنا، نأخذ نفس الخليط الذي نستخدمه لصنع الكعك الشهير الخاص بنا لصنع كعكة غنية بالزبدة مع فتات خفيفة، ونضعها في طبقة من كريمة زبدة الفانيليا أو الشوكولاتة.
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
    selectedAddons = useRef(new Set()),
    redirect = useNavigate();

  const [addonCat, setAddonCat] = useState(""),
    [load, update] = useState(false),
    [quantity, setQuntity] = useState(1);

  if (state === undefined) return false;

  const categories = state.addon_categories,
    selectedCat = categories.find(($) => $.name === addonCat),
    rawAddons = selectedCat ? selectedCat.addons : [],
    addons = rawAddons.map((addon) =>
      AddonItem(addon, toggleAddon, selectedAddons.current.has(addon))
    );

  const imageSrc = baseUrl + (state.image || "");
  docFrag.innerHTML = state.desc || fallbackStr;

  let totalPrice = +state.price * quantity;
  selectedAddons.current.forEach((A) => (totalPrice += +A.price * quantity));
  return (
    <section
      id="product"
      className="container-fluid container-lg d-flex flex-wrap flex-lg-nowrap"
    >
      <div className="d-flex flex-column">
        <img src={imageSrc} alt="product" />
        <div className="d-flex justify-content-center">
          <img src={imageSrc} alt="product" />
          <img src={imageSrc} alt="product" />
          <img src={imageSrc} alt="product" />
          <img src={imageSrc} alt="product" />
        </div>
      </div>
      <div className="align-items-start d-flex flex-column flex-grow-1 justify-content-between">
        <ul className="d-flex gap-1 list-unstyled m-0 p-0">
          <li>mon10</li>
          <li>{NXT}</li>
          <li>الصنف</li>
          <li>{NXT}</li>
          <li>{state.name}</li>
        </ul>

        <p className="title h2">{state.name}</p>
        <p className="state text-center">
          {!!state.is_active ? "متوفر" : "غير متوفر"}
        </p>

        {state.desc && (
          <p
            className="desc"
            dangerouslySetInnerHTML={{ __html: docFrag.textContent }}
          ></p>
        )}

        <p className="price">
          <span>{state.price} ر.س</span>
          /للقطعة
        </p>
        <p className="align-items-center d-flex rate">
          <img src="/assets/home/icons/star.svg" alt="star" /> 5
          <Link to="/rate">اكتب رأيك</Link>
        </p>
        <div className="addons d-flex flex-wrap w-100">
          <span className="h5 m-0">الإضافات</span>

          <select
            className="input-group-text my-2 text-end w-100"
            style={{ borderColor: "#e9f3fa", outline: "none" }}
            value={addonCat}
            onChange={({ target }) => setAddonCat(target.value)}
          >
            <option value="" onClick={() => setAddonCat("")}>
              اختر من الاصناف
            </option>

            {categories.map((C, I) => (
              <option key={addonCat + I} value={C.name}>
                {C.name}
              </option>
            ))}
          </select>

          <ul className="d-grid m-0 p-0">{addons}</ul>
        </div>
        <textarea placeholder="ملاحظات" className="input-group-text"></textarea>
        <div className="align-items-center checkout d-flex">
          <button
            type="button"
            className="align-items-center btn d-flex justify-content-center"
            onClick={() => setQuntity(quantity + 1)}
          >
            {Plus}
          </button>
          {quantity}
          <button
            type="button"
            className="align-items-center btn d-flex justify-content-center"
            onClick={() => setQuntity(Math.max(1, quantity - 1))}
          >
            {Minus}
          </button>

          <div className="btn" onClick={addItemToCart}>
            اضف الى العربة
            {Cart}
          </div>

          <span
            className="h5 m-0"
            style={{ fontWeight: "600", color: "var(--primary)" }}
          >
            {totalPrice} ر.س
          </span>
        </div>
      </div>
    </section>
  );

  function toggleAddon(targetMethod, addon) {
    selectedAddons.current[targetMethod](addon);
    update(!load);
  }

  function addItemToCart() {
    // register addons category_name
    const addonsFilter = [...selectedAddons.current].map(
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
        restaurant_id: +state.restaurant_id,
        quantity,
        addons: addonsFilter,
        totalPrice,
      },
    });

    redirect("/");
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
        <span>منتجات ذات صلة</span>
      </p>

      <Carousel
        customConfig={{ autoplay: false, scrollbar: false }}
        innerItems={items.map(productItem)}
      />
    </section>
  );
}
