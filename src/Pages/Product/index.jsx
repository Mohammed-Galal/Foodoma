/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import { useStore, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import productItem from "../../shared/productItem";
import Carousel from "../../shared/Carousel";
import "./index.scss";

const cartSvg = svg(),
  nxtIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      data-tags="keyboard_arrow_left"
    >
      <g fill="currentColor" transform="scale(0.0234375 0.0234375)">
        <path d="M658 708l-60 60-256-256 256-256 60 60-196 196z" />
      </g>
    </svg>
  ),
  fallbackStr = `كعكة الفانيليا ذات الطراز القديم هي قلب وروح ماجنوليا بيكري. هنا، نأخذ نفس الخليط الذي نستخدمه لصنع الكعك الشهير الخاص بنا لصنع كعكة غنية بالزبدة مع فتات خفيفة، ونضعها في طبقة من كريمة زبدة الفانيليا أو الشوكولاتة.
المكونات: دقيق - زبدة -`;

export default function () {
  const store = useStore().getState().Products,
    items = store.data,
    productId = Number(useParams().id),
    state = items.find((e) => e.id === productId);

  const inCart = store.cart.find((e) => e.id === productId);

  return (
    <>
      <ProductInfo {...state} quantity={inCart ? inCart.quantity : 0} />
      <Related items={items} />
    </>
  );
}

function ProductInfo(state) {
  const dispatch = useDispatch(),
    [quantity, setQuntity] = useState(state.quantity);

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
          <li>{nxtIcon}</li>
          <li>الصنف</li>
          <li>{nxtIcon}</li>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              data-tags="plus"
            >
              <g fill="currentColor" transform="scale(0.0234375 0.0234375)">
                <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z" />
              </g>
            </svg>
          </button>
          {quantity}
          <button
            type="button"
            className="align-items-center btn d-flex justify-content-center"
            onClick={() => setQuntity(Math.max(0, quantity - 1))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              data-tags="minus"
            >
              <g fill="currentColor" transform="scale(0.0234375 0.0234375)">
                <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z" />
              </g>
            </svg>
          </button>

          {quantity > 0 && (
            <Link to="/" className="btn" onClick={addItemToCart}>
              اضف الى العربة
              {cartSvg}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
  function addItemToCart() {
    dispatch({
      type: "products/addToCart",
      payload: { id: state.id, quantity },
    });
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

function addonItem({ name }) {
  return (
    <li
      key={name}
      className="d-flex align-items-center justify-content-between"
    >
      {name}
      <span>+</span>
    </li>
  );
}

function svg() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.9785 18.5C17.5089 18.5 18.0177 18.7107 18.3927 19.0858C18.7678 19.4609 18.9785 19.9696 18.9785 20.5C18.9785 21.0304 18.7678 21.5391 18.3927 21.9142C18.0177 22.2893 17.5089 22.5 16.9785 22.5C16.4481 22.5 15.9394 22.2893 15.5643 21.9142C15.1892 21.5391 14.9785 21.0304 14.9785 20.5C14.9785 19.9696 15.1892 19.4609 15.5643 19.0858C15.9394 18.7107 16.4481 18.5 16.9785 18.5ZM16.9785 19.5C16.7133 19.5 16.4589 19.6054 16.2714 19.7929C16.0839 19.9804 15.9785 20.2348 15.9785 20.5C15.9785 20.7652 16.0839 21.0196 16.2714 21.2071C16.4589 21.3946 16.7133 21.5 16.9785 21.5C17.2437 21.5 17.4981 21.3946 17.6856 21.2071C17.8732 21.0196 17.9785 20.7652 17.9785 20.5C17.9785 20.2348 17.8732 19.9804 17.6856 19.7929C17.4981 19.6054 17.2437 19.5 16.9785 19.5ZM7.97852 18.5C8.50895 18.5 9.01766 18.7107 9.39273 19.0858C9.7678 19.4609 9.97852 19.9696 9.97852 20.5C9.97852 21.0304 9.7678 21.5391 9.39273 21.9142C9.01766 22.2893 8.50895 22.5 7.97852 22.5C7.44808 22.5 6.93937 22.2893 6.5643 21.9142C6.18923 21.5391 5.97852 21.0304 5.97852 20.5C5.97852 19.9696 6.18923 19.4609 6.5643 19.0858C6.93937 18.7107 7.44808 18.5 7.97852 18.5ZM7.97852 19.5C7.7133 19.5 7.45895 19.6054 7.27141 19.7929C7.08387 19.9804 6.97852 20.2348 6.97852 20.5C6.97852 20.7652 7.08387 21.0196 7.27141 21.2071C7.45895 21.3946 7.7133 21.5 7.97852 21.5C8.24373 21.5 8.49809 21.3946 8.68562 21.2071C8.87316 21.0196 8.97852 20.7652 8.97852 20.5C8.97852 20.2348 8.87316 19.9804 8.68562 19.7929C8.49809 19.6054 8.24373 19.5 7.97852 19.5ZM18.9785 6.5H5.24852L7.79852 12.5H15.9785C16.3085 12.5 16.5985 12.34 16.7785 12.1L19.7785 8.1C19.9085 7.93 19.9785 7.72 19.9785 7.5C19.9785 7.23478 19.8732 6.98043 19.6856 6.79289C19.4981 6.60536 19.2437 6.5 18.9785 6.5ZM15.9785 13.5H7.84852L7.07852 15.06L6.97852 15.5C6.97852 15.7652 7.08387 16.0196 7.27141 16.2071C7.45895 16.3946 7.7133 16.5 7.97852 16.5H18.9785V17.5H7.97852C7.44808 17.5 6.93937 17.2893 6.5643 16.9142C6.18923 16.5391 5.97852 16.0304 5.97852 15.5C5.97822 15.1607 6.06425 14.8269 6.22852 14.53L6.94852 13.06L3.31852 4.5H1.97852V3.5H3.97852L4.82852 5.5H18.9785C19.5089 5.5 20.0177 5.71071 20.3927 6.08579C20.7678 6.46086 20.9785 6.96957 20.9785 7.5C20.9785 8 20.8085 8.42 20.5285 8.76L17.6185 12.65C17.2585 13.16 16.6585 13.5 15.9785 13.5Z"
        fill="#fff"
      />
    </svg>
  );
}
/*
{
            "id": 2,
            "restaurant_id": 2,
            "item_category_id": 1,
            "name": "Date Cake",
            "price": "10.00",
            "old_price": "0.00",
            "image": "/assets/img/items/1726654329n0kJib8ot7.jpg",
            "is_recommended": 1,
            "is_popular": 1,
            "is_new": 1,
            "desc": "<p><span style=\"font-family: Arial; font-size: 15px; white-space-collapse: preserve;\">Date Cake</span><br></p>",
            "placeholder_image": null,
            "is_active": 1,
            "is_veg": null,
            "order_column": null,
            "zone_id": 1,
            "deleted_at": null,
            "addon_categories": [
                {
                    "id": 1,
                    "name": "Cake",
                    "type": "MULTI",
                    "user_id": 1,
                    "created_at": "2024-09-14 14:55:41",
                    "updated_at": "2024-09-18 06:19:32",
                    "description": null,
                    "addon_limit": 0,
                    "deleted_at": null,
                    "pivot": {
                        "item_id": 2,
                        "addon_category_id": 1
                    },
                    "addons": []
                }
            ]
        }
*/
