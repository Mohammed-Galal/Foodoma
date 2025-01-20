/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import { useSelector } from "react-redux";
import ProductItem from "../shared/productItem";

const categories = new Set();

const emptyStr = "",
  liStyle = {
    color: "var(--midgray)",
    border: "1px solid currentColor",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#f8f9fa",
    fontWeight: "500",
    letterSpacing: "0.8px",
    transition: "all 0.15s",
  },
  activeCatStyle = {
    ...liStyle,
    color: "var(--primary)",
    borderColor: "#ecf5ff",
  };

export default function () {
  categories.clear();

  const { data } = useSelector((e) => e.Products),
    [productName, setProductName] = useState(emptyStr),
    [category, setCategory] = useState(emptyStr);

  const items = data.map((item, index) => {
    const categoryMatched = item.category_name.includes(category),
      nameMatched = item.name.includes(productName);
    categories.add(item.category_name);
    if (categoryMatched && nameMatched) return ProductItem(item, index);
    return false;
  });

  return (
    <section
      id="products"
      className="container d-flex flex-column flex-lg-row-reverse gap-5"
    >
      <div style={{ flex: "1 0 30%" }}>
        <input
          type="search"
          placeholder="ابحث باسم المنتج..."
          onChange={({ target }) => setProductName(target.value)}
          className="input-group-text mb-3 w-100"
          style={{ outline: "none", borderColor: "#ecf5ff" }}
        />
        <ul className="d-flex flex-wrap gap-3 justify-content-center list-unstyled m-0 p-0">
          {Array.from(categories).map((c) => (
            <li
              key={c}
              className="px-3 py-1"
              onClick={() => setCategory(categories === c ? emptyStr : c)}
              style={c === category ? activeCatStyle : liStyle}
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="d-flex flex-column d-lg-grid gap-4"
        style={{
          flex: "1 0 70%",
          justifyContent: "space-evenly",
          gridTemplateColumns: "repeat(3, auto)",
        }}
      >
        {items}
      </div>
    </section>
  );
}
