import getText from "../../translation";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const EMPTY_STR = "",
  cities = ["حي السلامة", "حي الصفا", "حي النزهة", "حي السامر"],
  baseUrl = process.env.REACT_APP_API_URL + "/public/api/",
  fetchOpts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const restaurantsProps = {
    className: "popup",
    style: {
      position: "fixed",
      zIndex: "10",
      backgroundColor: "#fff",
      top: "100px",
      left: "0",
      right: "0",
      placeSelf: "anchor-center",
      boxShadow: "0px 4px 6px 2px #0002",
      borderRadius: "8px",
      overflow: "auto",
    },
  };

  export default function Restaurant({ isPopup }) {
    const { branches: restaurants, loaded } = useSelector(
        (state) => state.Restaurant
      ),
      [filterValue, setFilter] = useState(""),
      [showBranches, setShowBranches] = useState(false),
      redirect = useNavigate(),
      dispatch = useDispatch();

    let currLoc = null;

    useLayoutEffect(() => {
      loaded || getUserLocation();
    }, [loaded]);

    const opts = { gridTemplateColumns: "min(100%, 774px)" };
    isPopup && Object.assign(opts, restaurantsProps.style);

    return (
      <section
        id="restaurant"
        className={
          "container d-grid gap-4 justify-content-center " +
          (isPopup ? restaurantsProps.className : "")
        }
        style={opts}
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
              cursor: "pointer",
              border: "inherit",
              borderRadius: "24px",
              overflow: "hidden",
              "padding-inline-start": "0.75rem",
              color: "var(--primary)",
              fontSize: "smaller",
              fontWeight: "600",
            }}
          >
            {getText("restaurant", 0)}
            <input
              className="btn px-3"
              type="button"
              value={getText("restaurant", 1)}
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

        {!showBranches ? (
          <button
            onClick={() => setShowBranches(true)}
            className="btn"
            style={{ color: "var(--primary)" }}
          >
            {getText("restaurant", 2)}
          </button>
        ) : (
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
              placeholder={getText("restaurant", 3)}
              className="py-1 px-3"
              onChange={(e) => setFilter(e.target.value)}
              value={filterValue}
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
        )}
      </section>
    );

    function testFilter(name) {
      const regex = new RegExp(filterValue, "i");
      return regex.test(name);
    }

    function restItem({ name, slug }, I) {
      if (filterValue === EMPTY_STR || testFilter(name)) {
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
          dispatch({ type: "products/clearCart" });
          // get the restaurant menu
          fetchMenu(currLoc);
        });
    }

    function getUserLocation() {
      if (!("geolocation" in navigator))
        return alert("Geolocation is not supported by your browser.");

      navigator.geolocation.getCurrentPosition(
        (POS) => {
          const coords = {
            latitude: "" + POS.coords.latitude,
            longitude: "" + POS.coords.longitude,
          };

          fetch(baseUrl + "get-delivery-restaurants", {
            method: "POST",
            body: JSON.stringify(coords),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((r) => r.json())
            .then((data) => confirmLocation(data[0].slug));
        },
        (error) => alert(getText("restaurant", 4))
      );
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
