/* eslint-disable import/no-anonymous-default-export */
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";

const defaultConfig = {};
defaultConfig.modules = [Autoplay, A11y, Scrollbar, Pagination, Navigation];
defaultConfig.navigation = true;
defaultConfig.spaceBetween = 28;
defaultConfig.slidesPerView = "auto";
defaultConfig.autoplay = false && {
  delay: 1500,
  pauseOnMouseEnter: true,
};
defaultConfig.scrollbar = {
  snapOnRelease: true,
  draggable: true,
};

export default function ({ customConfig, innerItems }) {
  const config = {},
    innerNodes = innerItems.map(swiperSlide);

  Object.assign(config, defaultConfig);
  !!customConfig && Object.assign(config, customConfig);
  return <Swiper {...config}>{innerNodes}</Swiper>;
}

function swiperSlide(Children, I) {
  return <SwiperSlide key={I}>{Children}</SwiperSlide>;
}
