import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const cities = ["حي السلامة", "حي الصفا", "حي النزهة", "حي السامر"],
  baseUrl = "https://mon10.doobagency.com/public/api/",
  fetchOpts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

export default function Restaurant() {
  const restaurants = useSelector((state) => state.Restaurant).branches,
    [filterValue, setFilter] = useState(null),
    redirect = useNavigate(),
    dispatch = useDispatch();

  let currLoc = null;

  return (
    <section
      id="restaurant"
      className="container d-grid gap-4 justify-content-center"
      style={{ gridTemplateColumns: "min(100%, 774px)" }}
    >
      <div
        className="p-3"
        style={{
          backgroundColor: "#fbfbfb",
          borderRadius: "16px",
          border: "1px solid #dceaf6",
        }}
      >
        <label
          className="align-items-center d-flex justify-content-between"
          style={{
            border: "inherit",
            borderRadius: "24px",
            overflow: "hidden",
            paddingRight: "0.75rem",
            color: "var(--primary)",
            fontSize: "smaller",
            fontWeight: "600",
          }}
        >
          سيضمن تشغيل "تحديد موقع الجهاز" عنوانًا دقيقًا وتوصيلًا خاليًا من
          المتاعب
          <input
            className="btn px-3"
            type="button"
            value="تشغيل الGPS"
            onClick={getUserLocation}
            style={{
              border: "none",
              backgroundColor: "var(--primary)",
              color: "rgb(255, 255, 255)",
              borderRadius: "inherit",
              fontWeight: "600",
              fontSize: "small",
              "--btn-height": "100%",
              alignSelf: "stretch",
            }}
          />
        </label>
      </div>

      <div
        class="d-grid gap-4 p-3"
        style={{
          backgroundColor: "#fbfbfb",
          borderRadius: "16px",
          border: "1px solid #dceaf6",
        }}
      >
        <input
          type="search"
          placeholder="ابحث عن الفروع"
          className="py-1 px-3"
          onChange={(e) => setFilter(e.target.value)}
          style={{
            outline: "none",
            border: "inherit",
            backgroundColor: "#fff",
            textAlign: "start",
            borderRadius: "24px",
          }}
        />

        <ul className="city-container d-flex flex-wrap gap-2 justify-content-around list-unstyled m-0 p-0">
          {cities.map((city) => (
            <li
              key={city}
              onClick={() => setFilter(city)}
              className={filterValue === city && "active"}
            >
              {city}
            </li>
          ))}
        </ul>

        <ul className="branches d-grid gap-2 list-unstyled m-0 p-0">
          {restaurants.map(restItem)}
        </ul>
      </div>

      {/* <button
        className="btn"
        type="button"
        onClick={confirmLocation}
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
          borderRadius: "24px",
          maxWidth: "400px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        تأكيد
      </button> */}
    </section>
  );

  function testFilter(name) {
    const regex = new RegExp(filterValue, "i");
    return regex.test(name);
  }

  function restItem({ name, slug }, I) {
    if (filterValue === null || testFilter(name)) {
      return (
        <li
          className={"p-2 " + (currLoc === slug ? "active" : "")}
          key={slug}
          onClick={() => confirmLocation(slug)}
        >
          {name}
        </li>
      );
    }
    return null;
  }

  function confirmLocation(slug) {
    currLoc = slug;

    const resInfo = fetch(
      baseUrl + "get-restaurant-info/" + currLoc,
      fetchOpts
    );

    resInfo
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "restaurant/init", payload: data });
        // get the restaurant menu
        fetchMenu(currLoc);
      });
  }

  function fetchMenu() {
    fetch(baseUrl + "get-restaurant-items/" + currLoc, fetchOpts)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "products/init", payload: data });
        // Redirect to the restaurant page
        redirect("/");
      });
  }
}

function getUserLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        alert(`موقعك: Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error) => alert(`لم يتمكن المتصفح من تحديد موقعك`)
    );
  } else {
    console.error("Geolocation is not supported by your browser.");
  }
}
