/* eslint-disable import/no-anonymous-default-export */
export default function () {
  return (
    <div id="addresses" className="">
      <p className="title">اختر عنوان التوصيل</p>

      <ul>
        <AddressItem
          name="موقعك الحالي"
          info="شارع، حي، منطقة الرياض، السعودية"
        />
      </ul>

      <button type="button" className="btn">
        اضف عنوان جديد
      </button>
    </div>
  );
}

function AddressItem({ name, info }) {
  return (
    <li>
      <label>
        <img src="/assets/settings/address.png" alt="icon" />

        <div>
          <span>{name}</span>
          {info}
        </div>

        <input type="radio" />
      </label>
    </li>
  );
}
/**
 * <div id="addresses" class="container d-grid gap-4">
  <p
    class="accordion h4 m-0 title"
    style="color: var(--primary); font-weight: 700"
  >
    اختر عنوان التوصيل
  </p>
  <ul class="d-grid gap-3 list-unstyled m-0 p-0">
    <li style="border: 2px solid #a8d0ec; border-radius: 24px" class="">
      <label
        class="align-items-center d-flex gap-2 h-100 justify-content-start p-3 w-100"
        ><img src="/assets/settings/address.png" alt="icon" />
        <div
          class="d-grid gap-2"
          style="color: var(--midgray); font-weight: 600"
        >
          <span style="color: var(--primary); font-weight: bold" class="h5 m-0"
            >موقعك الحالي</span
          >شارع، حي، منطقة الرياض، السعودية
        </div>
        <input type="radio" class="" style="margin-right: auto; scale: 1"
      /></label>
    </li>
  </ul>
  <button
    type="button"
    class="btn mx-auto"
    style="
      background-color: var(--primary);
      color: #fff;
      border-radius: 24px;
      width: 70%;
    "
  >
    اضف عنوان جديد
  </button>
</div>

 */
