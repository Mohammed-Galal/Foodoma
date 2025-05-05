/* eslint-disable import/no-anonymous-default-export */
import getPage from "../../translation";
import productItem from "../../shared/productItem";
import Carousel from "../../shared/Carousel";

export default function ({ items }) {
  items && (items = items.filter((i) => i.is_popular));
  return (
    <section className="container">
      <span
        className="d-block h3 mb-4 text-center"
        style={{ color: "var(--primary)" }}
      >
        {"قد يعجبك ايضاً"}
      </span>

      <Carousel
        customConfig={{ autoplay: false, scrollbar: false }}
        innerItems={items.map(productItem)}
      />
    </section>
  );
}
