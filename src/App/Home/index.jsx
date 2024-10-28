import Banner from "./Banner";
import { NewProducts, RecommendedProducts } from "./Products";
import Departments from "./Departments";
import Occassions from "./Occasions";
import About from "./About";
import Rate from "./Rate";
import Services from "./Services";

import "./index.scss";
import "swiper/css/bundle";

/* eslint-disable import/no-anonymous-default-export */

export default function () {
  return (
    <>
      <Banner />
      {NewProducts}
      {RecommendedProducts}
      <Departments sectionName="أقسام مون 10" />
      <Occassions sectionName="تصاميم جاهزة المناسبات" />
      <Services sectionName="خدمات مون 10 الإضافية" />
      <Rate />
      <About />
    </>
  );
}
