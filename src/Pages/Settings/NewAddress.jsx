/* eslint-disable jsx-a11y/aria-role */

import { useState } from "react";

export default function NewAddress({ isActive, deActivate }) {
  return (
    <div
      id="new-address"
      className="align-items-center d-flex justify-content-center"
      data-show={isActive}
    >
      <div className="dismiss" onClick={deActivate}></div>

      <div className="container d-grid gap-3 h5 my-0 p-3">
        <label>
          احفظ العنوان باسم
          <input
            type="text"
            className="input-group-text"
            placeholder="المنزل"
            role="input"
          />
        </label>

        <label>
          العنوان
          <input
            type="text"
            className="input-group-text"
            placeholder="العنوان"
            role="input"
          />
        </label>

        <div className="row h6">
          <label className="col-12 col-md-4">
            الشقة
            <input
              type="text"
              className="input-group-text"
              placeholder="الشقة"
              role="input"
            />
          </label>

          <label className="col-12 col-md-4">
            الطابق
            <input
              type="text"
              className="input-group-text"
              placeholder="الطابق"
              role="input"
            />
          </label>

          <label className="col-12 col-md-4">
            المنزل
            <input
              type="text"
              className="input-group-text"
              placeholder="المنزل"
              role="input"
            />
          </label>
        </div>

        <label>
          رقم الجوال
          <input
            type="number"
            className="input-group-text"
            placeholder="رقم الجوال"
            role="input"
          />
        </label>

        <label>
          حدد الموقع على الخريطة
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7457112.192150741!2d39.78308183785676!3d24.13073533599272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15e7b33fe7952a41%3A0x5960504bc21ab69b!2sSaudi%20Arabia!5e0!3m2!1sen!2seg!4v1733088758422!5m2!1sen!2seg"
            title="Google Maps Location"
            role="input"
            style={{
              minHeight: "250px",
              width: "100%",
              borderRadius: "8px",
            }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </label>

        <button className="btn mx-auto">أضف العنوان</button>
      </div>
    </div>
  );
}
