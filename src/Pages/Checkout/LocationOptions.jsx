/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useState } from "react";

const Gmap = (
  <React.Fragment key="map">
    <label className="d-block mb-2">حدد موقع على الخريطة</label>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7457112.192150741!2d39.78308183785676!3d24.13073533599272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15e7b33fe7952a41%3A0x5960504bc21ab69b!2sSaudi%20Arabia!5e0!3m2!1sen!2seg!4v1733088758422!5m2!1sen!2seg"
      style={{
        border: "0px",
        minHeight: "450px",
        width: "100%",
        borderRadius: "8px",
      }}
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </React.Fragment>
);

export default function () {
  const [manualLoc, setManual] = useState(false);

  return (
    <div>
      <span className="h6">اعتماد الطلب</span>
      <div className="d-flex gap-2 my-2">
        <button
          onClick={() => setManual(false)}
          type="button"
          data-active={!manualLoc}
          className="btn px-3"
        >
          اعتماد الطلب المقدم مباشرة
        </button>

        <button
          onClick={() => setManual(true)}
          type="button"
          data-active={manualLoc}
          className="btn px-3"
        >
          أريد التواصل قبل اعتماد الطلب
        </button>
      </div>

      {manualLoc && Gmap}
    </div>
  );
}
