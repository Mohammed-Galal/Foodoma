/* eslint-disable import/no-anonymous-default-export */
import productItem from "../../shared/productItem";
import Carousel from "../../shared/Carousel";

export default function ({ items }) {
  return (
    <section className="container">
      <span
        className="d-block h3 mb-4 text-center"
        style={{ color: "var(--primary)" }}
      >
        قد يعجبك ايضاً
      </span>

      <Carousel
        customConfig={{ autoplay: false, scrollbar: false }}
        innerItems={items.map(productItem)}
      />
    </section>
  );
}
