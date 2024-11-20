import { Link, useParams } from "react-router-dom";
import "./index.scss";
import NXT from "../../icons/NXT";
import Plus from "../../icons/Plus";
import Minus from "../../icons/Minus";
import Cart from "../../icons/Cart";
import { useState } from "react";

/* eslint-disable jsx-a11y/alt-text */

export default (
  <>
    <aside>
      <ul className="container d-flex gap-2 list-unstyled my-0">
        <li className="py-3">
          <Link to="/design/3d">صمم كيك 3D</Link>
        </li>
        <li className="py-3">
          <Link to="/design/img">صمم بصورة</Link>
        </li>
        <li className="py-3">
          <Link to="/design/cream">صمم بالكريمة</Link>
        </li>
      </ul>
    </aside>

    <section id="design" className="container">
      <ul className="d-flex gap-2 justify-content-center list-unstyled mx-0 mb-5 p-0">
        <li>mon 10</li>
        <li>{NXT}</li>
        <li>صمم كيكتك بنفسك</li>
        <li>{NXT}</li>
        <li>...............</li>
      </ul>

      <Form />
    </section>
  </>
);

function Form() {
  const params = useParams(),
    [quantity, setQuantity] = useState(1);

  const [size, setSize] = useState(1),
    [shape, setShape] = useState("circle");

  return (
    <form className="d-flex flex-wrap gap-3" encType="multipart/form-data">
      <div className="align-items-center d-flex flex-column gap-4 justify-content-around">
        <input id="img-file" type="file" accept="image/*" />
        <label className="pb-1" htmlFor="img-file">
          أضف صورة
        </label>
      </div>

      <ul className="d-grid gap-3 list-unstyled">
        {params.style === "cream" && (
          <li>
            <label className="title" htmlFor="cream-color">
              لون الكريمة
            </label>
            <select
              id="cream-color"
              name="cream-color"
              defaultValue={"وردي"}
              className="input-group-text"
            >
              <option value="وردي">وردي</option>
            </select>
          </li>
        )}

        <li className="sizes">
          <span className="title">عدد الأشخاص ومقاس الكيك</span>

          <label>
            <input
              type="radio"
              name="size"
              value="1"
              onChange={() => setSize(1)}
              checked={size === 1}
            />
            2ل 4ش/ مصغير/25 ر.س
          </label>

          <label>
            <input
              type="radio"
              name="size"
              value="2"
              onChange={() => setSize(2)}
              checked={size === 2}
            />
            5ل 9ش/ م وسط/ 60 ر.س
          </label>

          <label>
            <input
              type="radio"
              name="size"
              value="3"
              onChange={() => setSize(3)}
              checked={size === 3}
            />
            10ل 15ش/ م كبير/ 80 ر.س
          </label>
        </li>

        <li className="shapes">
          <span className="title">عدد الأشخاص ومقاس الكيك</span>

          <label className="px-3 py-2">
            <span className="ml-2"></span>
            <input
              type="radio"
              name="shape"
              value="circle"
              onChange={() => setShape("circle")}
              checked={shape === "circle"}
            />
            /5 ر.س
          </label>

          <label>
            <span className="ml-2"></span>
            <input
              type="radio"
              name="shape"
              value="square"
              onChange={() => setShape("square")}
              checked={shape === "square"}
            />
            /10 ر.س
          </label>

          <label>
            <span className="ml-2"></span>
            <input
              type="radio"
              name="shape"
              value="rect"
              onChange={() => setShape("rect")}
              checked={shape === "rect"}
            />
            /15 ر.س
          </label>

          <label htmlFor="notes">شكل آخر اكتبه في الملاحظات</label>
        </li>

        <li>
          <label htmlFor="phrase" className="title">
            العبارة على الكيك
          </label>
          <input
            type="text"
            name="phrase"
            className="input-group-text"
            placeholder="Happy Birthday Alaa!"
          />
        </li>

        <li>
          <input
            className="input-group-text"
            name="notes"
            type="text"
            id="notes"
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
          <button type="button" className="d-flex gap-1 align-items-center">
            اضف الى العربة
            {Cart}
          </button>
        </li>
      </ul>
    </form>
  );
}
