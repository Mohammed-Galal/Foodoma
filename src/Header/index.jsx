/* eslint-disable import/no-anonymous-default-export */
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loc from "../icons/Loc";
import Arrow_Down from "../icons/Arrow_Down";

import desktop from "./desktop";
import mobile from "./mobile";
import "./index.scss";

const baseUrl = "https://mon10.amir-adel.com/public/api/",
  fetchOpts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

export default function (isMobileDevice) {
  const Target = isMobileDevice ? mobile : desktop;

  return (
    <>
      <CurrLoc />
      <Target />
    </>
  );
}

function CurrLoc() {
  const { data: currStore, branches } = useSelector((e) => e.Restaurant);

  const redirect = useNavigate(),
    dispatch = useDispatch();

  return (
    <div style={{ backgroundColor: "#ecf5ff" }} className="d-none">
      <ul
        id="branches"
        className="container d-grid gap-3 list-unstyled my-0 py-2 px-3"
        style={{
          gridTemplateColumns: "1fr auto auto",
          color: "var(--primary)",
        }}
      >
        <li className="align-items-center d-flex gap-2">
          {Loc}
          <span className="d-none d-sm-block">{currStore.name}</span>
        </li>

        <li className="DD align-items-center d-flex gap-2">
          {currStore.name}
          {Arrow_Down}

          <ul className="d-flex flex-column list-unstyled m-0 p-0">
            {branches.map(branchItem)}
          </ul>
        </li>

        <li className="align-items-center d-flex gap-2">
          <Link
            to="/public/mobile"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            اتصل بنا
          </Link>
        </li>
      </ul>
    </div>
  );

  function branchItem({ name, slug }) {
    return (
      <li
        key={slug}
        onClick={() => confirmLocation(slug)}
        className="px-3 py-2"
      >
        {name}
      </li>
    );
  }

  function confirmLocation(slug) {
    const resInfo = fetch(baseUrl + "get-restaurant-info/" + slug, fetchOpts);

    resInfo
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "restaurant/init", payload: data });
        // get the restaurant menu
        fetchMenu(slug);
      });
  }

  function fetchMenu(slug) {
    fetch(baseUrl + "get-restaurant-items/" + slug, fetchOpts)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "products/init", payload: data });
        // Redirect to the restaurant page
        redirect("/");
      });
  }
}
