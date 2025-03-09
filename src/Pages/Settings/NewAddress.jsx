/* eslint-disable jsx-a11y/aria-role */
import { useRef, useState } from "react";
import { useStore } from "react-redux";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import getText from "../../translation";

const saveAddressApi =
  process.env.REACT_APP_API_URL + "/public/api/save-address";

const center = {
  lat: 23.885942,
  lng: 45.079162,
};

// new Address Modal
export default function NewAddress({ isActive, deActivate }) {
  const store = useStore(),
    [position, setPosition] = useState(null);

  const opts = useRef({
    latitude: "",
    longitude: "",
    get_only_default_address: "",
  }).current;

  if (position) {
    opts.latitude = "" + position.lat;
    opts.longitude = "" + position.lng;
  }

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

        <label>{getText("settings", 38)}</label>

        <APIProvider apiKey="AIzaSyAzuTxVwWxJIk39BIRSwsT-BKv4sC6BqnQ">
          <Map
            style={{ width: "100%", height: "300px" }}
            defaultCenter={center}
            defaultZoom={8}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            onClick={updatePosition}
          >
            {position && <Marker position={position} />}
          </Map>
        </APIProvider>

        <button className="btn mx-auto" onClick={addAddress}>
          {getText("settings", 39)}
        </button>
      </div>
    </div>
  );

  function updatePosition({ detail }) {
    setPosition(detail.latLng);
  }

  function addAddress() {
    if (!checkValidity()) return alert(getText("settings", 40));
    if (position === null) return alert("يجب تحديد الموقع على الخريطة");

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
