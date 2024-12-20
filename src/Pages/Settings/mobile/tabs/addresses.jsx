/* eslint-disable import/no-anonymous-default-export */
export default function () {
  return (
    <div id="addresses" className="container d-grid gap-4">
      <p
        style={{ cssText: "color: var(--primary); font-weight: 700" }}
        className="h4 m-0 title"
      >
        اختر عنوان التوصيل
      </p>

      <ul className="d-grid gap-3 list-unstyled m-0 p-0">
        <AddressItem
          name="موقعك الحالي"
          info="شارع، حي، منطقة الرياض، السعودية"
        />
      </ul>

      <button
        type="button"
        className="btn mx-auto"
        style={{
          cssText:
            "background-color: var(--primary); color: #fff; border-radius: 24px; width: 70%;",
        }}
      >
        اضف عنوان جديد
      </button>
    </div>
  );
}

function AddressItem({ name, info }) {
  return (
    <li style={{ cssText: "border: 2px solid #a8d0ec; border-radius: 24px" }}>
      <label className="align-items-center d-flex gap-2 h-100 justify-content-start p-3 w-100">
        <img src="/assets/settings/address.png" alt="icon" />

        <div
          className="d-grid gap-2"
          style={{ cssText: "color: var(--midgray); font-weight: 600" }}
        >
          <span
            style={{ cssText: "color: var(--primary); font-weight: bold" }}
            class="h5 m-0"
          >
            {name}
          </span>
          {info}
        </div>

        <input type="radio" style={{ marginRight: "auto" }} />
      </label>
    </li>
  );
}
