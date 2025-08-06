/* eslint-disable jsx-a11y/aria-role */
import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import getPage from "../../translation";

const saveAddressApi =
  process.env.REACT_APP_API_URL + "/public/api/save-address";

const defaultCenter = {
  lat: 23.885942,
  lng: 45.079162,
};

// new Address Modal
export default function NewAddress({ isActive, deActivate }) {
  const { User, Restaurant, settings } = useSelector((e) => e),
    dispatch = useDispatch(),
    [err, setErr] = useState(""),
    [geolocationErr, setGeoLoactionErr] = useState(""),
    [center, setCenter] = useState(defaultCenter),
    [marker, setMarkerPosition] = useState(defaultCenter);

  const inputRef = useRef(),
    autocompleteRef = useRef(null),
    opts = useRef({
      latitude: "",
      longitude: "",
      get_only_default_address: "",
    }).current;

  useLayoutEffect(function () {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      // if (result.state === "granted") {
      //   console.log("✅ Geolocation is enabled");
      // } else if (result.state === "prompt") {
      //   console.log("ℹ️ Geolocation permission has not been decided yet");
      // } else
      if (result.state === "denied") {
        setGeoLoactionErr("❌ Geolocation is disabled or blocked");
      }
    });
  });

  useLayoutEffect(() => {
    if (Restaurant.loaded) {
      const activeLoc = {
        lat: +(User.loc.latitude || Restaurant.data.latitude),
        lng: +(User.loc.longitude || Restaurant.data.longitude),
      };
      setMarkerPosition(activeLoc);
      setCenter(activeLoc);
    }
  }, [User.loc, Restaurant.loaded]);

  // for server api request
  if (marker) {
    opts.latitude = "" + marker.lat;
    opts.longitude = "" + marker.lng;
  }

  // autocomplete place changed handler
  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const newLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setMarkerPosition(newLocation);
      setCenter(newLocation);
    }
  };

  const handleLoad = () => {
    if (!window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current
    );
    autocompleteRef.current = autocomplete;
    autocomplete.addListener("place_changed", handlePlaceChanged);
  };

  return (
    <div
      id="new-address"
      className="align-items-center d-flex justify-content-center"
      data-show={isActive}
    >
      <div className="dismiss" onClick={deActivate}></div>

      <div
        className="container d-grid gap-3 h5 my-0 p-3"
        style={{ maxHeight: "75vh", overflowY: "auto", minHeight: "450px" }}
      >
        {!!err && (
          <span
            className="d-block text-capitalize text-center text-danger w-100"
            style={{ fontWeight: 600 }}
          >
            {err}
          </span>
        )}
        {/* gets fetched from server */}
        <APIProvider apiKey={settings.data.googleApiKey} libraries={["places"]}>
          <label>
            {"احفظ العنوان باسم"}
            <input
              type="text"
              className="input-group-text"
              placeholder={"عنوان المنزل على سبيل المثال"}
              role="input"
              onChange={(e) => (opts.tag = e.target.value)}
            />
          </label>

          <label>
            {"العنوان"}
            <input
              type="text"
              ref={inputRef}
              className="input-group-text"
              placeholder={"العنوان"}
              role="input"
              onFocus={handleLoad}
              onChange={(e) => (opts.address = e.target.value)}
            />
          </label>

          <label>
            {"المنزل"}
            <input
              type="text"
              className="input-group-text"
              placeholder={"المنزل"}
              role="input"
              onChange={(e) => (opts.house = e.target.value)}
            />
          </label>

          <label>{"حدد الموقع على الخريطة"}</label>

          {geolocationErr && (
            <span
              className="text-center text-danger"
              style={{ fontSize: "smaller" }}
            >
              {geolocationErr}
            </span>
          )}

          <Map
            style={{ width: "100%", height: "300px" }}
            defaultZoom={12}
            defaultCenter={defaultCenter}
            center={center}
            disableDefaultUI={false}
            gestureHandling="greedy"
            onDrag={updateView}
            onClick={updatePosition}
          >
            <Marker position={marker || center} />
          </Map>
        </APIProvider>

        <button className="btn mx-auto" onClick={addAddress}>
          {"أضف العنوان"}
        </button>
      </div>
    </div>
  );

  function updateView({ detail }) {
    setCenter(detail.center);
  }

  function updatePosition({ detail }) {
    setMarkerPosition(detail.latLng);
  }

  function addAddress() {
    if (!checkValidity()) return setErr("يجب ملئ جميع البيانات");
    if (marker === null) return setErr("يجب تحديد الموقع على الخريطة");

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
        dispatch({ type: "user/setAddresses", payload: r });
        deActivate();
      });
  }

  function checkValidity() {
    return "address" in opts && "house" in opts && "tag" in opts;
  }
}
