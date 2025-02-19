/* eslint-disable jsx-a11y/aria-role */

import { useStore } from "react-redux";
import getText from "../../translation";

const saveAddressApi = "https://admin.montana.sa/public/api/save-address";

// new Address Modal
export default function NewAddress({ isActive, deActivate }) {
  const store = useStore();

  const opts = {
    latitude: "",
    longitude: "",
    // address: "pjpaijf",
    // house: "9",
    // tag: "AAA",
    get_only_default_address: "",
  };

  return (
    <div
      id="new-address"
      className="align-items-center d-flex justify-content-center"
      data-show={isActive}
    >
      <div className="dismiss" onClick={deActivate}></div>

      <div className="container d-grid gap-3 h5 my-0 p-3">
        <label>
          {getText("settings", 34)}
          <input
            type="text"
            className="input-group-text"
            placeholder={getText("settings", 35)}
            role="input"
            onChange={(e) => (opts.tag = e.target.value)}
          />
        </label>

        <label>
          {getText("settings", 36)}
          <input
            type="text"
            className="input-group-text"
            placeholder={getText("settings", 36)}
            role="input"
            onChange={(e) => (opts.address = e.target.value)}
          />
        </label>

        <label>
          {getText("settings", 37)}
          <input
            type="text"
            className="input-group-text"
            placeholder={getText("settings", 37)}
            role="input"
            onChange={(e) => (opts.house = e.target.value)}
          />
        </label>

        <label>
          {getText("settings", 38)}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7457112.192150741!2d39.78308183785676!3d24.13073533599272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15e7b33fe7952a41%3A0x5960504bc21ab69b!2sSaudi%20Arabia!5e0!3m2!1sen!2seg!4v1733088758422!5m2!1sen!2seg"
            title="Google Maps Location"
            role="input"
            style={{
              minHeight: "250px",
              width: "100%",
              borderRadius: "8px",
            }}
            allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </label>

        <button className="btn mx-auto" onClick={addAddress}>
          {getText("settings", 39)}
        </button>
      </div>
    </div>
  );

  function addAddress() {
    if (!checkValidity()) return alert(getText("settings", 40));

    fetch(saveAddressApi, {
      method: "POST",
      body: JSON.stringify(opts),
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then((r) => r.json())
      .then((r) => {
        store.dispatch({ type: "user/setAddresses", payload: r });
        deActivate();
      });
  }

  function checkValidity() {
    return "address" in opts && "house" in opts && "tag" in opts;
  }
}
