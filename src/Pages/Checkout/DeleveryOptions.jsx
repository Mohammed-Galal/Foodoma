import React, { useState } from "react";

const homeOption = (
  <React.Fragment key="Home">
    <label>
      العنوان
      <input type="text" placeholder="عنوان الاستلام" />
    </label>

    <div className="row">
      <label>
        الشقة
        <input type="text" placeholder="الشقة" />
      </label>

      <label>
        الطابق
        <input type="number" placeholder="الطابق" />
      </label>

      <label>
        المنزل
        <input type="number" placeholder="المنزل" />
      </label>
    </div>
  </React.Fragment>
);

const branchOption = (
  <label key="branch">
    الفرع
    <select defaultValue="0">
      <option value="0">الفرع</option>
    </select>
  </label>
);

export default function DeleveryOptions() {
  const [delevery, setDelevery] = useState(false);

  return (
    <div>
      <span className="title"></span>
      <div>
        <button
          onClick={() => setDelevery(false)}
          type="button"
          className="btn"
        >
          الاستلام من الفرع
        </button>
        <button onClick={() => setDelevery(true)} type="button" className="btn">
          التوصيل للمنزل
        </button>
      </div>

      {delevery ? homeOption : branchOption}
    </div>
  );
}
