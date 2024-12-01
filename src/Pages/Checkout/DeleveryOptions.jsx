import React, { useState } from "react";

const homeOption = (
  <React.Fragment key="Home">
    <label>
      العنوان
      <input
        className="input-group mt-2 p-2"
        type="text"
        placeholder="عنوان الاستلام"
      />
    </label>

    <div className="row">
      <label className="col-12 col-md-4">
        الشقة
        <input
          className="input-group mt-2 p-2"
          type="text"
          placeholder="الشقة"
        />
      </label>

      <label className="col-12 col-md-4">
        الطابق
        <input
          className="input-group mt-2 p-2"
          type="number"
          placeholder="الطابق"
        />
      </label>

      <label className="col-12 col-md-4">
        المنزل
        <input
          className="input-group mt-2 p-2"
          type="number"
          placeholder="المنزل"
        />
      </label>
    </div>
  </React.Fragment>
);

const branchOption = (
  <label key="branch">
    الفرع
    <select className="input-group mt-2 p-2" defaultValue="0">
      <option value="0">الفرع</option>
    </select>
  </label>
);

export default function DeleveryOptions() {
  const [delevery, setDelevery] = useState(false);

  return (
    <div className="d-flex flex-column gap-2">
      <span className="title" style={{ color: "var(--primary)" }}></span>
      <div className="d-flex gap-2">
        <button
          onClick={() => setDelevery(false)}
          type="button"
          data-active={!delevery}
          className="btn px-3"
        >
          الاستلام من الفرع
        </button>
        <button
          onClick={() => setDelevery(true)}
          type="button"
          data-active={delevery}
          className="btn px-3"
        >
          التوصيل للمنزل
        </button>
      </div>

      {delevery ? homeOption : branchOption}
    </div>
  );
}
