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

/* eslint-disable import/no-anonymous-default-export */

export default (
  <>
    <Banner />
    <Products id="new-items" title={getText("home", 19)} categoryKey="is_new" />
    <Products id="recommended" title={getText("home", 20)} />
    <Departments sectionName={getText("home", 21)} />
    <Occassions sectionName={getText("home", 22)} />
    <Services sectionName={getText("home", 23)} />
    <Rate />
    <About />
  </>
);
