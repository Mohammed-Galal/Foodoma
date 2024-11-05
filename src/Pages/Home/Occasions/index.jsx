import Carousel from "../../../shared/Carousel";
import data from "./data.json";
import "./index.scss";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
const items = data.map(oItem);

export default () => (
  <section
    key="occasions"
    id="occasions"
    className="container-fluid container-lg d-flex flex-column"
  >
    <p className="d-flex align-items-center">
      <span className="h3">تصاميم جاهزة لكل مناسبة</span>

      <a href="/" className="d-flex align-items-center text-decoration-none">
        جميع المنتجات <object data="/assets/home/icons/left-arrow.svg"></object>
      </a>
    </p>

    <Carousel
      customConfig={{ loop: true, scrollbar: false }}
      innerItems={items}
    />
  </section>
);

function oItem({ img, title, href }) {
  return (
    <>
      <div className="mb-2">
        <img src={img} alt={title} />
      </div>

      <a className="text-center text-decoration-none" href={href}>
        {title}
      </a>
    </>
  );
}
