/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NXT from "../../icons/NXT";
import Plus from "../../icons/Plus";
import Minus from "../../icons/Minus";
import Cart from "../../icons/Cart";
import "./index.scss";

export default function () {
  const products = useSelector((e) => e.Products),
    customProducts = products.custom,
    params = useParams();

  const activeTab = params.style || customProducts[0]?.name,
    availOptions = customProducts.find(
      (i) => i.is_active && i.name === activeTab
    );

  if (customProducts.length === 0) return null;

  return (
    <>
      <aside>
        <ul className="container d-flex gap-2 list-unstyled my-0">
          {customProducts.map((item) => (
            <li key={item.id} className="py-3">
              <NavLink to={`/design/${item.name}`}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </aside>

      <section id="design" className="container">
        <ul className="d-flex gap-2 justify-content-center list-unstyled mx-0 mb-5 p-0">
          <li>mon 10</li>
          <li>{NXT}</li>
          <li>صمم كيكتك بنفسك</li>
          <li>{NXT}</li>
          <li>{availOptions.name}</li>
        </ul>

        <Form productItem={availOptions} />
      </section>
    </>
  );
}

function Form({ productItem }) {
  const dispatch = useDispatch(),
    [activeOpts, setActiveOpts] = useState({}),
    [quantity, setQuantity] = useState(1);

  let totalPrice = +productItem.price;

  const selected_addons = [],
    optGroup = productItem.addon_categories.map(({ id, name, addons }) => {
      const innerOptions = addons.map((addon, index) => {
        index === 0 && (activeOpts[name] = addon.name);

        return (
          <button
            key={addon.id}
            className="btn"
            data-active={activeOpts[name] === addon.name}
            onClick={() => handleChange(name, addon.name)}
          >
            {addon.name}
          </button>
        );
      });

      return (
        <li key={id}>
          <span className="title">{name}</span>
          {innerOptions}
        </li>
      );
    });

  const formBody = {
    customProps: {
      is_special: true,
      phrase: "",
      comment: "",
      images: [],
    },

    name: productItem.name,
    restaurant_id: +productItem.restaurant_id,
    id: productItem.id,
    price: productItem.price,
    totalPrice: totalPrice * quantity,
    quantity: quantity,
    addons: selected_addons,
  };

  return (
    <form className="d-flex flex-wrap gap-3" encType="multipart/form-data">
      <div className="align-items-center d-flex flex-column gap-4 justify-content-around">
        <img id="img-preview" src="/assets/home/img-placeholder.png" alt="PH" />
        <input
          onChange={({ target }) =>
            (formBody.customProps.images = target.files)
          }
          type="file"
          accept="image/*"
        />
        <label className="pb-1" htmlFor="img-file">
          أضف صورة
        </label>
      </div>

      <ul className="d-grid gap-3 list-unstyled">
        {optGroup}

        <li>
          <label htmlFor="phrase" className="title">
            العبارة على الكيك
          </label>
          <input
            type="text"
            name="phrase"
            onChange={({ target }) =>
              (formBody.customProps.phrase = target.value)
            }
            className="input-group-text"
            placeholder="Happy Birthday Alaa!"
          />
        </li>

        <li>
          <label htmlFor="notes" className="title">
            شكل آخر اكتبه في الملاحظات
          </label>

          <input
            type="text"
            name="comment"
            onChange={({ target }) =>
              (formBody.customProps.comment = target.value)
            }
            className="input-group-text"
            placeholder="ملاحظات"
          />
        </li>

        <li className="align-items-center d-flex">
          <button type="button" onClick={() => setQuantity(quantity + 1)}>
            {Plus}
          </button>
          {quantity}
          <button
            type="button"
            onClick={() => quantity - 1 && setQuantity(quantity - 1)}
          >
            {Minus}
          </button>
          <button
            type="button"
            className="d-flex gap-1 align-items-center"
            onClick={storeFormData}
          >
            اضف الى العربة
            {Cart}
          </button>

          <span className="h5 m-0">{totalPrice} ر.س</span>
        </li>
      </ul>
    </form>
  );

  function handleChange(optName, value) {
    setActiveOpts({ ...activeOpts, [optName]: value });
  }

  function storeFormData() {
    dispatch({ type: "products/addToCart", payload: formBody });
  }
}
