import { Link } from "react-router-dom";
import "./index.scss";

/* eslint-disable jsx-a11y/alt-text */
export default (
  <>
    <aside>
      <ul>
        <li>
          <Link to="/design/3d">صمم كيك 3D</Link>
        </li>
        <li>
          <Link to="/design/img">صمم بصورة</Link>
        </li>
        <li>
          <Link to="/design/cream">صمم بالكريمة</Link>
        </li>
      </ul>
    </aside>

    <section id="design" className="container">
      <ul>
        <li>mon 10</li>
        <li>صمم كيكتك بنفسك</li>
        <li>...............</li>
      </ul>

      <Form />
    </section>
  </>
);

function Form() {
  return (
    <form className="d-flex flex-wrap gap-3" encType="multipart/form-data">
      <div className="align-items-center d-flex flex-column gap-4 justify-content-around">
        <input id="img-file" type="file" accept="image/*" />
        <label className="pb-1" htmlFor="img-file">
          أضف صورة
        </label>
      </div>

      <ul className="d-grid gap-3 list-unstyled">
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

        <li className="sizes">
          <span className="title">عدد الأشخاص ومقاس الكيك</span>

          <label>
            <input type="radio" name="size" value="1" checked={true} />
            2ل 4ش/ مصغير/25 ر.س
          </label>

          <label>
            <input type="radio" name="size" value="2" />
            5ل 9ش/ م وسط/ 60 ر.س
          </label>

          <label>
            <input type="radio" name="size" value="3" />
            10ل 15ش/ م كبير/ 80 ر.س
          </label>
        </li>

        <li className="shapes">
          <span className="title">عدد الأشخاص ومقاس الكيك</span>

          <label className="px-3 py-2">
            <span className="ml-2"></span>
            <input type="radio" name="shape" checked={true} />
            /5 ر.س
          </label>

          <label>
            <span className="ml-2"></span>
            <input type="radio" name="shape" />
            /10 ر.س
          </label>

          <label>
            <span className="ml-2"></span>
            <input type="radio" name="shape" />
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
            placeholder="Happy Bithday Alaa!"
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

        <li>
          <button>+</button>
          {0}
          <button>-</button>
          <button>اضف الى العربة</button>
        </li>
      </ul>
    </form>
  );
}
