import getText from "../../../translation";
import { useEffect, useRef, useState } from "react";
import "./index.scss";
/* eslint-disable import/no-anonymous-default-export */

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

let observer;

export default () => {
  const [count, setCount] = useState(1),
    cardsContainer = useRef(null);

  useEffect(
    function () {
      if (count > 1) increase();
      else {
        observer = new IntersectionObserver(callback, options);
        observer.observe(cardsContainer.current);

        let called = false;
        function callback() {
          called || setCount(count + 1);
          called = true;
        }
      }
    },
    [count]
  );

  return (
    <section
      key="about-us"
      id="about-us"
      className="container-fluid container-lg d-flex flex-column text-center"
    >
      <span className="h3 m-0">{getText("home", 0)}</span>
      {getText("home", 1)}

      <br />
      {getText("home", 2)}

      <div ref={cardsContainer} className="d-flex flex-wrap text-center w-100">
        <div className="d-flex flex-column">
          <img src="/assets/home/icons/ph_stamp-light.svg" alt="LIGHT" />
          <Inc curr={count} until={73} />
          {getText("home", 3)}
        </div>
        <div className="d-flex flex-column">
          <img src="/assets/home/icons/hugeicons_happy.svg" alt="HAPPY FACE" />
          <Inc curr={count} until={1000} />
          {getText("home", 4)}
        </div>
        <div className="d-flex flex-column">
          <img src="/assets/home/icons/bi_cake.svg" alt="CAKE" />
          <Inc curr={count} until={3000} />
          {getText("home", 5)}
        </div>
      </div>
    </section>
  );

  function increase() {
    count < 3000 &&
      setTimeout(function () {
        setCount(count * 2);
      }, 50);
  }
};

function Inc({ curr, until }) {
  const max = Math.min(curr, until);
  return <span className="h3 my-2">{max} +</span>;
}
