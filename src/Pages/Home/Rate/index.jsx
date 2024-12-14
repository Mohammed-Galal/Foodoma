import "./index.scss";
import data from "./data.json";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import {
  Card,
  CardHeader,
  CardText,
  CardBody,
  CardTitle,
  CardFooter,
} from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";

/* eslint-disable import/no-anonymous-default-export */
export default () => (
  <section key="rates" id="rates">
    <div className="container-fluid container-lg">
      <span className="d-block h3 text-center">آراء عملائنا</span>
      <Swiper
        modules={[A11y, Scrollbar, Pagination, Navigation]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        spaceBetween={50}
        slidesPerView="auto"
        loop={true}
      >
        {data.map(rateItem)}
      </Swiper>
    </div>
  </section>
);

function rateItem({ author, rate }, I) {
  const rateContainer = [];

  let index = 0;
  while (index < 5) rateContainer[index] = starIcon(index < rate, index++);

  return (
    <SwiperSlide key={I}>
      <Card>
        <CardHeader>{author.name}</CardHeader>

        <CardBody>
          <CardTitle>{author.name}</CardTitle>
          <CardText>{author.comment}</CardText>
        </CardBody>

        <CardFooter>{rateContainer}</CardFooter>
      </Card>
    </SwiperSlide>
  );
}

function starIcon(isActive, I) {
  const iconPath = "/assets/home/icons/",
    iconName = (isActive ? "" : "blank-") + "star.svg";

  return <img key={I + iconName} src={iconPath + iconName} alt={iconName} />;
}
