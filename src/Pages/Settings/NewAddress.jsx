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
          {/* <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact> */}
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
