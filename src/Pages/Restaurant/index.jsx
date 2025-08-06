import getPage from "../../translation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const getText = getPage("restaurant"),
  EMPTY_STR = "",
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

let closestRes;

export default function Restaurant({ isPopup }) {
  const { Restaurant, User } = useSelector((state) => state),
    { branches: restaurants } = Restaurant,
    [filterValue, setFilter] = useState(""),
    [err, setErr] = useState(""),
    redirect = useNavigate(),
    dispatch = useDispatch();

  useEffect(
    function () {
      fetch(baseUrl + "get-delivery-restaurants", {
        method: "POST",
        body: JSON.stringify(User.loc),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((data) => {
          closestRes = data.reduce((curr, store) => {
            if (store.is_active && (!curr || curr.distance > store.distance))
              return store;
            return curr;
          }, null);
        });
    },
    [User.loc]
  );

  let currLoc = null;
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
          {getText(0)}
          <input
            className="btn px-3"
            type="button"
            value={getText(1)}
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

      {!!err && (
        <span
          className="d-block text-capitalize text-center text-danger w-100"
          style={{ fontWeight: 600 }}
        >
          {err}
        </span>
      )}

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
          placeholder={getText(2)}
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

        <ul className="branches d-grid gap-2 list-unstyled m-0 p-0">
          {restaurants.map(restItem)}
        </ul>
      </div>
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

  function getUserLocation() {
    if (Object.keys(User.loc).length) {
      closestRes
        ? confirmLocation(closestRes.slug)
        : setErr("لا يوجد فرع قريب منك");
    } else
      setErr(
        "يرجى تفعيل صلاحية الوصول للموقع الجغرافي الخاص بك ثم اعد المحاولة"
      );
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
