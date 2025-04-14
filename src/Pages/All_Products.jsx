/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import { useSelector } from "react-redux";
import ProductItem from "../shared/productItem";
import { useParams, useSearchParams } from "react-router-dom";
import getText from "../translation";

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
  const urlParams = useParams(),
    urlCat = urlParams.category || emptyStr,
    { data, categories } = useSelector((e) => e.Products),
    [productName, setProductName] = useState(emptyStr),
    [category, setCategory] = useState(urlCat);

  const items = data.map((item, index) => {
    const categoryMatched = item.category_name.includes(category),
      nameMatched = item.name.includes(productName);
    if (categoryMatched && nameMatched) return ProductItem(item, index);
    return false;
  });

  const [params] = useSearchParams();

  return (
    <section
      id="products"
      className="container d-flex flex-column flex-lg-row-reverse gap-5"
    >
      {!params.size && (
        <div style={{ flex: "1 0 30%", height: "fit-content" }}>
          <input
            type="search"
            placeholder={"ابحث باسم المنتج..."}
            onChange={({ target }) => setProductName(target.value)}
            className="input-group-text m-0 w-100"
            style={{ outline: "none", borderColor: "#ecf5ff" }}
          />

          <h5
            className="my-2 py-1"
            style={{
              color: "var(--primary)",
              borderBottom: "1px solid currentColor",
            }}
          >
            {"أقسام mon10"}
          </h5>

          <ul
            className="d-grid gap-3 text-center justify-content-center list-unstyled m-0 p-0"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            {Array.from(categories).map((c) => (
              <li
                key={c}
                className="px-3 py-1"
                onClick={() => setCategory(category === c ? emptyStr : c)}
                style={c === category ? activeCatStyle : liStyle}
              >
                {c}
              </li>
            ))}
          </ul>

          {/* <h5
          className="my-2 py-1"
          style={{
            color: "var(--primary)",
            borderBottom: "1px solid currentColor",
          }}
        >
          {"تصاميم جاهزة لكل مناسبة"}
        </h5> */}
        </div>
      )}

      <div
        className="d-flex flex-wrap gap-3 justify-content-evenly"
        style={{
          flex: "1 0 70%",
        }}
      >
        {items}
      </div>
    </section>
  );
}
