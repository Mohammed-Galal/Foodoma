/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import { useStore, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import productItem from "../../shared/productItem";
import Carousel from "../../shared/Carousel";
import NXT from "../../icons/NXT";
import Cart from "../../icons/Cart";
import Minus from "../../icons/Minus";
import Plus from "../../icons/Plus";
import "./index.scss";

const fallbackStr = `كعكة الفانيليا ذات الطراز القديم هي قلب وروح ماجنوليا بيكري. هنا، نأخذ نفس الخليط الذي نستخدمه لصنع الكعك الشهير الخاص بنا لصنع كعكة غنية بالزبدة مع فتات خفيفة، ونضعها في طبقة من كريمة زبدة الفانيليا أو الشوكولاتة.
المكونات: دقيق - زبدة -`;

let addonsPrice;

export default function () {
  const store = useStore().getState().Products,
    items = store.data,
    productId = Number(useParams().id),
    state = items.find((e) => e.id === productId);

  const inCart = store.cart.find((e) => e.id === productId);

  return (
    <>
      <ProductInfo {...state} quantity={inCart ? inCart.quantity : 1} />
      <Related items={items} />
    </>
  );
}

function ProductInfo(state) {
  const dispatch = useDispatch(),
    [quantity, setQuntity] = useState(state.quantity);

  const [addons, setAddons] = useState([]);

  addonsPrice = 0;

  window.scroll(0, 0);

  return (
    <section
      id="product"
      className="container-fluid container-lg d-flex flex-wrap flex-lg-nowrap"
    >
      <div className="d-flex flex-column">
        <img src="/assets/home/products/(0).png" alt="product" />
        <div className="d-flex justify-content-center">
          <img src="/assets/home/products/(0).png" alt="product" />
          <img src="/assets/home/products/(0).png" alt="product" />
          <img src="/assets/home/products/(0).png" alt="product" />
          <img src="/assets/home/products/(0).png" alt="product" />
        </div>
      </div>
      <div className="align-items-start d-flex flex-column justify-content-between">
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

        {state.desc || fallbackStr}

        <p className="price">
          <span>{state.price} ر.س</span>
          /للقطعة
        </p>
        <p className="align-items-center d-flex rate">
          <img src="/assets/home/icons/star.svg" alt="star" /> 5
          <Link to="/rate">اكتب رأيك</Link>
        </p>
        <div className="addons d-flex flex-wrap">
          <span className="h5">الإضافات</span>
          <ul className="d-grid m-0 p-0">
            {state.addon_categories.map(addonItem)}
          </ul>
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
            {state.price * quantity + addonsPrice} ر.س
          </span>
        </div>
      </div>
    </section>
  );
  function addItemToCart() {
    dispatch({
      type: "products/addToCart",
      payload: { id: state.id, quantity, extraFees: addonsPrice },
    });
  }

  function addonItem({ name, price: addonPrice }) {
    const isAdded = addons.indexOf(name) > -1;

    isAdded && (addonsPrice += 10);

    return (
      <li
        onClick={handleAddon}
        key={name}
        data-active={isAdded}
        className="d-flex align-items-center justify-content-between gap-2"
      >
        <b>{name}</b>
        {addonPrice}
        <span>{isAdded ? Minus : Plus}</span>
      </li>
    );

    function handleAddon() {
      isAdded
        ? setAddons(addons.filter((e) => e !== name))
        : setAddons([name].concat(addons));
    }
  }
}

function Related({ items }) {
  // productItems = items.filter((P) => p),

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
