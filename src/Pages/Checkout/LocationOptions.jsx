/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";

const Gmap = <label key="map">حدد موقع على الخريطة</label>;

export default function () {
  const [manualLoc, setManual] = useState(false);

  return (
    <div>
      <span className="title">اعتماد الطلب</span>
      <div>
        <button onClick={() => setManual(false)} type="button" className="btn">
          اعتماد الطلب المقدم مباشرة
        </button>

        <button onClick={() => setManual(true)} type="button" className="btn">
          أريد التواصل قب اعتماد الطلب
        </button>
      </div>

      {manualLoc && Gmap}
    </div>
  );
}
