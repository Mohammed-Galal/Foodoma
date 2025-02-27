import getText from "../../translation";
import Banner from "./Banner";
import Products from "./Products";
import Departments from "./Departments";
import Occassions from "./Occasions";
import About from "./About";
import Rate from "./Rate";
import Services from "./Services";

import "./index.scss";
import "swiper/css/bundle";
import { useEffect, useRef, useState } from "react";

/* eslint-disable import/no-anonymous-default-export */
const excluded = [3, 4, 5, 6, 7];

export default function () {
  const categories = useRef({ Occassions: [], Departments: [] }),
    [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loaded ||
      fetch("https://admin.montana.sa/public/api/getItemcategories")
        .then((r) => r.json())
        .then((r) => {
          r.filter((c) => c.id !== 13 && c.id !== 8).forEach((c) => {
            const targetCat = excluded.includes(c.id)
              ? "Departments"
              : "Occassions";

            categories.current[targetCat].push(c);
          });
          setLoaded(true);
        });
  });

  return (
    <>
      <Banner />
      <Products
        id="new-items"
        title={getText("home", 19)}
        categoryKey="is_new"
      />
      <Products
        id="new-items"
        title={getText("home", 19)}
        categoryKey="is_popular"
      />
      <Departments
        data={categories.current.Departments}
        sectionName={getText("home", 21)}
      />
      <Occassions
        data={categories.current.Occassions}
        sectionName={getText("home", 22)}
      />
      <Services sectionName={getText("home", 23)} />
      <Rate />
      <About />
    </>
  );
}
