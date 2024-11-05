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
    <Products id="new-items" title="المنتجات الجديدة" categoryKey="is_new" />
    <Products id="recommended" title="المنتجات الأكثر مبيعاً" />
    <Departments sectionName="أقسام مون 10" />
    <Occassions sectionName="تصاميم جاهزة المناسبات" />
    <Services sectionName="خدمات مون 10 الإضافية" />
    <Rate />
    <About />
  </>
);
