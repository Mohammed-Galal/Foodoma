import getPage from "../../../translation";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Card, CardHeader, CardText, CardBody, CardFooter } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import data from "./data.json";
import "./index.scss";

import insta from "./insta";
import snapshot from "./snapshot";
import whatsapp from "./whatsapp";

const icons = { insta, snapshot, whatsapp };

/* eslint-disable import/no-anonymous-default-export */
export default () => (
  <section key="rates" id="rates">
    <div className="container-fluid container-lg">
      <h2 className="d-block text-center">{getPage("home")(8)}</h2>
      <Swiper
        modules={[A11y, Scrollbar, Pagination, Navigation]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        spaceBetween={24}
        slidesPerView="auto"
        // loop={true}
      >
        {data.map(rateItem)}
      </Swiper>
    </div>
  </section>
);

function rateItem({ author, rate, comment }, I) {
  const rateContainer = [];

  let index = 0;
  while (index < 5) rateContainer[index] = starIcon(index < rate, index++);

  return (
    <SwiperSlide key={I} style={{ maxWidth: "380px" }}>
      <Card>
        <CardHeader className="d-flex gap-2 align-items-center">
          {icons[author.platform]}
          {author.name}
        </CardHeader>

        <CardBody>
          {/* <CardTitle>{author.name}</CardTitle> */}
          <CardText>{comment}</CardText>
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
